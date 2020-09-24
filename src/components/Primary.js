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


        return (


            <div className="overfollow-scroll" >

                <div className="profile">
                    <img className="bitmap" alt="" src="/static/media/5.3ea9ef3d.jpg" />
                    <p>Welcome {this.props.user.first_name}!!</p>
                </div>

                <div className="menu-part">
                    <ul>
                        {this.props.navItems.map(navItem =>
                            <li key={navItem} className={this.returnSelectMenu(navItem)} onClick={(event) => this.toggleMenu(event, navItem)}><a><div className="icon-28"><img alt="" src={require(`./image/${navItem}.svg`)} className="menu-icon" /></div> {navItem}</a>
                            </li>
                        )}
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



