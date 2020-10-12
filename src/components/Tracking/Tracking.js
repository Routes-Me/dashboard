import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as TrackingAction from '../../Redux/Action';
import GoogleMapReact from 'google-map-react';
//import GoogleMap from 'google-map-react';

import ClusterMarker from '../markers/ClusterMarker';
import SimpleMarker from '../markers/SimpleMarker';
import supercluster from 'points-cluster';
import { susolvkaCoords, markersData } from '../data/fakeData';
import IdleTimer from 'react-idle-timer';
import { trackingConstants } from '../../constants/trackingConstants';

const MAP = {
    defaultZoom: 7,
    defaultCenter: susolvkaCoords,
    options: {
        minZoom: 7,
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
                //center: MAP.defaultCenter,
                zoom: MAP.defaultZoom
            },
            clusters: [],
            timeout: 100000 * 30 * 1,  //10000 * 20 * 1,
            showModal: false,
            userLoggedIn: false,
            isTimedOut: false,
            timeOffUnmount:''

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
                vehicles: vehicleList
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
        this.props.SubscribeToHub();
        this.props.GetOfflineVehicles();
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
        //console.log('user did something', e)
        if (this.state.isTimedOut) {
            this.props.SubscribeToHub();
        }
        this.setState({ isTimedOut: false })
    }

    //Time out Functionality
    _onActive(e) {

        //console.log('user is active', e)
        if (this.state.isTimedOut) {
            this.props.SubscribeToHub();
        }
        this.setState({ isTimedOut: false })
    }

    //Time out Functionality
    _onIdle(e) {

        //console.log('user is idle', e)
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

    //marker Hovering 
    onChildMouseEnter = (num, childProps) => {

        if (childProps.vehicle_id === undefined) {
            return null
        } else {
            this.setState({
                Name: childProps.vehicle_id,
                lat: childProps.coordinates.latitude,
                lng: childProps.coordinates.longitude,
                hover: true
            })
            this.props.UpdateTheSelectedMarker(num);
            console.log('Hovered id :', this.state.selectedId)
        }

    }

    //marker Hovering 
    onChildMouseLeave = (num, childProps) => {

        console.log("leaving")
        if (childProps.vehicle_id === undefined) {
            return null
        } else {

            this.setState({
                lat: "",
                lng: "",
                hover: false
            })
        }

    }

    //marker click
    onChildClick = (num, childProps) => {
        console.log('Child Props ==>', childProps)
        console.log('Vehicle Id ==>', num)
        if (num === undefined) {
            return null
        } else {
            this.setState({
                latitude: childProps.lat,
                longitude: childProps.lng,
                hover: true,
                selectedId: num
            });

            this.props.UpdateTheSelectedMarker(this.props.idForSelectedVehicle === num ? 0 : num);
            //this.props.onCenterChange([childProps.lat, childProps.lng]);
            //console.log('selected id :', this.state.selectedId);

        }
    }

    _handleZoomChanged() {
        const zoomLevel = this.refs.map.getZoom();
        if (zoomLevel !== this.state.zoomLevel) {
            this.setState({ zoomLevel });
        }
    }

    _handleCenterChanged() {
        const center = this.refs.map.getCenter();
        if (!center.equals(this.state.center)) {
            this.setState({ center });
        }
    }
    


    //style rendering
    markerStyleName( status, isGrouped, isSelected ) {
        
        if (status === trackingConstants.IdleState) {
            return isGrouped ? "idle-cluster" : (isSelected ? "select" : "idle-marker")
        }
        else {
            return isGrouped ? "active-cluster" : (isSelected ? "selected-marker" : "active-marker")
        }
    }



    render() {

        //const { results } = this.props;
        const { center } = this.state.center;
        const { clusters, selectedId } = this.state;
        const vehicles = this.state.vehicles;
        //console.log("Render Body", clusters)
        //console.log("Rendered Count on result", results.length);

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

                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAQQUPe-GBmzqn0f8sb_8xZNcseul1N0yU' }}
                    defaultZoom={MAP.defaultZoom}
                    defaultCenter={MAP.defaultCenter}
                    options={MAP.options}
                    onChange={this.handleMapChange}
                    onChildClick={this.onChildClick}
                    onCenterChanged={this._handleCenterChanged.bind(this)}
                    onZoomChanged={this._handleZoomChanged.bind(this)}
                    yesIWantToUseGoogleMapApiInternals>
                    {
                        vehicles.map(point =>(
                            <SimpleMarker
                                    style={this.markerStyleName(point.status, false, point.id === this.props.idForSelectedVehicle)}
                                    key={point.id}
                                    text={point.id}
                                    lat={point.coordinates.lat}
                                    lng={point.coordinates.lng} />
                        ))
                        
                        
                        // clusters.map((cluster, index) => {
                        //     if (cluster.numPoints === 1)
                        //     {
                        //         const isSelected = cluster.points[0].id === parseInt(this.props.idForSelectedVehicle)
                        //         return <SimpleMarker
                        //             style={this.markerStyleName(cluster.points[0].status, false, isSelected )}
                        //             key={cluster.points[0].id}
                        //             text={cluster.points[0].id}
                        //             lat={cluster.points[0].lat}
                        //             lng={cluster.points[0].lng} />
                        //     }
                        //     else
                        //     {
                        //         const isIdle = cluster.points.filter(point => point.status === trackingConstants.IdleState).length >= cluster.points.filter(point => point.status === trackingConstants.ActiveState).length
                        //         const status = isIdle ? trackingConstants.IdleState : trackingConstants.ActiveState
                        //         return <ClusterMarker
                        //             styles={this.markerStyleName(status, true, false)}
                        //             key={cluster.id}
                        //             lat={cluster.lat}
                        //             lng={cluster.lng}
                        //             text={cluster.numPoints}
                        //             points={cluster.points} />
                        //     }
                        // })
                        
                    }
                </GoogleMapReact>
                
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
        idForSelectedVehicle: state.Tracking.idForSelectedVehicle,
        movedVehicle : state.Tracking.MovedVehicle,
        token : state.Login.token
    }
    
}

const actionCreators = {
    connectTheHub : TrackingAction.InitializeHub,
    GetOfflineVehicles: TrackingAction.getOfflineData,
    SubscribeToHub: TrackingAction.SubscribeToHub,
    UnSubscribeToHub: TrackingAction.UnsubscribeFromHub,
    UpdateTheSelectedMarker: TrackingAction.updateSelectedMarker
};

const connectedTracking = connect(mapStateToProps, actionCreators)(Tracking);
export { connectedTracking as Tracking };