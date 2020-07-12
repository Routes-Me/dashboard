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
            filter: 'active',
            selectedIndex: 0,
            OfflineCount: 0,
            OnlineCount:0
        };

    }

    componentWillMount() {
        //this.props.GetOfflineVehicles()
        this.populateVehicleData();
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
        filterType ==="idle"?
        this.setState({ OfflineCount: this.props.vehicles.filter(Vehicle => Vehicle.status === this.state.filter).length })
            : this.setState({ OnlineCount: this.props.vehicles.filter(Vehicle => Vehicle.status === this.state.filter).length })
    }

    //Render the Acordian
    renderAllVehicles() {
        //console.log('renderAllVehicles(): Selected Index :', this.state.selectedIndex)
        console.log('renderAllVehicles(): Selected Filter :', this.state.filter)
        console.log('renderAllVehicles(): Selected Filter count :', this.state.OfflineCount)
        return (
            <div>{
                
                    this.props.vehicles.filter(Vehicle => Vehicle.status === this.state.filter)
                    .map(Vehicle => (
                        <div onClick={(e) => this.toggleItem(Vehicle.vehicle_id)}>
                            <SecondaryList vehicle={Vehicle} index={Vehicle.vehicle_id} selectedIndex={this.props.selectedVehicle} />
                        </div>
                    )) 
                    
            }</div>
        )
    }

    render() {

        
        let content = this.renderAllVehicles();

        return (

            <div>
                <div className="tab-button">
                    <div className="button-back">
                        {/*<div className="notification-duty-on"><span>1</span></div>*/}
                        <button className="custom-butt active" onClick={(e) => this.toggleFilter("Running")}>Active</button>
                        <button className="custom-butt" onClick={(e) => this.toggleFilter("idle")}>Idle</button>
                        <div className="notification-duty-off"><span>{this.state.filter === "idle" ? this.state.OfflineCount : this.state.OnlineCount}</span></div>

                    </div>
                </div>
                
                <div className="search-main">

                    { this.state.filter==="idle"?
                        parseInt(this.state.OfflineCount) === 0 ?
                            <p>No results found
                            <br /><b> Idle </b>has {this.state.OnlineCount} reult</p>
                            :
                            <div className="search-result">
                                <p>Free</p>
                                {content}
                            </div>
                        :
                        parseInt(this.state.OnlineCount) === 0 ?
                            <p>No results found
                            <br /><b> Idle </b>has {this.state.OfflineCount} reult</p>
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

    console.log("Secondary panel Update off obj : ", state.Tracking.OflineUpdates)
    const points = [...state.Tracking.Updates, ...state.Tracking.OflineUpdates]
    //const points = sampleArray.map(result => ({ vehicle_id: parseInt(result.vehicle_id), status: result.status, lat: parseFloat(result.coordinates.latitude), lng: parseFloat(result.coordinates.longitude) }))
    console.log('Mapped State Array returned :', points);
    return {
        vehicles: points,
        selectedVehicle: state.Tracking.SelectedVehicleId
    }

}

const actionCreators = {
    GetOfflineVehicles: TrackingAction.getOfflineData,
    UpdateTheSelectedMarker: TrackingAction.updateSelectedMarker
};

const connectTracking = connect(mapStateToProps, actionCreators)(Secondary);
export { connectTracking as Secondary };