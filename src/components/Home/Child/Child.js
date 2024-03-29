import React, { Component, Suspense, lazy } from 'react';
import { userConstants } from '../../../constants/userConstants';
import { connect } from 'react-redux';
import Launch from '../../Launch';

const Tracking = lazy(() => import('./Tracking/Tracking'));
const Vehicles = lazy(() => import('./Vehicles/Vehicles'));
const Institutions = lazy(() => import('./Institutions/Institutions'));
const Users = lazy(() => import('./Users/Users'));
const Advertisements = lazy(() => import('./Advertisements/Advertisements'));
const AccessControl = lazy(() => import('./AccessControl/AccessControl'));
const Campaigns = lazy(() => import('./Campaigns/Campaigns'));
const Analytics = lazy(() => import('./Analytics/Analytics'));
const Prizes = lazy(() => import('./Prizes/Prizes'));
const Emm = lazy(() => import('./EMM/Emm'));
const RoutesList = lazy(() => import('./Routes/RoutesList'));

class Child extends Component {
    render() {
        return (

            <div className="right-panel">
                <Suspense fallback={<Launch />}>
                    {this.props.selectedNavItem === userConstants.NavItem_Vehicles && <Vehicles />}
                    {this.props.selectedNavItem === userConstants.NavItem_Tracking && <Tracking />}
                    {this.props.selectedNavItem === userConstants.NavItem_Institutions && <Institutions />}
                    {this.props.selectedNavItem === userConstants.NavItem_Users && <Users />}
                    {this.props.selectedNavItem === userConstants.NavItem_Advertisements && <Advertisements />}
                    {this.props.selectedNavItem === userConstants.NavItem_AccessControl && <AccessControl />}
                    {this.props.selectedNavItem === userConstants.NavItem_Campaigns && <Campaigns />}
                    {this.props.selectedNavItem === userConstants.NavItem_Analytics && <Analytics />}
                    {this.props.selectedNavItem === userConstants.NavItem_Prizes && <Prizes />}
                    {this.props.selectedNavItem === userConstants.NavItem_EMM && <Emm />}
                    {this.props.selectedNavItem === userConstants.NavItem_Bus && <RoutesList />}
                </Suspense>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedNavItem: state.Login.SelectedNavOption
    }
};


const connectLogin = connect(mapStateToProps)(Child);
export { connectLogin as Child };