import React, { Component } from 'react';
import tracking from './image/tracking.png';
import car from './image/car.png';
import drivers from './image/drivers.png';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as LoginAction from '../Redux/Action';
import { Link } from 'react-router-dom';

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
            mainMenu1: false,
            mainMenu2: false,
            mainMenu3: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }
   
    

    toggleMenu = (event, type) => {
        event.stopPropagation();

        this.setState({
            ...this.state,
            [type]: true
        });
    };


    render() {

        const { mainMenu1, mainMenu2, mainMenu3 } = this.state;

        return (
            
            <div className="overfollow-scroll" >

                <div className="profile">
                    <img className="bitmap" alt="" src="/static/media/5.3ea9ef3d.jpg" />
                    <p>Welcome {this.props.user.first_name}!!</p>
                </div>

                <div className="menu-part">
                    <ul>

                        <li className={mainMenu1 ? "active" : ""} onClick={event => this.toggleMenu(event, "mainMenu1")}><Link to="/home"><a><div className="icon-28"><img alt="" src={tracking} className="menu-icon" /></div> Tracking</a></Link></li>

                        <li className={mainMenu2 ? "active" : ""} onClick={event => this.toggleMenu(event, "mainMenu2")}><Link to="/vehicles"><a><div className="icon-28"><img alt="" src={car} className="menu-icon" /></div> Vehicles</a></Link></li>

                        <li className={mainMenu3 ? "active" : ""} onClick={event => this.toggleMenu(event, "mainMenu3")}><a><div className="icon-28"><img alt="" src={drivers} className="menu-icon" /></div>Drivers</a></li>
                        
                     </ul>
                </div>

                <div className="tab-button">
                    <div className="button-back">
                        <button className="custom-butt active">Active</button>
                        <button className="custom-butt">Duty Off</button>
                        <div className="notification-duty-off"><span>1</span></div>
                    </div>
                </div>

            </div>
        );

    }

}

const mapStateToProps = (state) => {

    return { user: state.Login.user };
};



 const connectedPrimaryPage = connect(mapStateToProps)(Primary);
export { connectedPrimaryPage as Primary };

