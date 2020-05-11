import React, { Component } from 'react';
import tracking from './image/tracking.png';
import car from './image/car.png';
import drivers from './image/drivers.png';

export class Primary extends Component
{
    render() {
        return (
            <div className="overfollow-scroll" >
                <div className="profile">
                    <img className="bitmap" alt="" src="/static/media/5.3ea9ef3d.jpg" />
                    <p>Welcome Latifa</p>
                </div>

                <div className="menu-part">
                    <ul>
                        <li className="active"><a href="/home"><div className="icon-28"><img alt="" src={tracking} className="menu-icon" /></div> Tracking</a></li>
                        <li><a href="/vehicles"><div className="icon-28"><img alt="" src={car} className="menu-icon" /></div> Vehicles</a></li>
                        <li><a href="Drivers"><div className="icon-28"><img alt="" src={drivers} className="menu-icon" /></div>Drivers</a></li>
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