import React from 'react';
import alarem from './image/alarem.svg';
import bank from './image/bank.svg';
import carnew from './image/carnew.svg';
import phone from './image/phone.svg';
import './Style/CustomStyle.css';


export const SecondaryList = ({ vehicle, index, selectedIndex }) => {

    //console.log('SecondaryList(): Row values ==>', index + "===" + selectedIndex)

    return (
       <div className="menu" key={parseInt(index)}>
            <p className={parseInt(selectedIndex) === parseInt(index) ? "location-button-clicked" : "location-button"}>{vehicle.plateNumber}</p>
            <ul className={parseInt(selectedIndex) === parseInt(index) ? "list_x" : "list"}>
                <li><a hr><img className="icon-30" alt="" src={alarem}/> {vehicle.id}</a></li>
                <li><a><img className="icon-30" alt="" src={carnew} /> {vehicle.model.Name}</a></li>
                <li><a><img className="icon-30" alt="" src={phone} /> {vehicle.plateNumber}</a></li>
                <li><a><img className="icon-30" alt="" src={bank} /> {vehicle.institution?.Name}</a></li>
            </ul>
        </div>

         /*<div className="slide-effect">
            <p className="location-button">Fulan Abu Flan</p>
            <ul className="location-detail">
                <li><a href="#"><div className="icon-30"><img alt="" src={alarem} className="icon" /></div> Running last 4hrs</a></li>
                <li><a href="#"><div className="icon-30"><img alt="" src={carnew} className="icon" /></div> Toyota Camry.2019</a></li>
                <li><a href="#"><div className="icon-30"><img alt="" src={phone} className="icon" /></div> +965 656552514</a></li>
                <li><a href="#"><div className="icon-30"><img alt="" src={bank} className="icon" /></div> Afnan</a></li>
            </ul>
        </div>
        

        <div className="slide-effect" key={parseInt(index)}>
            <p className="location-button">{vehicle.driver}</p>
            {parseInt(selectedIndex) === parseInt(index) && <ul className="location-detail">
                <li><a><div className="icon-30"><img alt="" src={alarem} className="icon" /></div> {vehicle.vehicle_id}</a></li>
                <li><a><div className="icon-30"><img alt="" src={carnew} className="icon" /></div> {vehicle.model}</a></li>
                <li><a><div className="icon-30"><img alt="" src={phone} className="icon" /></div>  {vehicle.contact}</a></li>
                <li><a><div className="icon-30"><img alt="" src={bank} className="icon" /></div>{vehicle.company}</a></li>
            </ul>}
        </div>*/
       /*<div className="slide-effect" key={parseInt(index)}>
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