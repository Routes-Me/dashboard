import React, { Component } from 'react';
import SecondaryList from './SecondaryList';
import { connect } from 'react-redux';
import * as TrackingAction from '../Redux/Action';
import { trackingConstants } from '../constants/trackingConstants';
import { SecondaryTracking } from '../components/Tracking/SecondaryTracking';
import { SecondaryVehicles } from '../components/Vehicles/SecondaryVehicles';
import { InstitutionsSecondary } from '../components/Institutions/InstitutionsSecondary';
import { UsersSecondary } from '../components/Users/UsersSecondary';

import { userConstants } from '../constants/userConstants';

class Secondary extends Component {

    constructor(props) {
        super(props);

        this.state = {

            Vehicles: [],
            loading: true,
            failed: false,
            error: '',
            filter: 'idle',
            idleVehiclesCount: 0,
            activeVehiclesCount:0
        };

        this.toggleFilter = this.toggleFilter.bind(this)
        this.renderAllVehicles = this.renderAllVehicles.bind(this)
        this.returnCountForFilterType = this.returnCountForFilterType.bind(this)

    }

    componentWillMount() {
        this.props.GetOfflineVehicles();
        this.toggleFilter(this.state.filter);
    }

    componentDidMount() {
        this.props.GetOfflineVehicles();
        //this.toggleFilter(this.state.filter);
    }



    //Toggle Acordian
    showVehicle(index) {
        //this.setState({ selectedIndex: index });
        this.props.UpdateTheSelectedMarker(index);
    }

    toggleFilter(filterType) {

        this.setState({ filter: filterType });
        
    }

    

    

    //Render the Acordian
    renderAllVehicles(VehicleListToBeRendered) {
        //console.log('renderAllVehicles(): Selected Index :', this.state.selectedIndex)
        
        return (
            <div>{
                    VehicleListToBeRendered.filter(Vehicle => Vehicle.status === this.state.filter)
                    .map(Vehicle => (
                        <div onClick={(e) => this.showVehicle(Vehicle.vehicle_id)}>
                            <SecondaryList vehicle={Vehicle} index={Vehicle.vehicle_id} selectedIndex={this.props.idForidForSelectedVehicle} />
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
        console.log("returnFilterStyle() => ", this.state.filter);
        return this.state.filter === BtnType ? "custom-butt active" : "custom-butt" ;
    }

    render() {

        let content = this.renderAllVehicles(this.props.vehicles);
        //console.log(`              ---Rendered Details()--- 
        //             Selected Filter :      ${this.state.filter}
        //             Idle vehicle count :   ${this.state.idleVehiclesCount}
        //             Active vehicle count : ${this.state.activeVehiclesCount}`)
        return (
            < div >
                {/*{this.props.selectedNavItem === userConstants.NavItem_Tracking ? <SecondaryTracking /> : <SecondaryVehicles />}*/}

                {this.props.selectedNavItem === userConstants.NavItem_Vehicles && <SecondaryVehicles />}
                {this.props.selectedNavItem === userConstants.NavItem_Tracking && <SecondaryTracking />}
                {this.props.selectedNavItem === userConstants.NavItem_Institutions && <InstitutionsSecondary />}
                {this.props.selectedNavItem === userConstants.NavItem_Users && <UsersSecondary />}

            </div >
            );
    }
}



const mapStateToProps = (state) => {

    console.log("Secondary panel Update off obj : ", state.Tracking.IdleVehicles)
    console.log("Secondary panel Update on obj : ", state.Tracking.ActiveVehicles)
    const points = [...state.Tracking.ActiveVehicles, ...state.Tracking.IdleVehicles]
    //const points = sampleArray.map(result => ({ vehicle_id: parseInt(result.vehicle_id), status: result.status, lat: parseFloat(result.coordinates.latitude), lng: parseFloat(result.coordinates.longitude) }))
    console.log('Mapped State Array returned :', points);


    return {
        vehicles: points,
        idleVehiclesCount: state.Tracking.IdleVehicles.length,
        activeVehiclesCount: state.Tracking.ActiveVehicles.length,
        idForidForSelectedVehicle: state.Tracking.idForSelectedVehicle,
        selectedNavItem: state.Login.SelectedNavOption
    }

}

const actionCreators = {
    GetOfflineVehicles: TrackingAction.getOfflineData,
    UpdateTheSelectedMarker: TrackingAction.updateSelectedMarker
};

const connectTracking = connect(mapStateToProps, actionCreators)(Secondary);
export { connectTracking as Secondary };