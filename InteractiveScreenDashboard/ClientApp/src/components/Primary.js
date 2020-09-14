import React, { Component } from 'react';
//import  Tracking  from './image/tracking.svg';
//import  Vehicles  from './image/car.svg';
//import  Users  from './image/drivers.svg';
//import  Institutions  from './image/institution.svg';
//import  Advertisements  from './image/advertisement.svg';
import { connect } from 'react-redux';
import * as LoginAction from '../Redux/Action';
import * as UserAction from '../Redux/Action';
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
            selectedNavItem: this.props.navItems[0]

        };
    }

    componentWillMount() {
        this.props.updateNavItem(this.state.selectedNavItem);
        this.props.getAutherization(this.props.user.user_role_id)
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


    returnSelectMenu=(NavItem) =>{

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
                        {this.props.navItems.map(navItem =>
                            <li className={this.returnSelectMenu(navItem)} onClick={(event) => this.toggleMenu(event, navItem)}><a><div className="icon-28"><img alt="" src={require(`./image/${navItem}.svg`)} className="menu-icon" /></div> {navItem}</a>
                            </li>
                        )}
                        {/*<li className={this.returnSelectMenu(userConstants.NavItem_Users)} onClick={(event) => this.toggleMenu(event, userConstants.NavItem_Users)}><a><div className="icon-28"><img alt="" src={Users} className="menu-icon" /></div> {userConstants.NavItem_Users}</a>
                        </li>
                        <li className={this.returnSelectMenu(userConstants.NavItem_Vehicles)} onClick={(event) => this.toggleMenu(event, userConstants.NavItem_Vehicles)}><a><div className="icon-28"><img alt="" src={Vehicles} className="menu-icon" /></div> {userConstants.NavItem_Vehicles}</a>
                        </li>
                        <li className={this.returnSelectMenu(userConstants.NavItem_Advertisements)} onClick={(event) => this.toggleMenu(event, userConstants.NavItem_Advertisements)}><a><div className="icon-28"><img alt="" src={Advertisements} className="menu-icon" /></div> {userConstants.NavItem_Advertisements}</a>
                        </li>
                        <li className={this.returnSelectMenu(userConstants.NavItem_Drivers)} onClick={(event) => this.toggleMenu(event, userConstants.NavItem_Drivers)}><a><div className="icon-28"><img alt="" src={drivers} className="menu-icon" /></div> {userConstants.NavItem_Drivers}</a>
                        </li>
                        <li className={this.returnSelectMenu(userConstants.NavItem_Institutions)} onClick={(event) => this.toggleMenu(event, userConstants.NavItem_Institutions)}><a><div className="icon-28"><img alt="" src={Institutions} className="menu-icon" /></div> {userConstants.NavItem_Institutions}</a>
                        </li>*/}
                        
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
        user: state.Login.user,
        navItems: state.UserStore.navItems
    }
};

const actionCreators = {
    getAutherization: UserAction.getAutherization,
    updateNavItem: LoginAction.UpdateNavSelection
};

const connectLogin = connect(mapStateToProps, actionCreators)(Primary);
export { connectLogin as Primary };



