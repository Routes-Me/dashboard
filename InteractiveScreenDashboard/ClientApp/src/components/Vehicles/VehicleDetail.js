import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as VehicleAction from '../../Redux/Action';
import Form from 'react-validation/build/form';

class VehicleDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            deviceId: "",
            vehicleId: "",
            InstitutionId:"",
            modelId: "",
            modelYear: "",
            plateNumber: "",
            modelList: [],
            selectedModel: "",
            vehicleToDisplay:""
        }
    }


    onChange = (event) => {
        this.setState({ [event.target.name] : event.target.value })
    }

    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps called with NewProps', props.vehicleToDisplay);
        if (props.vehicleToDisplay !== undefined) {
            if (props.vehicleToDisplay !== state.vehicleToDisplay) {
                return {
                    vehicleToDisplay: props.vehicleToDisplay,
                    vehicleId: props.vehicleToDisplay.id,
                    InstitutionId: props.vehicleToDisplay.institution.institutionId,
                    modelYear: props.vehicleToDisplay.modelYear,
                    modelId: props.vehicleToDisplay.model.modelId,
                    deviceId: props.vehicleToDisplay.deviceId,
                    plateNumber: props.vehicleToDisplay.plateNumber
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
            modelId: this.state.modelId
        }

        this.props.saveVehicle(vehicle);
    }

    render() {
        const vehicleObj = this.state.vehicleToDisplay;
        const buttonText = vehicleObj ? "Update" : "Add";

        return (
            <div className="row col-md-12 detail-form">
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <div class="col-md-10">

                            <div className="row form-group">
                                <div className="col-md-4">
                                    <Label>Plate Number</Label><br />
                                    <input type="text" name="plateNumber"
                                        placeholder={vehicleObj === undefined ? "" : vehicleObj.plateNumber}
                                        value={vehicleObj.plateNumber}
                                        onChange={this.onChange}
                                        className="form-control" />
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-4">
                                    <Label>Year</Label><br />
                                    <input type="text" name="modelYear"
                                        placeholder={vehicleObj === undefined ? "" : vehicleObj.modelYear}
                                        defaultValue={vehicleObj.modelYear}
                                        onChange={this.onChange}
                                        className="form-control" />
                                </div>
                            </div>

                            <div className="row form-group">
                                {/*VehicleObj.model.id*/}
                                <div className="col-md-4">
                                    <Label>Model</Label><br />
                                    <select defaultValue={vehicleObj ? vehicleObj.model.id : "Select a model"} className="form-control" name="modelId" onChange={this.onChange}>
                                        {this.props.ModelList.map(model => (<option className="dropdown-item" value={model.id}>{model.name}</option>))}
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
                            </div>*/}

                            
                            <br /><br />

                            <div className="align-self-end ml-auto" style={{ textAlign: "end" }}><button type="submit" className="btn btn-primary"> {buttonText} </button></div>

                        </div>
                    </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    const modelList = state.VehicleStore.Models;
    console.log('DialogVehicles: Mapped State Vehicle Array returned :', modelList);

    return {
        ModelList: modelList
    }

}

const actionCreators = {
    getVehicleModels: VehicleAction.getModels,
    saveVehicle: VehicleAction.saveVehicle
};

const connectVehicleDetail = connect(mapStateToProps, actionCreators)(VehicleDetail);
export { connectVehicleDetail as VehicleDetail };