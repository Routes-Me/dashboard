import React, { Component } from 'react';
import tracking from './image/tracking.svg';
import car from './image/car.svg';
import drivers from './image/drivers.svg';
import institution from './image/institution.svg'
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as LoginAction from '../Redux/Action';
import { trackingConstants } from '../constants/trackingConstants';
import { userConstants } from '../constants/userConstants';

//const menus = {
//    mainMenu1: false,
//    mainMenu2: false,
//    mainMenu3: false
//};


class Primary extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            selectedNavItem: userConstants.NavItem_Tracking

        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.returnSelectMenu = this.returnSelectMenu.bind(this);
    }

    componentWillMount() {
        this.props.updateNavItem(this.state.selectedNavItem);
    }
    

    toggleMenu = (event, type) => {
        event.stopPropagation();
       
        //this.setState({
        //    ...this.state,
        //    [type]: true
        //});
        //this.setState({ selectedNavItem: type });
        this.props.updateNavItem(type);
    };


    returnSelectMenu(NavItem) {

        return this.props.selectedNavItem === NavItem ? "active" : "";

    }


    render() {

        // const { mainMenu1, mainMenu2, mainMenu3 } = this.state;
        //console.log(`Selected Menu to render ==> ${this.state.selectedNavItem}`)
        return (
            
            <div className="overfollow-scroll" >

                <div className="profile">
                    <img className="bitmap" alt="" src="/static/media/5.3ea9ef3d.jpg" />
                    <p>Welcome {this.props.user.first_name}!!</p>
                </div>

                <div className="menu-part">
                    <ul>
                        <li className={this.returnSelectMenu(userConstants.NavItem_Tracking)} onClick={(event) => this.toggleMenu(event, userConstants.NavItem_Tracking )}><a><div className="icon-28"><img alt="" src={tracking} className="menu-icon" /></div> {userConstants.NavItem_Tracking}</a>
                        </li>
                        <li className={this.returnSelectMenu(userConstants.NavItem_Users)} onClick={(event) => this.toggleMenu(event, userConstants.NavItem_Users)}><a><div className="icon-28"><img alt="" src={drivers} className="menu-icon" /></div> {userConstants.NavItem_Users}</a>
                        </li>
                        <li className={this.returnSelectMenu(userConstants.NavItem_Vehicles)} onClick={(event) => this.toggleMenu(event, userConstants.NavItem_Vehicles)}><a><div className="icon-28"><img alt="" src={car} className="menu-icon" /></div> {userConstants.NavItem_Vehicles}</a>
                        </li>
                        {/*<li className={this.returnSelectMenu(userConstants.NavItem_Drivers)} onClick={(event) => this.toggleMenu(event, userConstants.NavItem_Drivers)}><a><div className="icon-28"><img alt="" src={drivers} className="menu-icon" /></div> {userConstants.NavItem_Drivers}</a>
                        </li>*/}
                        <li className={this.returnSelectMenu(userConstants.NavItem_Institutions)} onClick={(event) => this.toggleMenu(event, userConstants.NavItem_Institutions)}><a><div className="icon-28"><img alt="" src={institution} className="menu-icon" /></div> {userConstants.NavItem_Institutions}</a>
                        </li>
                        
                     </ul>
                </div>

            </div>
        );

    }

}


const mapStateToProps = (state) => {

    //console.log("Selected Nav Item : ", state.Login.SelectedNavOption)
    return {
        selectedNavItem: state.Login.SelectedNavOption,
        user: state.Login.user
    }
};

const actionCreators = {
    updateNavItem: LoginAction.UpdateNavSelection
};

const connectLogin = connect(mapStateToProps, actionCreators)(Primary);
export { connectLogin as Primary };



