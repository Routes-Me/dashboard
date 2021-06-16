import React from 'react';
import plateNumber from '../../../../images/plateNumber.svg';
import institution from '../../../../images/institution.svg';
import car from '../../../../images/car.svg';
import time from '../../../../images/time.svg';
import '../../../Style/home.css';
import { validate } from '../../../../util/basic';


export const SecondaryList = ({ vehicle }) => {

    return (
       <div className="menu">
            <ul className="list_x">
                <li><a><img className="icon-30" alt="" src={plateNumber}/> {validate(vehicle?.plateNumber)}</a></li>
                <li><a><img className="icon-30" alt="" src={car} /> {validate(vehicle.model?.name)}</a></li>
                <li><a><img className="icon-30" alt="" src={time} /> {validate(vehicle.institution?.createdat)}</a></li>
                <li><a><img className="icon-30" alt="" src={institution} /> {validate(vehicle.institution?.name)}</a></li>
            </ul>
        </div>
        )
}
export default SecondaryList;