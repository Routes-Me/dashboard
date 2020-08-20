import React, { Component } from 'react';
import Detail from '../Detail/Detail';
import axios from 'axios';
import { connect } from 'react-redux';
import { userConstants } from '../../constants/userConstants';
import * as VehicleAction from '../../Redux/Action';
import '../Detail/Detail.css';
import Pagination from "react-js-pagination";

class Vehicles extends Component {

    constructor(props) {
        super(props)

        this.state = {
            VehicleList: [],
            ModelList:[],
            loading: true,
            failed: false,
            error: '',
            activePage: 15,
            showDetails: false,
            vehicle: '',
            optionsIndex: 0
        };
    }

    componentDidMount() {
        //this.populateVehicleData();
        //this.props.getVehicleModels();
        this.props.getVehiclesForInstitution();
    }


 

    //Page Selection
    handlePageChange(pageNumber) {
        //console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    //Handle submenu for the table row
    openSubMenuForVehicleId = (e, vehicleId) => {
        e.preventDefault();
        this.setState({ optionsIndex: this.state.optionsIndex === vehicleId? 0:vehicleId });
    }

    //show detail screen 
    showDetailScreen = (e, Vehicle) => {
        e.preventDefault();
        this.setState({
            showDetails: !this.state.showDetails,
            vehicle: Vehicle,
            optionsIndex: 0
        });
    }


    //Delete Vehicle function


    //Load Vehicles in a table
    renderAllVehicleTable(Vehicles) {
        return (
            <div className="table-list-vehicles">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Plate</th>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Office</th>
                                <th>Year</th>
                                <th className="width44" />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Vehicles.map(Vehicle => (
                                    <tr  key={Vehicle.id}>
                                        <td>{Vehicle.plateNumber}</td>
                                        <td>{Vehicle.make.name}</td>
                                        <td>{Vehicle.model.name}</td>
                                        <td>{Vehicle.institution.name}</td>
                                        <td>{Vehicle.modelYear}</td>
                                        <td className="width44" >
                                            <div className="edit-popup">
                                                <div className="edit-delet-butt" onClick={e => this.openSubMenuForVehicleId(e, Vehicle.id)}>
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                                <ul className="edit-delet-link" style={{ display: this.state.optionsIndex === Vehicle.id ? 'inline-block' : 'none' }}>
                                                    <li><a onClick={e => this.showDetailScreen(e, Vehicle)}>Edit</a></li>
                                                    <li><a>Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }



    render() {



        //let content = this.state.loading ?
        //    <div><br /><br /><p><em> Loading...</em> </p></div> :
        //    this.state.failed ?
        //        <div className="text-danger"><br /><br />
        //            <em>{this.state.error}</em>
        //        </div> : this.renderAllVehicleTable(this.state.VehicleList);

        let content = this.renderAllVehicleTable(this.props.VehicleList);

        return (
            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>
                {this.state.showDetails ?
                    <Detail className={this.props.show ? 'slide-in' : 'slide-out'}
                        show={this.showDetailScreen}
                        objectType={userConstants.NavItem_Vehicles}
                        object={this.state.vehicle} /> :
                    <div>
                        <div className="top-part-vehicles-search padding-lr-80">
                            <div className="hehading-add-butt">
                                <h3>Vehicles</h3>
                                <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Vehicle</a>
                            </div>

                            <div className="search-part">
                                <div className="search-relative">
                                    <input type="text" name="search" placeholder="Search" className="search" />
                                    <i className="fa fa-search" aria-hidden="true" />
                                    <span className="cross-icon"><img src="../cross-image.png" /></span>
                                </div>
                            </div>
                        </div>
                        {content}
                        <div className="left page-nav padding-lr-80">
                            <span className="page-count">Page 15 of 20</span>
                            <Pagination
                                hideDisabled
                                firstPageText={'<<<<'}
                                lastPageText={'>>>>'}
                                prevPageText={'<<'}
                                nextPageText={'>>'}
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={450}
                                pageRangeDisplayed={10}
                                onChange={this.handlePageChange.bind(this)} />
                        </div>
                    </div>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {

    const vehicles = state.VehicleStore.Vehicles;

    return {
        VehicleList: vehicles
    }

}

const actionCreators = {
    getVehiclesForInstitution: VehicleAction.getVehiclesForInstitutionID,
    deleteVehicle: VehicleAction.deleteVehicle
};

const connectedVehicles = connect(mapStateToProps, actionCreators)(Vehicles);
export { connectedVehicles as Vehicles };