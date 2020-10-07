import React, { Component } from 'react';
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
        
        // this.props.getAutherization(this.props.user.user_role_id);
        this.props.getAutherization(1);
        this.props.updateNavItem(this.state.selectedNavItem);
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
        navItems: state.UserStore.navItems === undefined? []: state.UserStore.navItems
    }
};

const actionCreators = {
    getAutherization: UserAction.getAutherization,
    updateNavItem: LoginAction.UpdateNavSelection
};

const connectLogin = connect(mapStateToProps, actionCreators)(Primary);
export { connectLogin as Primary };



