import React from 'react';
import alarem from './image/alarem.png';
import bank from './image/bank.png';
import carnew from './image/carnew.png';
import phone from './image/phone.png';

export const SecondaryList = ({ vehicle, index, selectedIndex }) => {

    //console.log('SecondaryList(): Row values ==>', index + "===" + selectedIndex)
    return (
           <div className="slide-effect" key={parseInt(index)}>
            <p className="location-button">{vehicle.driver}</p>
            <ul className={parseInt(selectedIndex) === parseInt(index) ? "expand" : "collapse"} >
                <li><a><div className="icon-30"><img alt="" src={alarem} className="icon" /></div> {vehicle.vehicle_id}</a></li>
                <li><a><div className="icon-30"><img alt="" src={carnew} className="icon" /></div> {vehicle.model}</a></li>
                <li><a><div className="icon-30"><img alt="" src={phone} className="icon" /></div>  {vehicle.contact}</a></li>
                <li><a><div className="icon-30"><img alt="" src={bank} className="icon" /></div>{vehicle.company}</a></li>
            </ul>
            </div>

            /*parseInt(selectedIndex) === parseInt(index) ?
            <div className="slide-effect" key={parseInt(index)}>
                <p className="location-button">{vehicle.driver}</p>
                <ul className="location-detail">
                    <li><a href="#"><div className="icon-30"><img alt="" src={alarem} className="icon" /></div> {vehicle.vehicle_id}</a></li>
                    <li><a href="#"><div className="icon-30"><img alt="" src={carnew} className="icon" /></div> {vehicle.model}</a></li>
                    <li><a href="#"><div className="icon-30"><img alt="" src={phone} className="icon" /></div>  {vehicle.contact}</a></li>
                    <li><a href="#"><div className="icon-30"><img alt="" src={bank} className="icon" /></div>{vehicle.company}</a></li>
                </ul>
            </div> : <div className="slide-effect" key={parseInt(index)}><p className="location-button">{vehicle.driver}</p></div>
       <div className="slide-effect" key={parseInt(index)}>
            <ul>
                <li>
                    <input type="checkbox" id={ vehicle.vehicle_id } />
                    <label for={vehicle.vehicle_id}>{vehicle.driver}</label>
                    <ul>
                        <li><a className="icon-30"><img alt="" src={alarem} className="icon" /> {vehicle.vehicle_id}</a></li>
                        <li><a className="icon-30"><img alt="" src={carnew} className="icon" />{vehicle.model}</a></li>
                        <li><a className="icon-30"><img alt="" src={phone} className="icon" />{vehicle.contact}</a></li>
                        <li><a className="icon-30"><img alt="" src={bank} className="icon" />{vehicle.company}</a></li>
                    </ul>
                </li>
            </ul>
        </div> */
        )
}
export default SecondaryList;