import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import '../Style/CustomStyle.css'
import { Label } from 'reactstrap';

class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            create: true,
            modelId: "",
            modelYear: "",
            deviceId: "",
            plateNumber: "",
            InstitutionId: "",
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

        
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fefefe',
            borderRadius: 5,
            maxWidth: 300,
            minHeight: 300,
            margin: '0 auto',
            padding: 20
        };
        
        const VehicleObj = this.props.objectToDisplay;
        const create = VehicleObj ? "Update" : "Save";
        return (
            <div className="modalNew">
                <div class="modal-content" style={{ modalStyle }}>
                    <span class="close" onClick={this.props.onClose}>&times;</span>
                    <div className="hehading-add-butt" style={{ textAlign: "center" }}>
                        {VehicleObj === undefined ? <h3>Add New Device </h3> : <h3>Vehicle Id {VehicleObj.id}</h3>}
                    </div>
                    <div class="row">

                        {/*<Form onSubmit={this.handleSubmit}>*/}
                        <div class="col-md-10 mx-auto">
                            <div class="form-group row" >

                                <div className="col-md-6">
                                     <Label>Model</Label><br/>
                                    {/*<input type="text" name="modelId"
                                            placeholder={VehicleObj === undefined ? "" : VehicleObj.model.name}
                                            value={this.state.modelId}
                                            onChange={this.onChange}
                                            className="textFieldStyle" />*/}
                                    <select value={VehicleObj === undefined ? "Select a model" : VehicleObj.model.id} className="textFieldStyle" name="modelId" onChange={this.onChange}>
                                        {this.props.modelList.map(model => (<option value={model.id}>{model.name}</option>))}
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <Label>Year</Label><br/>
                                        <input type="text" name="modelYear"
                                            placeholder={VehicleObj === undefined ? "" : VehicleObj.modelYear}
                                            value={this.state.modelYear}
                                            onChange={this.onChange}
                                            className="textFieldStyle" />
                                </div>

                            </div>
                            <div class="form-group row">

                                <div className="col-md-6">
                                    <label>Device Id</label><br/>
                                        <input type="text" name="DeviceId"
                                            placeholder={VehicleObj === undefined ? "" : VehicleObj.deviceId}
                                            value={this.state.deviceId}
                                            onChange={this.onChange}
                                            className="textFieldStyle" />
                                </div>

                                <div className="col-md-6">
                                    <Label>Plate Number</Label><br/>
                                    <input type="text" name="PlateNumber"
                                        placeholder={VehicleObj === undefined ? "" : VehicleObj.plateNumber}
                                        value={this.state.plateNumber}
                                        onChange={this.onChange}
                                        className="textFieldStyle" />
                                </div>

                            </div><br /><br />

                            {/*<h4>{VehicleObj === undefined ? `Institution Details` : `Institution Id: ${VehicleObj.institution.institutionId}`}</h4><br />

                            <div class="form-group row">

                                 <div className="col-md-6">
                                        <Label>Institution Name</Label><br />
                                    <input type="text" name="InstitutionId" value={VehicleObj === undefined ? "" : VehicleObj.institution.name} className="textFieldStyle" />
                                </div>

                                 <div className="col-md-6">
                                        <Label>Ceated At</Label><br />
                                    <input type="text" name="search" value={VehicleObj === undefined ? "" : VehicleObj.institution.createdAt} className="textFieldStyle" />
                                </div>

                            </div>

                            <div class="form-group row">

                                <div className="col-md-6">
                                        <Label>Phone Number</Label><br />
                                    <input type="text" name="search" value={VehicleObj === undefined ? "" : VehicleObj.institution.phoneNumber} className="textFieldStyle" />
                                </div>

                                <div className="col-md-6">
                                        <Label>Country ISO</Label><br />
                                    <input type="text" name="search" value={VehicleObj === undefined ? "" : VehicleObj.institution.countryIso} className="textFieldStyle" />
                                </div>

                            </div>*/}
                            <div className="col-md-12" style={{ textAlign: "center" }}><button type="submit" className="buttonStyle"> {create} </button></div>
                        </div>
                        {/*</Form>*/}

                    </div>

                </div>
            </div>
        );
    }
}



export default Modal;