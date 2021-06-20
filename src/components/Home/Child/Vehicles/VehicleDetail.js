import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import Form from 'react-validation/build/form';
import PageHandler from '../PageHandler';
import * as VehicleAction from '../../../../Redux/Action';
import * as InstitutionAction from '../../../../Redux/Action';
import Modal from '../Dialog/Modal';
import { vehicleConstants } from "../../../../constants/vehicleConstants";
import {config} from "../../../../constants/config";
import { returnObjectForSelectedId } from '../../../../util/basic';

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
        this.props.getInstitutions(1, config.DropDownLimit);
    }


    onChange = (event) => {
        if(event.target.name === 'institutionId')
        {
            this.setState({institution : returnObjectForSelectedId(this.props.InstitutionList.data, event.target.value), [event.target.name]: event.target.value})
        }
        this.setState({ [event.target.name]: event.target.value })
    }

    static getDerivedStateFromProps(props, state) {

        if (props.vehicleToDisplay !== undefined) {
            if (props.vehicleToDisplay !== state.vehicleToDisplay) {
                return {
                    vehicleToDisplay: props.vehicleToDisplay,
                    vehicleId: props.vehicleToDisplay.id,
                    institutionId: props.vehicleToDisplay.institution?.InstitutionId,
                    institution: props.vehicleToDisplay.institution,
                    modelYear: props.vehicleToDisplay.modelYear,
                    model: props.vehicleToDisplay.model,
                    make: props.vehicleToDisplay.manufacturer,
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

        this.state.vehicleId? action = "save": action="add"

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
        objectType === vehicleConstants.searchDialogFor_Makers && this.props.getMakes() 
        objectType === vehicleConstants.searchDialogFor_Models && this.props.getModels(this.state.make.manufacturerId) 
        this.setState({
            searchModel: !this.state.searchModel,
            searchObject: objectType
        });
    }

    updateTheSelectedObject = (obj) => {
        this.state.searchObject === vehicleConstants.searchDialogFor_Makers && this.setState({ make: obj })
        this.state.searchObject === vehicleConstants.searchDialogFor_Models && this.setState({ model: obj })
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

                <Modal
                    show={this.state.searchModel}
                    onClose={this.toggleModal}
                    objectType={this.state.searchObject}
                    objectList={searchList} 
                    onSelect={this.updateSelectedId} />

                        <div className="col-md-12" style={{padding:'0px'}}>

                            <div className="row form-group">
                                <div className="col-md-6">
                                    <Label>Plate Number</Label><br />
                                    <input type="text" name="plateNumber"
                                    value={this.state.plateNumber}
                                    onChange={this.onChange}
                                    className="form-control"/>
                                </div>
                            </div><br />

                            <div className="row form-group">
                                <div className="col-md-6">
                                    <Label>Year</Label><br />
                                        <input type="date" min="2000" max="2020" step="1" name="modelYear"
                                            value={this.state.modelYear}
                                            onChange={this.onChange}
                                            className="form-control" />
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6">
                                    <Label>Make</Label><br />
                                    <div className="btn-grp">
                                        <button type="button" className="btn btn-block btn-light text-left" onClick={e => this.toggleModal(e, vehicleConstants.searchDialogFor_Makers)}>
                                            {this.state.make ? this.state.make.name : "Select a Manufacturer"}<span className="glyphicon glyphicon-play"/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6">
                                    <Label>Model</Label><br />
                                    <div className="btn-grp">
                                        <button type="button" className="btn btn-block btn-light text-left" onClick={e => this.toggleModal(e, vehicleConstants.searchDialogFor_Models)}>
                                            {this.state.model ? this.state.model.name : "Select a Model"}<span className="glyphicon glyphicon-play"/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6">
                                    <Label>Institution</Label><br />
                                    <input type="text" name="institution"
                                    value={this.state.institution ? this.state.institution.name : 'Please select a institution'}
                                    onChange={this.onChange}
                                    className="form-control" />
                                    <select value={this.state.institutionId} className="custom-select" size='6' name="institutionId" onChange={this.onChange}>
                                    <option key={0} className="dropdown-item" value={0}>Select an Institution</option>
                                    {this.props.InstitutionList.data?.map(institution => (<option key={institution.institutionId} className="dropdown-item" value={institution.institutionId}>{institution.name}</option>))}
                                    </select>
                                    <PageHandler page = {this.props.InstitutionList.page} getList={this.props.getInstitutions} institutionId={this.props.user.institution.InstitutionId}/>
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
        InstitutionList: state.InstitutionStore?.Institutions,
        MakersList: state.VehicleStore.Makes,
        ModelsList: state.VehicleStore.Models,
        DialogId : state.VehicleStore.selectedId,
        savedSuccessfully : state.VehicleStore.Loading,
        user: state.Login.user
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