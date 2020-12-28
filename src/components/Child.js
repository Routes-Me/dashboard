import React, { Component, Suspense, lazy } from 'react';
import { userConstants } from '../constants/userConstants';
import { connect } from 'react-redux';
// import { Tracking } from './Tracking/Tracking';
// import { Vehicles } from './Vehicles/Vehicles';
// import { Institutions } from './Institutions/Institutions';
// import { Users } from './Users/Users';
// import { Advertisements } from './Advertisements/Advertisements';
// import { AccessControl } from "./AccessControl/AccessControl";
// import { Campaigns } from './Campaigns/Campaigns';
// import Analytics from './Analytics/Analytics';
import Launch from './Launch';

const Tracking = lazy(() => import('./Tracking/Tracking'));
const Vehicles = lazy(() => import('./Vehicles/Vehicles'));
const Institutions = lazy(() => import('./Institutions/Institutions'));
const Users = lazy(() => import('./Users/Users'));
const Advertisements = lazy(() => import('./Advertisements/Advertisements'));
const AccessControl = lazy(() => import('./AccessControl/AccessControl'));
const Campaigns = lazy(() => import('./Campaigns/Campaigns'));
const Analytics = lazy(() => import('./Analytics/Analytics'));

class Child extends Component {
    render() {
        return (

            <div className="right-part">
                <Suspense fallback={<Launch/>}>
                {this.props.selectedNavItem === userConstants.NavItem_Vehicles && <Vehicles />}
                {this.props.selectedNavItem === userConstants.NavItem_Tracking && <Tracking />}
                {this.props.selectedNavItem === userConstants.NavItem_Institutions && <Institutions />}
                {this.props.selectedNavItem === userConstants.NavItem_Users && <Users />}
                {this.props.selectedNavItem === userConstants.NavItem_Advertisements && <Advertisements/>}
                {this.props.selectedNavItem === userConstants.NavItem_AccessControl && <AccessControl/>}
                {this.props.selectedNavItem === userConstants.NavItem_Campaigns && <Campaigns/>}
                {this.props.selectedNavItem === userConstants.NavItem_Analytics && <Analytics advertisementList ={this.props.AdvertisementList} />}
                </Suspense>
            </div>

            );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedNavItem: state.Login.SelectedNavOption,
        AdvertisementList: state.AdvertisementStore.Advertisements,
    }
};


const connectLogin = connect(mapStateToProps)(Child);
export { connectLogin as Child };