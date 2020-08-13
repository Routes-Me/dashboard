import React, { Component } from 'react';
import { userConstants } from '../../constants/userConstants';
import { VehicleDetail } from '../Vehicles/VehicleDetail';
import { UsersDetail } from '../Users/UsersDetail';
import { InstitutionsDetail } from '../Institutions/InstitutionsDetail';


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
                {this.props.objectType === userConstants.NavItem_Users && <UsersDetail userToDisplay={this.props.object} />}
                {this.props.objectType === userConstants.NavItem_Institutions && <InstitutionsDetail institutionToDisplay={this.props.object} />}
            </div>
        )
    }
}