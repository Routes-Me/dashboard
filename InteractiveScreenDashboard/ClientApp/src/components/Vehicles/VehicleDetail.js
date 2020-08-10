import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as VehicleAction from '../../Redux/Action';
import Form from 'react-validation/build/form';

class VehicleDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            deviceId:"",
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
        if (props.vehicleToDisplay !== undefined) {
            if (props.vehicleToDisplay !== state.vehicleToDisplay) {
                return {
                    vehicleToDisplay: props.vehicleToDisplay
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
    }

    render() {
        const vehicleObj = this.state.vehicleToDisplay;
        const buttonText = vehicleObj ? "Update" : "Save";

        return (
            <div className="col-md-12">
                <div class="row">
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <div class="col-md-10 mx-auto">

                            <div class="form-group row" >
                                {/*VehicleObj.model.id*/}
                                <div className="col-md-6">
                                    <Label>Model</Label><br />
                                    <select defaultValue={VehicleObj ? VehicleObj.model.id : "Select a model"} className="textFieldStyle" name="modelId" onChange={this.onChange}>
                                        {this.props.ModelList.map(model => (<option value={model.id}>{model.name}</option>))}
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <Label>Year</Label><br />
                                    <input type="text" name="modelYear"
                                        placeholder={VehicleObj === undefined ? "" : VehicleObj.modelYear}
                                        defaultValue={VehicleObj.modelYear}
                                        onChange={this.onChange}
                                        className="textFieldStyle" />
                                </div>

                            </div>

                            <div class="form-group row">

                                <div className="col-md-6">
                                    <label>Device Id</label><br />
                                    <input type="text" name="deviceId"
                                        placeholder={VehicleObj === undefined ? "" : VehicleObj.deviceId}
                                        value={VehicleObj.deviceId}
                                        onChange={this.onChange}
                                        className="textFieldStyle" />
                                </div>

                                <div className="col-md-6">
                                    <Label>Plate Number</Label><br />
                                    <input type="text" name="plateNumber"
                                        placeholder={VehicleObj === undefined ? "" : VehicleObj.plateNumber}
                                        value={VehicleObj.plateNumber}
                                        onChange={this.onChange}
                                        className="textFieldStyle" />
                                </div>

                            </div><br /><br />

                            <div className="col-md-12" style={{ textAlign: "center" }}><button type="submit" className="buttonStyle"> {buttonText} </button></div>

                        </div>
                    </Form>
                </div>
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