import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as LoginAction from '../../../Redux/Action';
import { isSU } from '../../../util/basic';
import { parseJwt } from "../../../util/encrypt";
import { restoreToken } from '../../../util/localStorage';




class Primary extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            
            selectedNavItem:this.props.navItems[0],
            institutionId :''
        };
    }

    componentDidMount() {

        // if(this.props.user.InstitutionId!== undefined)
        // {
            this.setAuthorization();
        // }
        // else{
        //     this.restoreUserFromToken();
        // }
        

    }


    toggleMenu = (event, type) => {
        event.stopPropagation();
        this.props.updateNavItem(type);
    };


    returnSelectMenu=(NavItem) =>{

        return this.props.selectedNavItem === NavItem ? "active" : "";

    }

    restoreUserFromToken = async() => {
        const token = await restoreToken();
        this.props.restoreToken(token);
        const user = parseJwt(token);
        this.props.restoreUser(user);
        this.setAuthorization();
    }

    setAuthorization = () => {
        console.log('User to authorize ', this.props.user);
        if(isSU(this.props.role)) //1580030173 78132467
        this.props.getAutherization(1);
        else
        this.props.getAutherization(2);
    }


    render() {


        return (

            <div>

                <div className="profile">
                    <p className="title">{this.props.user.name}</p>
                    <p className="subTitle">{this.props.user.phoneNumber}</p>
                </div>

                <div className="menu-part">
                    <ul>
                        {this.props.navItems.map(navItem =>
                            <li key={navItem} className={this.returnSelectMenu(navItem)} onClick={(event) => this.toggleMenu(event, navItem)}><a><div className="icon-22"><img alt="" src={require(`../../../images/${navItem}.svg`)} className="menu-icon" /></div> {navItem}</a>
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
        role: state.Login.role,
        user: state.Login.user,
        navItems: state.Login.navItems === undefined? []: state.Login.navItems
    }

};

const actionCreators = {
    getAutherization: LoginAction.getAutherization,
    updateNavItem: LoginAction.UpdateNavSelection,
    restoreUser : LoginAction.restoreUserFromSession,
    restoreToken : LoginAction.restoreTokenFromSession
};

const connectLogin = connect(mapStateToProps, actionCreators)(Primary);
export { connectLogin as Primary };



