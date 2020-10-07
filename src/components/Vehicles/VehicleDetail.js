﻿import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as VehicleAction from '../../Redux/Action';
import * as InstitutionAction from '../../Redux/Action';
import Form from 'react-validation/build/form';
import Modal from '../Dialog/Modal';
import { vehicleConstants } from "../../constants/vehicleConstants";

class VehicleDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            deviceId: "",
            vehicleId: "",
            InstitutionId: "",
            make:"",
            model: "",
            modelYear: "",
            plateNumber: "",
            selectedModel: "",
            vehicleToDisplay: "",
            searchModel: false,
            searchObject: "",
            modelList: [],
            makersList:[]
        }
    }

    componentDidMount() {
        console.log("component did mount!")
        this.props.getInstitutions();
    }


    onChange = (event) => {
        this.setState({ [event.target.name] : event.target.value })
    }

    static getDerivedStateFromProps(props, state) {

        if (props.vehicleToDisplay !== undefined) {
            if (props.vehicleToDisplay !== state.vehicleToDisplay) {
                return {
                    vehicleToDisplay: props.vehicleToDisplay,
                    vehicleId: props.vehicleToDisplay.id,
                    InstitutionId: props.vehicleToDisplay.institution.institutionId,
                    modelYear: props.vehicleToDisplay.modelYear,
                    model: props.vehicleToDisplay.model,
                    make: props.vehicleToDisplay.make,
                    deviceId: props.vehicleToDisplay.deviceId,
                    plateNumber: props.vehicleToDisplay.plateNumber,
                    modelList: props.ModelsList,
                    makersList: props.MakersList
                }
            }
        }
    }


    handleSubmit = (event) => {

        event.preventDefault();

        const vehicle = {
            VehicleId: this.state.vehicleId,
            DeviceId: this.state.deviceId,
            PlateNumber: this.state.plateNumber,
            InstitutionId: this.state.InstitutionId,
            modelYear: this.state.modelYear,
            modelId: this.state.model.modelId
        }

        this.props.saveVehicle(vehicle);
    }

    returnListToSearch = () => {
        if (this.state.searchObject !== "" && this.state.searchObject !== undefined) {
            if (this.state.searchObject === vehicleConstants.searchDialogFor_Makers) {
                return this.props.MakersList;
            }
            else {
                return this.props.ModelsList
            } 
        }
    };

    //show model dialog 
    toggleModal = (e, objectType) => {
        e.preventDefault();
        { objectType === vehicleConstants.searchDialogFor_Makers && this.props.getMakes() }
        { objectType === vehicleConstants.searchDialogFor_Models && this.props.getModels() }
        this.setState({
            searchModel: !this.state.searchModel,
            searchObject: objectType
        });
    }

    updateTheSelectedObject = (obj) => {
        { this.state.searchObject === vehicleConstants.searchDialogFor_Makers && this.setState({ make: obj }) }
        { this.state.searchObject === vehicleConstants.searchDialogFor_Models && this.setState({ model: obj }) }
    }

    render() {
        const vehicleObj = this.state.vehicleToDisplay;
        const buttonText = vehicleObj ? "Update" : "Add";
        const searchList = this.returnListToSearch();
        return (
            <div className="container-fluid">
                <Form onSubmit={e => this.handleSubmit(e)}>
            <div className="row col-md-12 detail-form">
                <Modal
                    show={this.state.searchModel}
                    onClose={this.toggleModal}
                    objectType={this.state.searchObject}
                    objectList={searchList} />

                    
                        <div class="col-md-10">
                                                                                                   
                            <div className="row form-group">
                                <div className="col-md-4">
                                    <Label>Plate Number</Label><br />
                                    <input type="text" name="plateNumber"
                                    placeholder={vehicleObj === undefined ? "" : vehicleObj.plateNumber}
                                    value={this.state.plateNumber}
                                    onChange={this.onChange}
                                    className="form-control"
                                    readOnly />
                                </div>
                        </div><br /><br />

                            <div className="row form-group">
                                <div className="col-md-4">
                                    <Label>Year</Label><br />
                                    <input type="date" name="modelYear"
                                        placeholder={vehicleObj === undefined ? "" : vehicleObj.modelYear}
                                        value={this.state.modelYear}
                                        onChange={this.onChange}
                                        className="form-control" />
                                </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Make</Label><br />
                                <div class="btn-grp dropright">
                                    <button type="button" class="btn btn-block btn-light dropdown-toggle" aria-haspopup="true" aria-expanded="false" onClick={e => this.toggleModal(e, vehicleConstants.searchDialogFor_Makers)}>
                                        {vehicleObj ? this.state.model.name : "Select a Manufacturer"}
                                    </button>
                                </div>
                                {/*<select defaultValue={vehicleObj ? vehicleObj.model.id : "Select a model"} className="custom-select my-1 mr-sm-2" name="modelId" onChange={this.onChange}>
                                    {this.props.ModelList.map(model => (<option className="dropdown-item" value={model.id}>{model.name}</option>))}
                                </select>*/}
                            </div>
                        </div>

                        <div className="row form-group">
                                {/*VehicleObj.model.id*/}
                            <div className="col-md-4">
                                <Label>Model</Label><br />
                                <div class="btn-grp dropright">
                                    <button type="button" class="btn btn-block btn-light dropdown-toggle" aria-haspopup="true" aria-expanded="false" onClick={e => this.toggleModal(e, vehicleConstants.searchDialogFor_Models)}>
                                        {vehicleObj ? this.state.model.name : "Select a Model"}
                                    </button>
                                </div>
                                {/*<select defaultValue={vehicleObj ? vehicleObj.model.id : "Select a model"} className="custom-select my-1 mr-sm-2" name="modelId" onChange={this.onChange}>
                                        {this.props.ModelList.map(model => (<option className="dropdown-item" value={model.id}>{model.name}</option>))}
                                    </select>*/}
                            </div>
                        </div>

                        <div className="row form-group">
                            {/*VehicleObj.model.id*/}
                            <div className="col-md-4">
                                <Label>Institution</Label><br />
                                <select defaultValue={vehicleObj ? vehicleObj.institution.institutionId : "Select a model"} className="custom-select my-1 mr-sm-2" name="InstitutionId" onChange={this.onChange}>
                                    {this.props.InstitutionList.map(institution => (<option className="dropdown-item" value={institution.institutionId}>{institution.name}</option>))}
                                </select>
                                
                            </div>
                        </div>

                            {/*<div className="row">
                                <div className="col-md-6">
                                    <label>Device Id</label><br />
                                    <input type="text" name="deviceId"
                                        placeholder={vehicleObj === undefined ? "" : vehicleObj.deviceId}
                                        value={vehicleObj.deviceId}
                                        onChange={this.onChange}
                                        className="textFieldStyle" />
                                </div>
                            </div>

                            
                            <br /><br />

                            <div className="align-self-end ml-auto" style={{ textAlign: "end" }}><button type="submit" className="btn btn-primary"> {buttonText} </button></div>
                        */}
                        </div>
                    
            </div>
            <div className="container-fluid">
                <div className="footerStyle">
                    <button type="submit" style={{ float: 'left' }}> Create </button>
                </div>
            </div>
            </Form>
            </div >
        )
    }
}

const mapStateToProps = (state) => {

    return {
        InstitutionList: state.InstitutionStore.Institutions,
        MakersList: state.VehicleStore.Makes,
        ModelsList: state.VehicleStore.Models
    }

}

const actionCreators = {
    getInstitutions: InstitutionAction.getInstitutions,
    getMakes: VehicleAction.getMakes,
    getModels: VehicleAction.getNewModels,
    saveVehicle: VehicleAction.saveVehicle
};

const connectVehicleDetail = connect(mapStateToProps, actionCreators)(VehicleDetail);
export { connectVehicleDetail as VehicleDetail };