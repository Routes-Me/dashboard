import React, { Component, useState, useRef } from 'react';
//import { HubConnection } from '@aspnet/signalr';
//import * as signalR from '@aspnet/signalr';
import { connect } from 'react-redux';
import * as TrackingAction from '../Redux/Action';
import GoogleMapReact from 'google-map-react';
import ClusterMarker from './markers/ClusterMarker';
import SimpleMarker from './markers/SimpleMarker';
import supercluster from 'points-cluster';
import { susolvkaCoords, markersData } from './data/fakeData';

const MAP = {
    defaultZoom: 8,
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


        this.state = {
            loading: false,
            latitude: '',
            longitude: '',
            result: '',
            center: "",
            zoom: this.props.zoom,
            hover: false,
            currentPosition: false,
            mapOptions: {
                center: MAP.defaultCenter,
                zoom: MAP.defaultZoom,
            },
            clusters: [],
            stores: [{ lat: 59.955513, lng: 30.337844 }, { lat: 58.955413, lng: 30.337844 }]
        };

 

    }


    getClusters = () => {
        const clusters = supercluster(markersData, {
            minZoom: 0,
            maxZoom: 16,
            radius: 60,
        });
        return clusters(this.state.mapOptions);
    };


   createClusters = props => {
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            text: numPoints,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points,
          }))
        : [],
    });
  };

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
                this.createClusters(this.props);
            }
        );
    };

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(this.currentCoords)
    }

    componentDidMount() {
        this.props.SubscribeToHub();
    }

    //componentWillUpdate() {
    //    this.setState({ latitude: this.props.results.coordinates.latitude });
    //    this.setState({ longitude: this.props.results.coordinates.longitude });
    //}

    componentWillUnmount() {
        this.props.UnSubscribeToHub();
    }

    


    currentCoords = (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        this.setState({
            center: { lat: latitude, lng: longitude },
            currentPosition: true
        })
    }

    onChildMouseEnter = (num, childProps) => {
        if (childProps.facility === undefined) {
            return null
        } else {
            this.setState({
                Name: childProps.facility.name,
                lat: childProps.lat,
                lng: childProps.lng,
                hover: true
            })
        }
    }

    onChildMouseLeave = (num, childProps) => {
        console.log("leaving")
        if (childProps.facility === undefined) {
            return null
        } else {

            this.setState({
                lat: "",
                lng: "",
                hover: false
            })
        }
    }

 

    static defaultProps = {
        center: { lat: 59.955413, lng: 30.337844 },
        zoom: 14
    };

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            console.log("lat & Long ", store.lat)
            return <SimpleMarker key={index} id={index} position={{ lat: store.lat, lng: store.lng }}
            onClick={() => console.log("You clicke =>", index)}/>
        })
    }

    render() {

        const { results } = this.props;
        console.log("Render Body", this.props)
        console.log("Count on result", results.length)
        const resultList = results.vehicle_id ? (
            //<div className="col-md-12">
            //            <h4>
            //            Latitude :  {results.coordinates.latitude}<br />
            //            Longitude :  {results.coordinates.longitude}
            //            </h4>
            <div style={{ height: "100vh", width: "100%" }}>

                {/*<GMap center={{ lat: parseFloat(results.coordinates.latitude), lng: parseFloat(results.coordinates.longitude) }} zoom={4}/>
                 <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyAQQUPe-GBmzqn0f8sb_8xZNcseul1N0yU' }}
                        //defaultCenter={{ lat: parseFloat(results.coordinates.latitude), lng: parseFloat(results.coordinates.longitude) }}
                        defaultCenter={this.props.currentCoords}
                        defaultZoom={this.props.zoom}
                        onChildMouseEnter={this.onChildMouseEnter}
                        onChildMouseLeave={this.onChildMouseLeave}
                    onChange={({ zoom, bounds }) => {
                        setZoom(zoom);
                        setBounds([
                            bounds.nw.lng,
                            bounds.se.lat,
                            bounds.se.lng,
                            bounds.nw.lat
                        ]);
                    }}>
                         <SimpleMarker
                            lat={results.coordinates.latitude}
                            lng={results.coordinates.latitude}
                        text="My Marker" />

                    {this.displayMarkers()}
                    </GoogleMapReact> 
                </div>*/}

           </div>
        ) : (<div className="col-md-12">Waiting for updates</div>) ;

        return (
            <div style={{ height: "100vh", width: "100%" }}>
                {/*{resultList}*/}
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAQQUPe-GBmzqn0f8sb_8xZNcseul1N0yU' }}
                    defaultZoom={MAP.defaultZoom}
                    defaultCenter={MAP.defaultCenter}
                    options={MAP.options}
                    onChange={this.handleMapChange}
                    yesIWantToUseGoogleMapApiInternals>
                    {this.state.clusters.map(cluster => {
                        if (cluster.numPoints === 1)
                            return (
                                <SimpleMarker
                                    key={cluster.id}
                                    lat={cluster.points[0].lat}
                                    lng={cluster.points[0].lng}/>
                            );
                        else
                        return (
                            <ClusterMarker
                                key={cluster.id}
                                lat={cluster.lat}
                                lng={cluster.lng}
                                text={cluster.numPoints}
                                points={cluster.points}/>
                        );
                    })}
                </GoogleMapReact>
            </div>
            )
       
    }
}




const mapStateToProps = (state) => {

    console.log("Update obj : ", state.Tracking.Updates)
    //const results= state.Tracking.Updates
    return {
        results: state.Tracking.Updates
    }
    
}

const actionCreators = {
    SubscribeToHub: TrackingAction.SubscribeToHub,
    UnSubscribeToHub: TrackingAction.UnsubscribeFromHub
};

const connectedTracking = connect(mapStateToProps, actionCreators)(Tracking);
export { connectedTracking as Tracking };