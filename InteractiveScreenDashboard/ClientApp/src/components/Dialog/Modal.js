﻿import React from 'react';
import { DialogVehicles } from '../Vehicles/DialogVehicles';
import '../Style/CustomStyle.css';
import { userConstants } from '../../constants/userConstants';
import { Label } from 'reactstrap';

class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            vehicleToDisplay:"",
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

        return (
            <div className="modalNew">
                <div class="modal-content" style={{ modalStyle }}>
                    {/*<span class="close" onClick={this.props.onClose}>&times;</span>
                    <div className="hehading-add-butt" style={{ textAlign: "center" }}>
                        {VehicleObj === undefined ? <h3>Add New Vehicle </h3> : <h3>Vehicle Id {VehicleObj.id}</h3>}
                    </div><br /><br />*/}
                    <div class="modal-header">
                        {VehicleObj === undefined ? <h3>Add New Vehicle </h3> : <h3>Vehicle Id {VehicleObj.id}</h3>}
                        <span class="close" style={{ float: "right" }} onClick={this.props.onClose}>&times;</span>
                    </div><br /><br />

                    {this.props.objectType === userConstants.NavItem_Vehicles && <DialogVehicles vehicleToDisplay={VehicleObj}/>}


                </div>
            </div>
        );
    }
}



export default Modal;