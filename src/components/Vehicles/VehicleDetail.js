import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as VehicleAction from '../../Redux/Action';
import * as InstitutionAction from '../../Redux/Action';
import Form from 'react-validation/build/form';
import Modal from '../Dialog/Modal';
import { vehicleConstants } from "../../constants/vehicleConstants";
import {config} from "../../constants/config";

class VehicleDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            deviceId: "",
            vehicleId: "",
            institutionId: "",
            make:"",
            model: "",
            modelYear: "",
            plateNumber: "",
            vehicleToDisplay: "",
            searchModel: false,
            searchObject: ""
        }
    }

    componentDidMount() { 
        console.log("vehicle detail component did mount!")
        this.props.getInstitutions();
    }


    onChange = event => this.setState({ [event.target.name] : event.target.value })

    static getDerivedStateFromProps(props, state) {

        if (props.vehicleToDisplay !== undefined) {
            if (props.vehicleToDisplay !== state.vehicleToDisplay) {
                return {
                    vehicleToDisplay: props.vehicleToDisplay,
                    vehicleId: props.vehicleToDisplay.id,
                    institutionId: props.vehicleToDisplay.institution?.InstitutionId,
                    modelYear: props.vehicleToDisplay.modelYear,
                    model: props.vehicleToDisplay.model,
                    make: props.vehicleToDisplay.make,
                    deviceId: props.vehicleToDisplay.deviceId,
                    plateNumber: props.vehicleToDisplay.plateNumber
                }
            }
        }
    }


    handleSubmit = (event) => {

        event.preventDefault();
        let vehicle =""
        let action ="";

        {this.state.vehicleId? action = "save": action="add"}

        if(action==="add"){
            vehicle = {
                DeviceId: this.state.deviceId,
                PlateNumber: this.state.plateNumber,
                InstitutionId: this.state.institutionId,
                modelYear: this.state.modelYear,
                modelId: this.state.model.modelId
            }
        }
        else{
            vehicle = {
                VehicleId: this.state.vehicleId,
                DeviceId: this.state.deviceId,
                PlateNumber: this.state.plateNumber,
                InstitutionId: this.state.institutionId,
                modelYear: this.state.modelYear,
                modelId: this.state.model.modelId
            }
        }
        

        this.props.saveVehicle(vehicle,action);
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

    updateSelectedId = obj => this.state.searchObject === vehicleConstants.searchDialogFor_Makers? this.setState({ make:obj, searchModel: !this.state.searchModel}) : this.setState({ model:obj, searchModel: !this.state.searchModel})
    

    //show model dialog 
    toggleModal = (e, objectType) => {
        e.preventDefault();
        { objectType === vehicleConstants.searchDialogFor_Makers && this.props.getMakes() }
        { objectType === vehicleConstants.searchDialogFor_Models && this.props.getModels(this.state.make.manufacturerId) }
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

        // Render nothing if the "show" prop is false
        // if (this.props.savedSuccessfully && !this.props.show) {
        //     return null;
        // }

        const vehicleObj = this.state.vehicleToDisplay;
        const buttonText = vehicleObj ? "Update" : "Add";
        const searchList = this.returnListToSearch();
        console.log('list =>',searchList);
        return (
            <div>
            <Form onSubmit={e => this.handleSubmit(e)}>
            <div className="row col-md-12 detail-form" style={{padding:"0px"}}>

                <Modal
                    show={this.state.searchModel}
                    onClose={this.toggleModal}
                    objectType={this.state.searchObject}
                    objectList={searchList} 
                    onSelect={this.updateSelectedId} />

                        <div class="col-md-12">             
                            <div className="row form-group">
                                <div className="col-md-4">
                                    <Label>Plate Number</Label><br />
                                    <input type="text" name="plateNumber"
                                    value={this.state.plateNumber}
                                    onChange={this.onChange}
                                    className="form-control"
                                    readOnly />
                                </div>
                        </div><br /><br />

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Year</Label><br />
                                    <input type="number" min="2000" max="2020" step="1" name="modelYear"
                                        value={this.state.modelYear}
                                        onChange={this.onChange}
                                        className="form-control" />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Make</Label><br />
                                <div class="btn-grp">
                                    <button type="button" class="btn btn-block btn-light" onClick={e => this.toggleModal(e, vehicleConstants.searchDialogFor_Makers)}>
                                        {this.state.make ? this.state.make.name : "Select a Manufacturer"}<span className="glyphicon glyphicon-play"/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Model</Label><br />
                                <div class="btn-grp">
                                    <button type="button" class="btn btn-block btn-light" onClick={e => this.toggleModal(e, vehicleConstants.searchDialogFor_Models)}>
                                        {this.state.model ? this.state.model.name : "Select a Model"}<span className="glyphicon glyphicon-play"/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Institution</Label><br />
                                <select defaultValue={this.state.institutionId? this.state.institutionId : "Select a model"} className="custom-select my-1 mr-sm-2" name="institutionId" onChange={this.onChange}>
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
                            </div>*/}

                        </div>

            </div>
            <div className="container-fluid">
                <div className="footerStyle">
                    <button type="submit" style={{ float: 'left' }}> {buttonText} </button>
                </div>
            </div>
            </Form>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        InstitutionList: [config.selectInstitution, ...state.InstitutionStore.Institutions],
        MakersList: state.VehicleStore.Makes,
        ModelsList: state.VehicleStore.Models,
        DialogId : state.VehicleStore.selectedId,
        savedSuccessfully : state.VehicleStore.Loading
    }

}

const actionCreators = {
    getInstitutions: InstitutionAction.getInstitutions,
    getMakes: VehicleAction.getManufacturers,
    getModels: VehicleAction.getModels,
    saveVehicle: VehicleAction.saveVehicle
};

const connectVehicleDetail = connect(mapStateToProps, actionCreators)(VehicleDetail);
export { connectVehicleDetail as VehicleDetail };