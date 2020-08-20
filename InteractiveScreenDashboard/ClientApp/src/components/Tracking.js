import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as TrackingAction from '../Redux/Action';
import GoogleMapReact from 'google-map-react';
import ClusterMarker from './markers/ClusterMarker';
import SimpleMarker from './markers/SimpleMarker';
import OfflineMarker from './markers/OfflineMarker';
import supercluster from 'points-cluster';
import { susolvkaCoords, markersData } from './data/fakeData';
import IdleTimer from 'react-idle-timer';
import { trackingConstants } from '../constants/trackingConstants';

const MAP = {
    defaultZoom: 7,
    defaultCenter: susolvkaCoords,
    options: {
        minZoom: 2,
        maxZoom: 15,
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
        this.onChildClick = this.onChildClick.bind(this)
        //this.handleMapChange = this.handleMapChange.bind(this)
        this.onChildMouseEnter = this.onChildMouseEnter.bind(this)
        this.state = {

            loading: false,
            latitude: '',
            longitude: '',
            result: '',
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
            timeout: 100000 * 20 * 1,  //10000 * 20 * 1,
            showModal: false,
            userLoggedIn: false,
            isTimedOut: false,
            timeOffUnmount:''

        };

    }

    //Clustering handled by 3rd Party Supercluster
    getClusters = () => {

        const clusters = supercluster(this.props.result, {
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

        console.log("HandleMapChange Called ==>", this.state.clusters)
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

    componentWillMount() {

        console.log('This is the time of unmount',this.state.timeOffUnmount)
        this.props.SubscribeToHub();
        this.props.GetOfflineVehicles()
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
            })
            this.props.UpdateTheSelectedMarker(num);
            console.log('selected id :', this.state.selectedId)
        }
    }

    //style rendering
    markerStyleName( status, isGrouped, isSelected ) {
        
        if (status === trackingConstants.IdleState) {
            return isGrouped ? "idle-cluster" : (isSelected ? "idle-marker selected" : "idle-marker")
        }
        else {
            return isGrouped ? "active-cluster" : (isSelected ? "active-marker selected" : "active-marker")
        }
    }

    componentWillReceiveProps() {
        //this.getClusters();
    }

    //setSelectedMarker = (marker) => {
    //    this.setState({ selected: marker})
    //}


    render() {

        //const { results } = this.props;
        const { center } = this.state.center;
        const { clusters, selectedId } = this.state;
        //console.log("Render Body", clusters)
        //console.log("Rendered Count on result", results.length);

        return (
            <div className="mpas-tracking" style={{ height: "100vh", width: "100%" }}>

                < IdleTimer
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
                    onChildMouseEnter={this.onChildMouseEnter}
                    yesIWantToUseGoogleMapApiInternals>
                    {
                        clusters.map((cluster, index) => {
                           
                            if (cluster.numPoints === 1)
                            {
                                const isSelected = cluster.points[0].id === parseInt(this.props.idForSelectedVehicle)
                                return <SimpleMarker
                                    style={this.markerStyleName(cluster.points[0].status, false, isSelected )}
                                    key={cluster.points[0].id}
                                    text={cluster.points[0].id}
                                    lat={cluster.points[0].lat}
                                    lng={cluster.points[0].lng} />
                            }
                            else
                            {
                                const isIdle = cluster.points.filter(point => point.status === trackingConstants.IdleState).length >= cluster.points.filter(point => point.status === trackingConstants.ActiveState).length
                                const status = isIdle ? trackingConstants.IdleState : trackingConstants.ActiveState
                                return <ClusterMarker
                                    styles={this.markerStyleName(status, true, false)}
                                    key={cluster.id}
                                    lat={cluster.lat}
                                    lng={cluster.lng}
                                    text={cluster.numPoints}
                                    points={cluster.points} />
                            }
                        })
                    }
                    
                </GoogleMapReact>
                
            </div>
            )
       
    }
}





const mapStateToProps = (state) => {

    //console.log("Update obj : ", state.Tracking.OflineUpdates)
    const vehicles = [...state.Tracking.ActiveVehicles, ...state.Tracking.IdleVehicles]
    const points = vehicles.map(result => ({ id: parseInt(result.vehicle_id), status: result.status, lat: parseFloat(result.coordinates.latitude), lng: parseFloat(result.coordinates.longitude) }))
    //console.log('Mapped State Array returned :', points);
    return {
        result: points,
        idForSelectedVehicle: state.Tracking.idForSelectedVehicle
    }
    
}

const actionCreators = {
    GetOfflineVehicles: TrackingAction.getOfflineData,
    SubscribeToHub: TrackingAction.SubscribeToHub,
    UnSubscribeToHub: TrackingAction.UnsubscribeFromHub,
    UpdateTheSelectedMarker: TrackingAction.updateSelectedMarker
};

const connectedTracking = connect(mapStateToProps, actionCreators)(Tracking);
export { connectedTracking as Tracking };