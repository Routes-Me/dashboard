import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SecondaryTracking } from '../Child/Tracking/SecondaryTracking';
import { SecondaryVehicles } from '../Child/Vehicles/SecondaryVehicles';
import { InstitutionsSecondary } from '../Child/Institutions/InstitutionsSecondary';
import { UsersSecondary } from '../Child/Users/UsersSecondary';
import { AdvertisementsSecondary } from '../Child/Advertisements/AdvertisementsSecondary';
import { AccessControlSecondary } from "../Child/AccessControl/AccessControlSecondary";
import { CampaignsSecondary } from '../Child/Campaigns/CampaignsSecondary';
import { userConstants } from '../../../constants/userConstants';

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