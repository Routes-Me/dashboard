import React, { Component } from 'react';
import GMap from './GMap';
import { userConstants } from '../constants/userConstants';
import { connect } from 'react-redux';
import { Tracking } from './Tracking/Tracking';
import { Vehicles } from './Vehicles/Vehicles';
import { Institutions } from './Institutions/Institutions';
import { Users } from './Users/Users';
import { Advertisements } from './Advertisements/Advertisements';

class Child extends Component {
    render() {
        return (

            <div className="right-part">
                    {/*<GMap /><Tracking />*/}
                {this.props.selectedNavItem === userConstants.NavItem_Vehicles && <Vehicles />}
                {this.props.selectedNavItem === userConstants.NavItem_Tracking && <Tracking />}
                {this.props.selectedNavItem === userConstants.NavItem_Institutions && <Institutions />}
                {this.props.selectedNavItem === userConstants.NavItem_Users && <Users />}
                {this.props.selectedNavItem === userConstants.NavItem_Advertisements && <Advertisements/>}
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