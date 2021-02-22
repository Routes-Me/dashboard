import React from 'react';
import plateNumber from '../../../../images/plateNumber.svg';
import institution from '../../../../images/institution.svg';
import car from '../../../../images/car.svg';
import time from '../../../../images/time.svg';
import '../../../Style/home.css';


export const SecondaryList = ({ vehicle }) => {

    return (
       <div className="menu">
            <ul className="list_x">
                <li><a><img className="icon-30" alt="" src={plateNumber}/> {vehicle?.plateNumber}</a></li>
                <li><a><img className="icon-30" alt="" src={car} /> {vehicle.model?.Name}</a></li>
                <li><a><img className="icon-30" alt="" src={time} /> {vehicle.institution?.CreatedAt}</a></li>
                <li><a><img className="icon-30" alt="" src={institution} /> {vehicle.institution?.Name}</a></li>
            </ul>
        </div>
        )
}
export default SecondaryList;