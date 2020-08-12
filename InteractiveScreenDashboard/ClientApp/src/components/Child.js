﻿import React, { Component } from 'react';
import GMap from './GMap';
import { userConstants } from '../constants/userConstants';
import { connect } from 'react-redux';
import { Tracking } from './Tracking';
import { Vehicles } from './Vehicles/Vehicles';
import { Institutions } from './Institutions/Institutions';
import { Users } from './Users/Users';

class Child extends Component {
    render() {
        return (

            <div className="right-part">
                    {/*<GMap /><Tracking />*/}
                {this.props.selectedNavItem === userConstants.NavItem_Vehicles && <Vehicles />}
                {this.props.selectedNavItem === userConstants.NavItem_Tracking && <Tracking />}
                {this.props.selectedNavItem === userConstants.NavItem_Institutions && <Institutions />}
                {this.props.selectedNavItem === userConstants.NavItem_Users && <Users />}
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