import React from 'react';
import alarem from '../images/alarem.svg';
import bank from '../images/bank.svg';
import carnew from '../images/carnew.svg';
import phone from '../images/phone.svg';
import '../components/Style/home.css';


export const SecondaryList = ({ vehicle, index, selectedIndex }) => {

    //console.log('SecondaryList(): Row values ==>', index + "===" + selectedIndex)

    return (
       <div className="menu" key={parseInt(index)}>
            <p className={parseInt(selectedIndex) === parseInt(index) ? "location-button-clicked" : "location-button"}>{vehicle.driver}</p>
            <ul className={parseInt(selectedIndex) === parseInt(index) ? "list_x" : "list"}>
                <li><a><img className="icon-30" alt="" src={alarem}/> {vehicle.id}</a></li>
                <li><a><img className="icon-30" alt="" src={carnew} /> {vehicle.model}</a></li>
                <li><a><img className="icon-30" alt="" src={phone} /> {vehicle.contact}</a></li>
                <li><a><img className="icon-30" alt="" src={bank} /> {vehicle.company}</a></li>
            </ul>
        </div>
        )
}
export default SecondaryList;