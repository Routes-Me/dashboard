import React, { Component } from 'react';
import axios from 'axios';
import SecondaryList from './SecondaryList';
import { connect } from 'react-redux';
import * as TrackingAction from '../Redux/Action';

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

    }

    componentWillMount() {
        //this.props.GetOfflineVehicles()
        this.populateVehicleData();
        this.toggleFilter(this.state.filter);
    }


    //Populate vehicles with API
    populateVehicleData() {
        axios.get("http://localhost:55205/api/Vehicles").then(result => {
            const response = result.data;
            this.setState({ Vehicles: response, loading: false, failed: false, error: "" });
        }).catch(error => {
            this.setState({ vehicles: [], loading: false, failed: true, error: "Vehicles could not be loaded" });
        });
    }

    //Toggle Acordian
    toggleItem(index) {
        //this.setState({ selectedIndex: index });
        this.props.UpdateTheSelectedMarker(index);
    }

    toggleFilter(filterType) {
        this.setState({ filter: filterType });
        filterType === "idle" ?
            this.setState({ idleVehiclesCount: this.props.vehicles.filter(Vehicle => Vehicle.status === filterType).length })
            : this.setState({ activeVehiclesCount: this.props.vehicles.filter(Vehicle => Vehicle.status === filterType).length });
    }

    //Render the Acordian
    renderAllVehicles() {
        //console.log('renderAllVehicles(): Selected Index :', this.state.selectedIndex)
        
        return (
            <div>{
                    this.props.vehicles.filter(Vehicle => Vehicle.status === this.state.filter)
                    .map(Vehicle => (
                        <div onClick={(e) => this.toggleItem(Vehicle.vehicle_id)}>
                            <SecondaryList vehicle={Vehicle} index={Vehicle.vehicle_id} selectedIndex={this.props.idForidForSelectedVehicle} />
                        </div>
                    )) 
            }</div>
        )
    }

    //Return count of Idle & Active
    returnCountForFilterType() {
        if (this.state.filter === "idle") {
            return this.state.idleVehiclesCount;
        }
        else {
            return this.state.activeVehiclesCount;
        }
    }

    returnCountForOtherFilterType() {
        if (this.state.filter === "idle") {
            return <p><b> Active </b>has {this.state.activeVehiclesCount} result</p>;
        }
        else {
            return <p><b> Idle </b>has {this.state.idleVehiclesCount} result</p>;
        }
    }

    render() {

        
        let content = this.renderAllVehicles();
        console.log('toggleFilter(): Selected Filter :', this.state.filter)
        console.log('toggleFilter(): Selected Filter Idle vehicle count :', this.state.idleVehiclesCount)
        console.log('toggleFilter(): Selected Filter Active vehicle count :', this.state.activeVehiclesCount)
        return (

            <div>
                <div className="tab-button">
                    <div className="button-back">
                        {/*<div className="notification-duty-on"><span>1</span></div>*/}
                        <button className="custom-butt" onClick={() => this.toggleFilter("active")}>({this.state.activeVehiclesCount}) ACTIVE</button>
                        <button className="custom-butt active" onClick={() => this.toggleFilter("idle")}>IDLE ({this.state.idleVehiclesCount})</button>
                        {/*<div className="notification-duty-off"><span>{this.state.filter === "idle" ? this.state.idleVehiclesCount : this.state.activeVehiclesCount}</span></div>*/}

                    </div>
                </div>
                
                <div className="search-main">

                    {
                        this.returnCountForFilterType() === 0 ?
                            <p>No results found
                            <br /> {this.returnCountForOtherFilterType()}</p>
                        :
                        <div className="search-result">
                            <p>Free</p>
                            {content}
                        </div>
                    }
                    
                    

                        {/*<p>occupied</p>
                    <ul className="manual-menu">
                        <li><a href="#">Fulan Abu Flan</a></li>
                        <li><a href="#">Mohammad All</a></li>
                        <li><a href="#">Saad Mue</a></li>
                        <li><a href="#">Waseem Noor</a></li>
                    </ul>*/}
                

                <div className="search-part">
                    <div className="search-relative">
                        <input type="text" autoComplete="off" name="search" placeholder="Search" className="search"></input>
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <span className="cross-icon"><img src="../cross-image.png" /></span>
                    </div>
                </div>

                </div>
            </div>
            
            );
    }
}



const mapStateToProps = (state) => {

    console.log("Secondary panel Update off obj : ", state.Tracking.IdleVehicles)
    const points = [...state.Tracking.ActiveVehicles, ...state.Tracking.IdleVehicles]
    //const points = sampleArray.map(result => ({ vehicle_id: parseInt(result.vehicle_id), status: result.status, lat: parseFloat(result.coordinates.latitude), lng: parseFloat(result.coordinates.longitude) }))
    console.log('Mapped State Array returned :', points);
    return {
        vehicles: points,
        idForidForSelectedVehicle: state.Tracking.idForSelectedVehicle
    }

}

const actionCreators = {
    GetOfflineVehicles: TrackingAction.getOfflineData,
    UpdateTheSelectedMarker: TrackingAction.updateSelectedMarker
};

const connectTracking = connect(mapStateToProps, actionCreators)(Secondary);
export { connectTracking as Secondary };