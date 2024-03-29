﻿import React, { Component } from 'react';
import SecondaryList from './SecondaryList';
import { connect } from 'react-redux';
import * as VehicleAction from '../../../../Redux/Action';
import * as TrackingAction from '../../../../Redux/Action';

class SecondaryTracking extends Component {

    constructor(props) {
        super(props);
        this.state={
            selectedVehicle:'',
            selectedId : ''
        }
    }

    //Render the Acordian
    renderAllVehicles(VehicleListToBeRendered) {
        return (
            <div>{
                this.props.idForSelectedVehicle !== '' && 
                    <SecondaryList vehicle={VehicleListToBeRendered} dismissInfo={this.props.updateMarker}/>
            }</div>
        )
    }


    static getDerivedStateFromProps(props, state) {
        if (props.vehicleDetail !== undefined) {
            if (props.vehicleDetail.id !== state.selectedVehicle.id) {
                return {
                    selectedVehicle   : props.vehicleDetail
                }
            }
        }
        if (props.idForSelectedVehicle !=='' && (props.idForSelectedVehicle !== state.selectedId)){
            props.GetVehicleDetailForId(props.idForSelectedVehicle);
            return {
                selectedId : props.idForSelectedVehicle
            }
        }
        return null;
    }



    render() {

        //this.state.selectedId!== this.props.idForSelectedVehicle && this.props.GetVehicleDetailForId(635322839);
        let content = this.state.selectedVehicle  !== '' && this.renderAllVehicles(this.state.selectedVehicle);
        return (

            <div style={{height:'100%'}}>

                <div className="search-main">

                            {content}

                </div>

            </div>

        );
    }

}

const mapStateToProps = (state) => {

    return {
        idForSelectedVehicle: state.Tracking.idForSelectedVehicle,
        SelectedVehicle : state.Tracking.SelectedVehicle,
        vehicleDetail : state.VehicleStore.VehicleDetail
    }

}

const actionCreators = {
    GetVehicleDetailForId : VehicleAction.getVehicleDetails,
    updateMarker : TrackingAction.updateSelectedMarker
};

const connectTracking = connect(mapStateToProps, actionCreators)(SecondaryTracking);
export { connectTracking as SecondaryTracking };