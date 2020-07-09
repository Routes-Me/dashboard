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
            selectedIndex:0
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
        this.setState({ selectedIndex: index });
    }

    //Render the Acordian
    renderAllVehicles() {
        console.log('Selected Index :', this.state.selectedIndex)
        return (
            <div>
                {
                    this.props.vehicles.map(Vehicle => (
                        <div onClick={(e) => this.toggleItem(Vehicle.id)}>
                        <SecondaryList vehicle={Vehicle} index={Vehicle.id} selectedIndex={this.state.selectedIndex} />
                        </div>
                    ))
            }
            </div>
        )
    }

    render() {

        
        let content = this.renderAllVehicles();

        return (

            <div className="search-main">

                <div className="result-not-found">
                    <p>No results found</p>
                    <p><b>DUTY OFF</b>has 1 reult</p>
                </div>

                <div className="search-result">
                    <p>Free</p>
                    {content}
                    

                    <p>occupied</p>
                    <ul className="manual-menu">
                        <li><a href="#">Fulan Abu Flan</a></li>
                        <li><a href="#">Mohammad All</a></li>
                        <li><a href="#">Saad Mue</a></li>
                        <li><a href="#">Waseem Noor</a></li>
                    </ul>
                </div>

                <div className="search-part">
                    <div className="search-relative">
                        <input type="text" autoComplete="off" name="search" placeholder="Search" className="search"></input>
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <span className="cross-icon"><img src="../cross-image.png" /></span>
                    </div>
                </div>

            </div>
            
            );
    }
}



const mapStateToProps = (state) => {

    console.log("Secondary panel Update off obj : ", state.Tracking.OflineUpdates)
    const sampleArray = [...state.Tracking.Updates, ...state.Tracking.OflineUpdates]
    const points = sampleArray.map(result => ({ id: parseInt(result.vehicle_id), status: result.status, lat: parseFloat(result.coordinates.latitude), lng: parseFloat(result.coordinates.longitude) }))
    console.log('Mapped State Array returned :', points);
    return {
        vehicles: points
    }

}

const actionCreators = {
    GetOfflineVehicles: TrackingAction.getOfflineData,
    UpdateTheSelectedMarker: TrackingAction.updateSelectedMarker
};

const connectTracking = connect(mapStateToProps, actionCreators)(Secondary);
export { connectTracking as Secondary };