import React, { Component } from 'react';
import Detail from '../Detail/Detail';
import { connect } from 'react-redux';
import { userConstants } from '../../constants/userConstants';
import * as VehicleAction from '../../Redux/Action';
import '../Detail/Detail.css';
import { vehicleConstants } from '../../constants/vehicleConstants';

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
        console.log("vehicle list component did mount!")
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


    //Delete Vehicle
    deleteVehicle = (e, vehicleId) => {
        e.preventDefault();
        this.props.deleteVehicle(vehicleId)
    }

    static getDerivedStateFromProps (props, state){
        if(state.showDetails){
            if(props.ApplicationState === vehicleConstants.addVehicle_SUCCESS)
            {
                return {showDetails : false};
            }
        }
        return null;
    }

    showUpdatedList = () =>{
        this.props.getVehiclesForInstitution();
        this.setState({showDetails : false});
    }


    //Load Vehicles in a table
    renderAllVehicleTable(Vehicles) {
        return (
            <div className="table-list-vehicles">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Plate</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Office</th>
                                <th className="width44" />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Vehicles.map(Vehicle => (
                                    <tr  key={Vehicle.id} style={{textAlign:'center'}}>
                                        <td>{Vehicle.id}</td>
                                        <td>{Vehicle.plateNumber}</td>
                                        <td>{Vehicle.model?.Name}</td>
                                        <td>{Vehicle.modelYear}</td>
                                        <td>{Vehicle.institution?.Name}</td>
                                        <td className="width44" >
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

        let content = this.renderAllVehicleTable(this.props.VehicleList);
        {this.props.ApplicationState === vehicleConstants.addVehicle_SUCCESS && this.props.getVehiclesForInstitution()}
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
                    </div>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {

    return {
        VehicleList: state.VehicleStore.Vehicles,
        ApplicationState: state.VehicleStore.ActionState
    }

}

const actionCreators = {
    getVehiclesForInstitution: VehicleAction.getVehiclesForInstitutionID,
    deleteVehicle: VehicleAction.deleteVehicle
};

const connectedVehicles = connect(mapStateToProps, actionCreators)(Vehicles);
export { connectedVehicles as Vehicles };