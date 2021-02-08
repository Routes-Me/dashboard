import React, { Component } from 'react';
import Detail from '../Detail/Detail';
import { connect } from 'react-redux';
import { userConstants } from '../../constants/userConstants';
import * as VehicleAction from '../../Redux/Action';
import { vehicleConstants } from '../../constants/vehicleConstants';
import PageHandler from '../PageHandler';
import { config } from '../../constants/config';
import { isSuperUser, isReadOnlyMode } from '../../util/basic';
import '../Detail/Detail.css';

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
        this.props.getVehiclesForInstitution(1,config.Pagelimit,this.props.user,this.props.token);
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


    //Delete Vehicle
    deleteVehicle = (e, vehicleId) => {
        e.preventDefault();
        this.props.deleteVehicle(vehicleId)
    }


    showDevicesForSelectedVehicle = (e, vehicleId) =>{
        e.preventDefault();
        this.props.getDevicesForVehicleId(vehicleId);
    }

    static getDerivedStateFromProps (props, state){
        if(state.showDetails){
            if(props.ApplicationState === vehicleConstants.addVehicle_SUCCESS)
            {
                props.getVehiclesForInstitution(1, config.Pagelimit)
                return {showDetails : false};
            }
        }
        return null;
    }

    // showUpdatedList = () =>{
    //     this.props.getVehiclesForInstitution();
    //     this.setState({showDetails : false});
    // }


    //Load Vehicles in a table
    renderAllVehicleTable(Vehicles) {
        return (
            <div>
            <PageHandler page = {Vehicles.page} getList={this.props.getVehiclesForInstitution} institutionId={this.props.user.InstitutionId} style='header'/>
            <div className="table-list padding-lr-80">
                    <table>
                        <thead>
                            <tr style={{height:'51px'}}>
                                <th>ID</th>
                                <th>PLATE</th>
                                <th>MODEL</th>
                                <th>YEAR</th>
                                <th>OFFICE</th>
                                <th className="width44" />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Vehicles.data?.map(Vehicle => (
                                    <tr  key={Vehicle.id} onClick={e => this.showDevicesForSelectedVehicle(e, Vehicle.id)}>
                                        <td>{Vehicle.id}</td>
                                        <td>{Vehicle.plateNumber}</td>
                                        <td>{Vehicle.model?.Name}</td>
                                        <td>{Vehicle.modelYear}</td>
                                        <td>{Vehicle.institution?.Name}</td>
                                        {!isReadOnlyMode(this.props.user) &&
                                        <td className="width44" onClick={e => this.openSubMenuForVehicleId(e, Vehicle.id)}>
                                            <div className="edit-popup">
                                                <div className="edit-delet-butt" onClick={e => this.openSubMenuForVehicleId(e, Vehicle.id)}>
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                                <ul className="edit-delet-link" style={{ display: this.state.optionsIndex === Vehicle.id ? 'inline-block' : 'none' }}>
                                                    <li><a onClick={e => this.showDetailScreen(e, Vehicle)}>Edit</a></li>
                                                    <li><a onClick={e => this.deleteVehicle(e, Vehicle.id)}>Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>}
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

        let content = this.renderAllVehicleTable(this.props.VehicleList);
        {this.props.ApplicationState === vehicleConstants.addVehicle_SUCCESS && this.props.getVehiclesForInstitution(1)}
        return (
            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>
                {this.state.showDetails ?
                    <Detail className={this.props.show ? 'slide-in' : 'slide-out'}
                        show={this.showDetailScreen}
                        objectType={userConstants.NavItem_Vehicles}
                        object={this.state.vehicle} /> :
                    <div>
                        <div className="top-part-vehicles-search padding-lr-80">
                            <div className="header-add-butt">
                                <h3>Vehicles</h3>
                                {!isReadOnlyMode(this.props.user) &&
                                <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Vehicle</a>}
                            </div>

                            <div className="search-part">
                                    <input type="text" name="search" placeholder="Search" className="search" />
                                    <i className="fa fa-search" aria-hidden="true" />
                                    <span className="cross-icon"><img src="../cross-image.png" /></span>
                            </div>
                        </div>
                        {content}
                    </div>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {

    return {
        VehicleList: state.VehicleStore.Vehicles,
        user: state.Login.user,
        token : state.Login.token,
        ApplicationState: state.VehicleStore.ActionState
    }

}

const actionCreators = {
    getVehiclesForInstitution: VehicleAction.getVehiclesForInstitutionID,
    deleteVehicle: VehicleAction.deleteVehicle,
    getDevicesForVehicleId: VehicleAction.getDevicesForVehicleId
};

const connectedVehicles = connect(mapStateToProps, actionCreators)(Vehicles);
export { connectedVehicles as default };