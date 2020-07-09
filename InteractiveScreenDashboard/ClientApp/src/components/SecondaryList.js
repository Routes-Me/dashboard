import React, { Component } from 'react';
import alarem from './image/alarem.png';
import bank from './image/bank.png';
import carnew from './image/carnew.png';
import phone from './image/phone.png';

export const SecondaryList = ({ vehicle, index, selectedIndex }) => {

    console.log('Row values ==>', index + "===" + selectedIndex)
    return (
        parseInt(selectedIndex) === parseInt(index) ?
            <div className="slide-effect" key={vehicle.id}>
                <p className="location-button">{vehicle.id}</p>
                <ul className="location-detail">
                    <li><a href="#"><div className="icon-30"><img alt="" src={alarem} className="icon" /></div> {vehicle.institution_id}</a></li>
                    <li><a href="#"><div className="icon-30"><img alt="" src={carnew} className="icon" /></div> {vehicle.status}</a></li>
                    <li><a href="#"><div className="icon-30"><img alt="" src={phone} className="icon" /></div>  {vehicle.status}</a></li>
                    <li><a href="#"><div className="icon-30"><img alt="" src={bank} className="icon" /></div>{vehicle.institution_id}</a></li>
                </ul>
            </div>:<div className="slide-effect" key={vehicle.id}><p className="location-button">{vehicle.id}</p></div>
        )
}
export default SecondaryList;