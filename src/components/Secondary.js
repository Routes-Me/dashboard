import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SecondaryTracking } from '../components/Tracking/SecondaryTracking';
import { SecondaryVehicles } from '../components/Vehicles/SecondaryVehicles';
import { InstitutionsSecondary } from '../components/Home/Institutions/InstitutionsSecondary';
import { UsersSecondary } from '../components/Users/UsersSecondary';
import { AdvertisementsSecondary } from '../components/Advertisements/AdvertisementsSecondary';
import { AccessControlSecondary } from "../components/AccessControl/AccessControlSecondary";
import { CampaignsSecondary } from './Campaigns/CampaignsSecondary';
import { userConstants } from '../constants/userConstants';

class Secondary extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                {this.props.selectedNavItem === userConstants.NavItem_Tracking && <SecondaryTracking />}
                {this.props.selectedNavItem === userConstants.NavItem_Vehicles && <SecondaryVehicles />}
                {this.props.selectedNavItem === userConstants.NavItem_Institutions && <InstitutionsSecondary />}
                {this.props.selectedNavItem === userConstants.NavItem_Advertisements && <AdvertisementsSecondary/>}
                {this.props.selectedNavItem === userConstants.NavItem_Users && <UsersSecondary />}
                {this.props.selectedNavItem === userConstants.NavItem_AccessControl && <AccessControlSecondary/>}
                {this.props.selectedNavItem === userConstants.NavItem_Campaigns && <CampaignsSecondary/>}
                {this.props.selectedNavItem === userConstants.NavItem_Analytics && <CampaignsSecondary/>}
                {this.props.selectedNavItem === userConstants.NavItem_Prizes && <CampaignsSecondary/>}
            </div>
            );
    }
}



const mapStateToProps = (state) => {
    return {
        selectedNavItem: state.Login.SelectedNavOption
    }
}
const connectTracking = connect(mapStateToProps, null)(Secondary);
export { connectTracking as Secondary };