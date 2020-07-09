import React, { Component } from 'react';
import alarem from './image/alarem.png';
import bank from './image/bank.png';
import carnew from './image/carnew.png';
import phone from './image/phone.png';

export const SecondaryList = ({ vehicle, index, selectedIndex }) => {
    return (
        <div className="slide-effect" key={vehicle.id}>
            <p className="location-button">{vehicle.id}</p>
            {selectedIndex === index ?
            <ul className="location-detail">
            <li><a href="#"><div className="icon-30"><img alt="" src={alarem} className="icon" /></div> {vehicle.make}</a></li>
            <li><a href="#"><div className="icon-30"><img alt="" src={carnew} className="icon" /></div> {vehicle.model}</a></li>
            <li><a href="#"><div className="icon-30"><img alt="" src={phone} className="icon" /></div>  {vehicle.plate}</a></li>
            <li><a href="#"><div className="icon-30"><img alt="" src={bank} className="icon" /></div>{vehicle.office}</a></li>
             </ul>: ""}
            </div>
        )
}
export default SecondaryList;