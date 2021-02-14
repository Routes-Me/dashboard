﻿import React, { Component } from 'react';
import { userConstants } from '../../constants/userConstants';
import { VehicleDetail } from '../Vehicles/VehicleDetail';
import { UsersDetail } from '../Users/UsersDetail';
import { InstitutionsDetail } from '../Institutions/InstitutionsDetail';
import { AdvertisementsDetail } from '../Advertisements/AdvertisementsDetail';
import { CampaignsDetail } from '../Campaigns/CampaignsDetail';
import { PolicyDetails } from '../EMM/PolicyDetails';


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
                {this.props.objectType === userConstants.NavItem_Vehicles && <VehicleDetail vehicleToDisplay={this.props.object} onClose={this.props.onClose}/>}
                {this.props.objectType === userConstants.NavItem_Users && <UsersDetail userToDisplay={this.props.object} onClose={this.props.onClose}/>}
                {this.props.objectType === userConstants.NavItem_Institutions && <InstitutionsDetail institutionToDisplay={this.props.object} onClose={this.props.onClose}/>}
                {this.props.objectType === userConstants.NavItem_Advertisements && <AdvertisementsDetail advertisementToDisplay={this.props.object} onClose={this.props.onClose}/>}
                {this.props.objectType === userConstants.NavItem_Campaigns && <CampaignsDetail campaignToDisplay={this.props.object} onClose={this.props.onClose}/>}
                {this.props.objectType === userConstants.NavItem_EMM && <PolicyDetails/>}
            </div>
        )
    }
}