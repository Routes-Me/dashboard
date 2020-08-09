﻿import React, { Component } from 'react';
import Modal from '../Dialog/Modal';
import axios from 'axios';
import { connect } from 'react-redux';
import { userConstants } from '../../constants/userConstants';
import * as VehicleAction from '../../Redux/Action';

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
            isOpen: false,
            vehicle: '',
            optionsIndex: 0
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        //this.populateVehicleData();
        this.props.getVehiclesForInstitution();
        this.props.getVehicleModels();
    }


 

    //Page Selection
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    //Handle submenu for the table row
    openSubMenuForVehicleId = (e, vehicleId) => {
        e.preventDefault();
        this.setState({ optionsIndex: this.state.optionsIndex === vehicleId? 0:vehicleId });
    }

    //show model dialog 
    toggleModal = (e, Vehicle) => {
        e.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen,
            vehicle: Vehicle,
            optionsIndex: 0,
            ModelList: this.props.ModelList
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
                                        <td>{Vehicle.deviceId}</td>
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
                                                    <li><a onClick={e => this.toggleModal(e, Vehicle)}>Edit</a></li>
                                                    <li><a onClick={e => this.}>Delete</a></li>
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
            <div className="vehicles-page">
                <Modal
                    show={this.state.isOpen}
                    objectType={userConstants.NavItem_Vehicles}
                    objectToDisplay={this.state.vehicle}
                    onClose={this.toggleModal}
                    modelList={this.state.ModelList} />

                <div className="top-part-vehicles-search padding-lr-80">
                    <div className="hehading-add-butt">
                        <h3>Vehicles</h3>
                        <a className="vehicle-add-butt" onClick={e => this.toggleModal(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Vehicle</a>
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
            </div>
        );
    }

}

const mapStateToProps = (state) => {

    const vehicles = state.VehicleStore.Vehicles;
    const modelList = state.VehicleStore.Models;
    console.log('Mapped State Vehicle Array returned :', modelList);

    return {
        VehicleList: vehicles,
        ModelList: modelList
    }

}

const actionCreators = {
    getVehiclesForInstitution: VehicleAction.getVehiclesForInstitutionID,
    getVehicleModels: VehicleAction.getModels,
    deleteVehicle: VehicleAction.deleteVehicle
};

const connectedVehicles = connect(mapStateToProps, actionCreators)(Vehicles);
export { connectedVehicles as Vehicles };