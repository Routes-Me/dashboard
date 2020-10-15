﻿import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LoginAction from '../Redux/Action';
import * as UserAction from '../Redux/Action';
import { userConstants } from '../constants/userConstants';




class Primary extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            
            selectedNavItem:this.props.navItems[0]

        };
    }

    componentDidMount() {

        this.props.getAutherization(1);

    }
    

    toggleMenu = (event, type) => {
        event.stopPropagation();
       
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
                    <p>Welcome {this.props.user.Name}!!</p>
                </div>

                <div className="menu-part">
                    <ul>
                        {this.props.navItems.map(navItem =>
                            <li key={navItem} className={this.returnSelectMenu(navItem)} onClick={(event) => this.toggleMenu(event, navItem)}><a><div className="icon-28"><img alt="" src={require(`../images/${navItem}.svg`)} className="menu-icon" /></div> {navItem}</a>
                            </li>
                        )}
                     </ul>
                </div>

            </div>
        );

    }

}


const mapStateToProps = (state) => {

    return {
        selectedNavItem: state.Login.SelectedNavOption,
        user: state.Login.user,
        navItems: state.Login.navItems === undefined? []: state.Login.navItems
    }
};

const actionCreators = {
    getAutherization: LoginAction.getAutherization,
    updateNavItem: LoginAction.UpdateNavSelection
};

const connectLogin = connect(mapStateToProps, actionCreators)(Primary);
export { connectLogin as Primary };



