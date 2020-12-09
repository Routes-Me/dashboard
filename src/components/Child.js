import React, { Component } from 'react';
import { userConstants } from '../constants/userConstants';
import { connect } from 'react-redux';
import { Tracking } from './Tracking/Tracking';
import { Vehicles } from './Vehicles/Vehicles';
import { Institutions } from './Institutions/Institutions';
import { Users } from './Users/Users';
import { Advertisements } from './Advertisements/Advertisements';
import { AccessControl } from "./AccessControl/AccessControl";
import { Campaigns } from './Campaigns/Campaigns';
import Analytics from './Analytics/Analytics';

class Child extends Component {
    render() {
        return (

            <div className="right-part">
                {this.props.selectedNavItem === userConstants.NavItem_Vehicles && <Vehicles />}
                {this.props.selectedNavItem === userConstants.NavItem_Tracking && <Tracking />}
                {this.props.selectedNavItem === userConstants.NavItem_Institutions && <Institutions />}
                {this.props.selectedNavItem === userConstants.NavItem_Users && <Users />}
                {this.props.selectedNavItem === userConstants.NavItem_Advertisements && <Advertisements/>}
                {this.props.selectedNavItem === userConstants.NavItem_AccessControl && <AccessControl/>}
                {this.props.selectedNavItem === userConstants.NavItem_Campaigns && <Campaigns/>}
                {this.props.selectedNavItem === userConstants.NavItem_Analytics && <Analytics/>}
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