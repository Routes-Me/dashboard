import React, { Component } from 'react';
import alarem from './image/alarem.png';
import bank from './image/bank.png';
import carnew from './image/carnew.png';
import phone from './image/phone.png';

export class Secondary extends Component {

    render() {
        return (

           
            <div className="search-main">
                <div className="result-not-found">
                    <p>No results found</p>
                    <p><b>DUTY OFF</b>has 1 reult</p>
                </div>

                <div className="search-result">
                    <p>Free</p>
                    <div className="slide-effect">
                        <p className="location-button">Fulan Abu Flan</p>
                        <ul className="location-detail">
                            <li><a href="#"><div className="icon-30"><img alt="" src={alarem} className="icon" /></div> Running last 4hrs</a></li>
                            <li><a href="#"><div className="icon-30"><img alt="" src={carnew} className="icon" /></div> Toyota Camry.2019</a></li>
                            <li><a href="#"><div className="icon-30"><img alt="" src={phone} className="icon" /></div> +965 656552514</a></li>
                            <li><a href="#"><div className="icon-30"><img alt="" src={bank} className="icon" /></div> Afnan</a></li>
                        </ul>
                    </div>
                    <ul className="manual-menu first-sec">
                        <li><a href="#">Fulan Abu Flan</a></li>
                        <li><a href="#">Mohammad All</a></li>
                        <li><a href="#">Saad Mue</a></li>
                        <li><a href="#">Waseem Noor</a></li>
                    </ul>

                    <p>occupied</p>
                    <ul className="manual-menu">
                        <li><a href="#">Fulan Abu Flan</a></li>
                        <li><a href="#">Mohammad All</a></li>
                        <li><a href="#">Saad Mue</a></li>
                        <li><a href="#">Waseem Noor</a></li>
                    </ul>
                </div>

                <div className="search-part">
                    <div className="search-relative">
                        <input type="text" autoComplete="off" name="search" placeholder="Search" className="search"></input>
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <span className="cross-icon"><img src="../cross-image.png" /></span>
                    </div>
                </div>
            </div>
            
            );
    }
}