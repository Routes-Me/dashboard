import React, { Component } from 'react';
import { connect } from 'react-redux';

class DialogVehicles extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            create: true,
            modelId: "",
            modelYear: "",
            deviceId: "",
            plateNumber: "",
            ModelList: [],
            selectedModel: "",
            validationError: "",
            loading: false
        }

    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {

        event.preventDefault();

        //const isValid = this.validateAll();
        //if (isValid) {
        this.setState({
            loading: true,
        });
        //}

    }


    render() {

        const VehicleObj = this.props.objectToDisplay;
        const create = VehicleObj ? "Update" : "Save";

        return (
            <div className="col-md-12">
            <div className="hehading-add-butt" style={{ textAlign: "center" }}>
                {VehicleObj === undefined ? <h3>Add New Device </h3> : <h3>Vehicle Id {VehicleObj.id}</h3>}
            </div>
            <div class="row">
                {/*<Form onSubmit={this.handleSubmit}>*/}
                <div class="col-md-10 mx-auto">
                    <div class="form-group row" >

                        <div className="col-md-6">
                            <Label>Model</Label><br />
                            <select value={VehicleObj === undefined ? "Select a model" : VehicleObj.model.id} className="textFieldStyle" name="modelId" onChange={this.onChange}>
                            {this.props.ModelList.map(model => (<option value={model.id}>{model.name}</option>))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <Label>Year</Label><br />
                            <input type="text" name="modelYear"
                                placeholder={VehicleObj === undefined ? "" : VehicleObj.modelYear}
                                value={this.state.modelYear}
                                onChange={this.onChange}
                                className="textFieldStyle" />
                        </div>

                    </div>
                    <div class="form-group row">

                        <div className="col-md-6">
                            <label>Device Id</label><br />
                            <input type="text" name="DeviceId"
                                placeholder={VehicleObj === undefined ? "" : VehicleObj.deviceId}
                                value={this.state.deviceId}
                                onChange={this.onChange}
                                className="textFieldStyle" />
                        </div>

                        <div className="col-md-6">
                            <Label>Plate Number</Label><br />
                            <input type="text" name="PlateNumber"
                                placeholder={VehicleObj === undefined ? "" : VehicleObj.plateNumber}
                                value={this.state.plateNumber}
                                onChange={this.onChange}
                                className="textFieldStyle" />
                        </div>

                    </div><br /><br />
                    <div className="col-md-12" style={{ textAlign: "center" }}><button type="submit" className="buttonStyle"> {create} </button></div>
                </div>
                {/*</Form>*/}
                </div>
            </div>
            )

    }


}

const mapStateToProps = (state) => {

    const modelList = state.VehicleStore.Models;
    console.log('Mapped State Vehicle Array returned :', modelList);

    return {
        ModelList: modelList
    }

}

const actionCreators = {
    getVehicleModels: VehicleAction.getModels
};

const connectDialogVehicles = connect(mapStateToProps, actionCreators)(DialogVehicles);
export { connectDialogVehicles as DialogVehicles };