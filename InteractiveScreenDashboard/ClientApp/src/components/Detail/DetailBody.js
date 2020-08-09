import React, { Component } from 'react';
import { userConstants } from '../../constants/userConstants';

class DetailBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            objectType: "",
            object:""
        }
    }

    render() {
        <div className="col-md-12">
            {this.props.objectType === userConstants.NavItem_Vehicles && <VehicleDetail vehicleToDisplay={this.props.object} />}
        </div>
    }
}