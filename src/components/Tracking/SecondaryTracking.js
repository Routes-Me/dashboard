import React, { Component } from 'react';
import SecondaryList from '../SecondaryList';
import { connect } from 'react-redux';
import * as TrackingAction from '../../Redux/Action';
import * as VehicleAction from '../../Redux/Action';
import { trackingConstants } from '../../constants/trackingConstants';

class SecondaryTracking extends Component {

    constructor(props) {
        super(props);
        this.state={
            selectedVehicle:'',
            selectedId : undefined
        }
    }


    


    //Render the Acordian
    renderAllVehicles(VehicleListToBeRendered) {
        return (
            <div>{
                this.props.idForSelectedVehicle > 0 && 
                    <SecondaryList vehicle={VehicleListToBeRendered}/>
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
        if (props.idForSelectedVehicle !== 0 && (props.idForSelectedVehicle !== state.selectedId)){
            props.GetVehicleDetailForId(635322839);
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

            <div>

                <div className="search-main">

                    {
                        <div className="search-result">
                            {content}
                        </div>
                    }

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
    GetOfflineVehicles: TrackingAction.getOfflineData,
    UpdateTheSelectedMarker: TrackingAction.updateSelectedMarker,
    GetVehicleDetailForId : VehicleAction.getVehicleDetails
};

const connectTracking = connect(mapStateToProps, actionCreators)(SecondaryTracking);
export { connectTracking as SecondaryTracking };