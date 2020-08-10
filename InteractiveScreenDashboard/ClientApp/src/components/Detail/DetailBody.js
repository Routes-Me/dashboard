import React, { Component } from 'react';
import { userConstants } from '../../constants/userConstants';
import { VehicleDetail } from '../Vehicles/VehicleDetail';

export default class DetailBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            objectType: "",
            object:""
        }
    }

    render() {
        return(
            <div className="container-fluid">
                {this.props.objectType === userConstants.NavItem_Vehicles && <VehicleDetail vehicleToDisplay={this.props.object} />}
        </div>
        )
    }
}