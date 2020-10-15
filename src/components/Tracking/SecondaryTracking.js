

import React, { Component } from 'react';
import SecondaryList from '../SecondaryList';
import { connect } from 'react-redux';
import * as TrackingAction from '../../Redux/Action';
import { trackingConstants } from '../../constants/trackingConstants';

class SecondaryTracking extends Component {

    constructor(props) {
        super(props);
        this.state={
            Vehicles: [],
            filter: 'idle',
            idleVehiclesCount: 0,
            activeVehiclesCount: 0
        }
    }


    componentDidMount() {
        this.props.GetOfflineVehicles(this.props.token);
        this.toggleFilter(this.state.filter);
    }

   



    //Toggle Acordian
    showVehicle(index) {
        //this.setState({ selectedIndex: index });
        this.props.UpdateTheSelectedMarker(this.props.idForidForSelectedVehicle === index? 0: index);
    }

    toggleFilter(filterType) {

        this.setState({ filter: filterType });

    }





    //Render the Acordian
    renderAllVehicles(VehicleListToBeRendered) {
        return (
            <div>{
                VehicleListToBeRendered.filter(Vehicle => Vehicle.status === this.state.filter)
                    .map(Vehicle => (
                        <div key={Vehicle.vehicle_id} onClick={(e) => this.showVehicle(Vehicle.id)}>
                            <SecondaryList vehicle={Vehicle} index={Vehicle.id} selectedIndex={this.props.idForidForSelectedVehicle} />
                        </div>
                    ))
            }</div>
        )
    }

    //Return count of Idle & Active
    returnCountForFilterType() {

        if (this.state.filter === trackingConstants.IdleState) {
            return this.props.idleVehiclesCount;
        }
        else {
            return this.props.activeVehiclesCount;
        }
    }

    //Returns the count of the hidden tab
    returnCountForOtherFilterType() {
        if (this.state.filter === trackingConstants.IdleState) {
            return <p><b> Active </b>has {this.props.activeVehiclesCount} result</p>;
        }
        else {
            return <p><b> Idle </b>has {this.props.idleVehiclesCount} result</p>;
        }
    }

    //Applying toggle button style
    returnFilterStyle(BtnType) {
        //console.log("returnFilterStyle() => ", this.state.filter);
        return this.state.filter === BtnType ? "custom-butt active" : "custom-butt";
    }

    render() {

        let content = this.renderAllVehicles(this.props.vehicles);
        //console.log(`              ---Rendered Details()--- 
        //             Selected Filter :      ${this.state.filter}
        //             Idle vehicle count :   ${this.state.idleVehiclesCount}
        //             Active vehicle count : ${this.state.activeVehiclesCount}`)
        return (

            <div>
                <div className="tab-button">
                    <div className="button-back">
                        {/*<div className="notification-duty-on"><span>1</span></div>*/}
                        <button className={this.returnFilterStyle(trackingConstants.ActiveState)} onClick={() => this.toggleFilter(trackingConstants.ActiveState)} style={{ color: "black" }}>({this.props.activeVehiclesCount}) ACTIVE</button>
                        <button className={this.returnFilterStyle(trackingConstants.IdleState)} onClick={() => this.toggleFilter(trackingConstants.IdleState)} style={{ color: "black" }}>IDLE ({this.props.idleVehiclesCount})</button>
                        {/*<div className="notification-duty-off"><span>{this.state.filter === trackingConstants.IdleState ? this.state.idleVehiclesCount : this.state.activeVehiclesCount}</span></div>*/}

                    </div>
                </div>

                <div className="search-main">
                    {
                        this.props.vehicles.filter(vehicle => vehicle.status === this.state.filter).length === 0 ?
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p>No results found
                            <br /> {this.returnCountForOtherFilterType()}</p>
                            </div>
                            :
                            <div className="search-result">
                                <p>Free</p>
                                {content}
                            </div>
                    }


                    <div className="search-part">
                        <div className="search-relative">
                            <input type="text" autoComplete="off" name="search" placeholder="Filter" className="search"></input>
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <span className="cross-icon"><img alt="close button" src="../cross-image.png" /></span>
                        </div>
                    </div>

                </div>

            </div>

        );
    }

}

const mapStateToProps = (state) => {

    //console.log("Secondary panel Update off obj : ", state.Tracking.IdleVehicles)
    //const points = [...state.Tracking.ActiveVehicles, ...state.Tracking.IdleVehicles]
    //const points = sampleArray.map(result => ({ vehicle_id: parseInt(result.vehicle_id), status: result.status, lat: parseFloat(result.coordinates.latitude), lng: parseFloat(result.coordinates.longitude) }))
    //console.log('Mapped State Array returned :', points);

    return {
        vehicles: state.Tracking.IdleVehicles,
        idleVehiclesCount: state.Tracking.IdleVehicles.length,
        //activeVehiclesCount: state.Tracking.ActiveVehicles.length,
        idForidForSelectedVehicle: state.Tracking.idForSelectedVehicle,
        selectedNavItem: state.Login.SelectedNavOption,
        token : state.Login.token
    }

}

const actionCreators = {
    GetOfflineVehicles: TrackingAction.getOfflineData,
    UpdateTheSelectedMarker: TrackingAction.updateSelectedMarker
};

const connectTracking = connect(mapStateToProps, actionCreators)(SecondaryTracking);
export { connectTracking as SecondaryTracking };