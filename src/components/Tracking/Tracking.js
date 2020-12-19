﻿import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as TrackingAction from '../../Redux/Action';
// import GoogleMapReact from 'google-map-react';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import activeMarker from '../../images/active-marker.svg';
import selectedMarker from '../../images/idle-marker.svg';



import ClusterMarker from '../markers/ClusterMarker';
import SimpleMarker from '../markers/SimpleMarker';
import supercluster from 'points-cluster';
import { susolvkaCoords, markersData } from '../data/fakeData';
import IdleTimer from 'react-idle-timer';
import { trackingConstants } from '../../constants/trackingConstants';

const MAP = {
    defaultZoom: 9,
    defaultCenter: susolvkaCoords,
    options: {
        minZoom: 8,
        maxZoom: 25,
        style: {
            position: 'relative',
            margin: 0,
            padding: 0,
            flex: 1,
            height: '100vh',
            width: '100%'
        }
    }
}


class Tracking extends Component {
    
    constructor(props) {

        super(props);

        this.idleTimer = null
        this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)

        this.state = {

            loading: false,
            latitude: '',
            longitude: '',
            vehicles: [],
            center: "",
            zoom: this.props.zoom,
            hover: false,
            selectedId:'',
            currentPosition: false,
            mapOptions: {
                center: MAP.defaultCenter,
                zoom: MAP.defaultZoom
            },
            clusters: [],
            timeout: 100000 * 30 * 1,  //10000 * 20 * 1,
            showModal: false,
            isTimedOut: false,
            timeOffUnmount:'',
            activeCount : 0

        };

    }


    static getDerivedStateFromProps(props, state) {
        
        if (props.movedVehicle !== undefined && props.movedVehicle != "")
        {
            let i = state.vehicles.findIndex(vehicle=> vehicle.id === props.movedVehicle.id);
            state.vehicles[i] ? state.vehicles[i] = props.movedVehicle : state.vehicles.push(props.movedVehicle);
            let vehicleList = state.vehicles;
            console.log('Vehicle List Count', vehicleList.length);
            return{
                vehicles: vehicleList,
                activeCount : vehicleList.length
            }
        }
    }
    

    //Clustering handled by 3rd Party Supercluster
    getClusters = () => {
        const clusters = supercluster(this.state.vehicles, {
            minZoom: 0,
            maxZoom: 16,
            radius: 60,
        });
        return clusters(this.state.mapOptions);
    };

    //Bounds are considered group markers : Radius & ZoomLevel
    createClusters = props => {
        //console.log("Map Bounds ==>", this.state.mapOptions.bounds)
        this.setState({
            clusters: this.state.mapOptions.bounds
                ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
                    lat: wy,
                    lng: wx,
                    text: numPoints,
                    numPoints: numPoints,
                    id: `${numPoints}_${points[0].id}`,
                    points
              }))
                : []
        });
    };



    //Function called whenever there's an activity on the map
    handleMapChange = ({ center, zoom, bounds }) => {
        this.setState(
            {
                mapOptions: {
                    center,
                    zoom,
                    bounds,
                },
            },
            () => {
                this.createClusters();
            }
        );
    };

    componentDidMount(){
        
        this.props.connectTheHub(this.props.token);
        this.props.SubscribeToHub(this.props.user);
        this.props.GetOfflineVehicles(this.props.user);
        //navigator.geolocation.getCurrentPosition(this.currentCoords);
        //console.log("Will Mount Center => :", this.state.center);
    }

    componentWillUnmount() {
        this.setState({ timeOffUnmount: new Date().toLocaleTimeString() });
        //console.log('The unmounted time ==>', this.state.timeOffUnmount);
        this.props.UnSubscribeToHub();
    }

    //Time out Functionality
    _onAction(e) {
        
        if (this.state.isTimedOut) {
            this.props.SubscribeToHub(this.props.user);
        }
        this.setState({ isTimedOut: false })
    }

    //Time out Functionality
    _onActive(e) {

        if (this.state.isTimedOut) {
            this.props.SubscribeToHub(this.props.user);
        }
        this.setState({ isTimedOut: false })
    }

    //Time out Functionality
    _onIdle(e) {

        const isTimedOut = this.state.isTimedOut
        if (isTimedOut) {
            console.log("Timed Out!!!")
            this.props.UnSubscribeToHub();
        } else {
            this.setState({ showModal: true })
            this.idleTimer.reset();
            this.setState({ isTimedOut: true })
        }

    }

    //current location check
    currentCoords = (position) => {

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        this.setState({
            center: { lat: latitude, lng: longitude },
            currentPosition: true
        })
        this.forceUpdate();
        //console.log("Center function called ====> :", this.state.center);

    }


    //marker click
    onChildClick = (point) => {
        if (point.id === undefined) {
            return null
        } else {
            let i = this.state.vehicles.findIndex(vehicle=> vehicle.id === point.id);
            if(i>0){
                this.props.UpdateVehicle(this.state.vehicles[i])
            }
            else{
                this.props.UpdateVehicle('')
            }
            this.setState({
                latitude: point.coordinates.lat,
                longitude: point.coordinates.lng,
                hover: true,
                selectedId: point.id
            });

            this.props.UpdateTheSelectedMarker(this.props.idForSelectedVehicle === point.id ? 0 : point.id);

        }
    }
    


    //style rendering
    markerStyleName( status, isGrouped, isSelected ) {
        
        if (status === trackingConstants.IdleState) {
            return isGrouped ? "idle-cluster" : (isSelected ? "select effect" : "idle-marker")
        }
        else {
            return isGrouped ? "active-cluster" : (isSelected ? "select" : "active-marker")
        }
    }



    render() {


        const position = [29.378586, 47.990341]
        let activeIcon = L.icon({
            iconUrl: activeMarker,
            iconSize: [25,25]
        });

        let idleIcon = L.icon({
            iconUrl :selectedMarker,
            iconSize: [30,30]
        })

        function getIcon(id){

            if(this.props.idForSelectedVehicle!== ''){
                if(id===this.props.idForSelectedVehicle)
                return idleIcon;
                else
                return activeIcon;
            }
            else{
                return activeIcon;
            }

        }

        //L.Marker.prototype.options.icon = activeIcon;

        //const { results } = this.props;
        const { center } = this.state.center;
        const { clusters, selectedId } = this.state;
        const vehicles = this.state.vehicles;
        const idleVehicleCount = this.props.VehicleList.page?.total - this.state.activeCount
        return (
            <div className="mpas-tracking" style={{ height: "100vh", width: "100%" }}>

                <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    element={document}
                    onActive={this.onActive}
                    onIdle={this.onIdle}
                    onAction={this.onAction}
                    debounce={250}
                    timeout={this.state.timeout} />

                

                <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{width:'100%', height:'100%'}}>
                    <div className='activeCount'>
                    <h4 style={{margin:'10px'}}>{this.state.activeCount}</h4>
                    </div>
                    <div className='idleCount'>
                    <h4 style={{margin:'10px'}}>{idleVehicleCount > 0 ? idleVehicleCount : 0}</h4>
                    </div>
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                    

                    {vehicles.map(point =>(

                            <Marker 
                                icon={activeIcon}
                                key={point.id}
                                position={[point.coordinates.lat,point.coordinates.lng]}
                                eventHandlers={{
                                    click: () => {
                                      this.onChildClick(point)
                                    },}}>
                            </Marker>

                            // <SimpleMarker
                            //         style={this.markerStyleName(point.status, false, point.id === this.props.idForSelectedVehicle)}
                            //         key={point.id}
                            //         text={point.id}
                            //         lat={point.coordinates.lat}
                            //         lng={point.coordinates.lng} />

                    ))}

                </MapContainer>
            </div>

            
            )
       
    }
}





const mapStateToProps = (state) => {

    //const vehicles = [...state.Tracking.ActiveVehicles, ...state.Tracking.IdleVehicles]
  //  const points = vehicles.map(result => ({ id: parseInt(result.deviceId), status: result.status, lat: parseFloat(result.coordinates.latitude), lng: parseFloat(result.coordinates.longitude) }))
    //console.log('Mapped State Array returned :', points);
    return {
        //result: points,
        VehicleList: state.Tracking.IdleVehicles,//state.VehicleStore.Vehicles,
        idForSelectedVehicle: state.Tracking.idForSelectedVehicle,
        movedVehicle : state.Tracking.MovedVehicle,
        token : state.Login.token,
        user : state.Login.user
    }
    
}

const actionCreators = {
    connectTheHub : TrackingAction.InitializeHub,
    GetOfflineVehicles: TrackingAction.getOfflineData,
    SubscribeToHub: TrackingAction.SubscribeToHub,
    UnSubscribeToHub: TrackingAction.UnsubscribeFromHub,
    UpdateTheSelectedMarker: TrackingAction.updateSelectedMarker,
    UpdateVehicle : TrackingAction.updateVehicle
};

const connectedTracking = connect(mapStateToProps, actionCreators)(Tracking);
export { connectedTracking as Tracking };