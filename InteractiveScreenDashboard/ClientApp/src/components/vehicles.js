import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
// import ic1 from './image/icon-1.png';
import tracking from './image/tracking.png';
import car from './image/car.png';
import drivers from './image/drivers.png';

import alarem from './image/alarem.png';
import bank from './image/bank.png';
import carnew from './image/carnew.png';
import phone from './image/phone.png';
import Pagination from "react-js-pagination";
import "bootstrap/less/bootstrap.less";

import GMap from './GMap';


export class vehicles extends Component {
    static displayName = vehicles.name;
    static defaultProps = {
        center: {
            lat: 23.2500,
            lng: 72.4833
        },
        zoom: 11
    };
    constructor(props) {
        super(props);
        this.state = {
            activePage: 15
        };
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    render() {
        return (
            <div className="tracking-page mt-57 fff">
               <div className="left-panel">
                  <div className="relative">
                  <div className="scroll-hide">
                     <div className="overfollow-scroll">
                        <div className="profile">
                          <img className="bitmap" alt="" src="/static/media/5.3ea9ef3d.jpg"/>
                          <p>Welcome Latifa</p>
                        </div>

                        <div className="menu-part">
                            <ul>
                               <li className="active"><a href="/home"><div className="icon-28"><img alt="" src={tracking} className="menu-icon"/></div> Tracking</a></li>
                               <li><a href="/vehicles"><div className="icon-28"><img alt="" src={car} className="menu-icon"/></div> Vehicles</a></li>
                               <li><a href="Drivers"><div className="icon-28"><img alt="" src={drivers} className="menu-icon"/></div>Drivers</a></li>
                            </ul>  
                        </div>
                        
                        <div className="tab-button">
                           <div className="button-back">
                           <button className="custom-butt active">Active</button>
                           <button className="custom-butt">Duty Off</button>
                           <div className="notification-duty-off"><span>1</span></div>
                           </div>
                        </div>

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
                                   <li><a href="#"><div className="icon-30"><img alt="" src={alarem} className="icon"/></div> Running last 4hrs</a></li>
                                   <li><a href="#"><div className="icon-30"><img alt="" src={carnew} className="icon"/></div> Toyota Camry.2019</a></li>
                                   <li><a href="#"><div className="icon-30"><img alt="" src={phone} className="icon"/></div> +965 656552514</a></li>
                                   <li><a href="#"><div className="icon-30"><img alt="" src={bank} className="icon"/></div> Afnan</a></li> 
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
                        </div>

                     </div>
                  </div>
                   <div className="search-part">
                      <div className="search-relative">
                             <input type="text" autoComplete="off" name="search" placeholder="Search" className="search"></input>
                             <i className="fa fa-search" aria-hidden="true"></i>
                             <span className="cross-icon"><img src="../cross-image.png"/></span>
                      </div>    
                   </div>
                   </div>
               </div>
              

               <div className="right-part">
                  <div className="vehicles-page">
                     <div className="top-part-vehicles-search padding-lr-80">
                         <div className="hehading-add-butt">
                            <h3>Vehicles</h3>
                            <a href="#" className="vehicle-add-butt"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Vehicle</a>
                         </div> 

                         <div className="search-part">
                            <div className="search-relative">
                                   <input type="text" name="search" placeholder="Search" className="search"></input>
                                   <i className="fa fa-search" aria-hidden="true"></i>
                                    <span className="cross-icon"><img src="../cross-image.png"/></span>
                            </div>
                         </div>
                     </div> 

                     <div className="table-list-vehicles">
                        <div className="table">
                           <table>
                           <thead>
                              <tr>
                               <th>Plate</th>
                               <th>Make</th>
                               <th>Model</th>
                               <th>Year</th>
                               <th>Office</th>
                               <th className="width44"></th>
                              </tr>
                           </thead>
                            <tbody>

                              <tr>
                                 <td>962245</td>
                                 <td>Toyota</td>
                                 <td>Camry</td>
                                 <td>2019</td>
                                 <td>Afnan</td>
                                 <td className="width44" >
                                   <div className="edit-popup">
                                      <div className="edit-delet-butt">
                                         <span></span>
                                         <span></span>
                                         <span></span>
                                      </div>  

                                      <ul className="edit-delet-link">
                                         <li><a href="#">Edit</a></li>
                                         <li><a href="#">Delet</a></li>
                                      </ul>
                                   </div>
                                 </td>
                              </tr>
                              <tr>
                                 <td>962245</td>
                                 <td>Toyota</td>
                                 <td>Camry</td>
                                 <td>2019</td>
                                 <td>Afnan </td>
                                 <td className="width44" >
                                   <div className="edit-popup">
                                      <div className="edit-delet-butt">
                                         <span></span>
                                         <span></span>
                                         <span></span>
                                      </div>  

                                      <ul className="edit-delet-link">
                                         <li><a href="#">Edit</a></li>
                                         <li><a href="#">Delet</a></li>
                                      </ul>
                                   </div>
                                 </td>
                              </tr>
                              <tr>
                                 <td>962245</td>
                                 <td>Toyota</td>
                                 <td>Camry</td>
                                 <td>2019</td>
                                 <td>Afnan</td>
                                 <td className="width44" >
                                   <div className="edit-popup">
                                      <div className="edit-delet-butt">
                                         <span></span>
                                         <span></span>
                                         <span></span>
                                      </div>  

                                      <ul className="edit-delet-link">
                                         <li><a href="#">Edit</a></li>
                                         <li><a href="#">Delet</a></li>
                                      </ul>
                                   </div>
                                 </td>
                              </tr>

                              <tr>
                                 <td>962245</td>
                                 <td>Toyota</td>
                                 <td>Camry</td>
                                 <td>2019</td>
                                 <td>Afnan</td>
                                 <td className="width44" >
                                   <div className="edit-popup">
                                      <div className="edit-delet-butt">
                                         <span></span>
                                         <span></span>
                                         <span></span>
                                      </div>  

                                      <ul className="edit-delet-link">
                                         <li><a href="#">Edit</a></li>
                                         <li><a href="#">Delet</a></li>
                                      </ul>
                                   </div>
                                 </td>
                              </tr>

                              <tr>
                                 <td>962245</td>
                                 <td>Toyota</td>
                                 <td>Camry</td>
                                 <td>2019</td>
                                 <td>Afnan</td>
                                 <td className="width44" >
                                   <div className="edit-popup">
                                      <div className="edit-delet-butt">
                                         <span></span>
                                         <span></span>
                                         <span></span>
                                      </div>  

                                      <ul className="edit-delet-link">
                                         <li><a href="#">Edit</a></li>
                                         <li><a href="#">Delet</a></li>
                                      </ul>
                                   </div>
                                 </td>
                              </tr>

                              <tr>
                                 <td>962245</td>
                                 <td>Toyota</td>
                                 <td>Camry</td>
                                 <td>2019</td>
                                 <td>Afnan</td>
                                 <td className="width44" >
                                   <div className="edit-popup">
                                      <div className="edit-delet-butt">
                                         <span></span>
                                         <span></span>
                                         <span></span>
                                      </div>  

                                      <ul className="edit-delet-link">
                                         <li><a href="#">Edit</a></li>
                                         <li><a href="#">Delet</a></li>
                                      </ul>
                                   </div>
                                 </td>
                              </tr>

                              <tr>
                                 <td>962245</td>
                                 <td>Toyota</td>
                                 <td>Camry</td>
                                 <td>2019</td>
                                 <td>Afnan</td>
                                 <td className="width44" >
                                   <div className="edit-popup">
                                      <div className="edit-delet-butt">
                                         <span></span>
                                         <span></span>
                                         <span></span>
                                      </div>  

                                      <ul className="edit-delet-link">
                                         <li><a href="#">Edit</a></li>
                                         <li><a href="#">Delet</a></li>
                                      </ul>
                                   </div>
                                 </td>
                              </tr>

                              <tr>
                                 <td>962245</td>
                                 <td>Toyota</td>
                                 <td>Camry</td>
                                 <td>2019</td>
                                 <td>Afnan</td>
                                 <td className="width44" >
                                   <div className="edit-popup">
                                      <div className="edit-delet-butt">
                                         <span></span>
                                         <span></span>
                                         <span></span>
                                      </div>  

                                      <ul className="edit-delet-link">
                                         <li><a href="#">Edit</a></li>
                                         <li><a href="#">Delet</a></li>
                                      </ul>
                                   </div>
                                 </td>
                              </tr>

                              <tr>
                                 <td>962245</td>
                                 <td>Toyota</td>
                                 <td>Camry</td>
                                 <td>2019</td>
                                 <td>Afnan</td>
                                 <td className="width44" >
                                   <div className="edit-popup">
                                      <div className="edit-delet-butt">
                                         <span></span>
                                         <span></span>
                                         <span></span>
                                      </div>  

                                      <ul className="edit-delet-link">
                                         <li><a href="#">Edit</a></li>
                                         <li><a href="#">Delet</a></li>
                                      </ul>
                                   </div>
                                 </td>
                              </tr>

                              <tr>
                                 <td>962245</td>
                                 <td>Toyota</td>
                                 <td>Camry</td>
                                 <td>2019</td>
                                 <td>Afnan</td>
                                 <td className="width44" >
                                   <div className="edit-popup">
                                      <div className="edit-delet-butt">
                                         <span></span>
                                         <span></span>
                                         <span></span>
                                      </div>  

                                      <ul className="edit-delet-link">
                                         <li><a href="#">Edit</a></li>
                                         <li><a href="#">Delet</a></li>
                                      </ul>
                                   </div>
                                 </td>
                              </tr>
                            </tbody>
                           </table>    
                        </div>
              <div className="left page-nav padding-lr-80">
                <span className="page-count">Page 15 of 20</span>
                <Pagination
                  hideDisabled
                  firstPageText={'<<<<'}
                  lastPageText={'>>>>'}
                  prevPageText={'<<'}
                  nextPageText={'>>'}
                  activePage={this.state.activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={450}
                  pageRangeDisplayed={10}
                  onChange={this.handlePageChange.bind(this)}
                />
              </div>
                     </div>
                  </div>
               </div>
            </div>

        );
    }
}