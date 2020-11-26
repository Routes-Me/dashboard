﻿import React, { Component } from 'react';
import Detail from '../Detail/Detail';
import { connect } from 'react-redux';
import { userConstants } from '../../constants/userConstants';
import * as AdvertisementAction from '../../Redux/Action';
import '../Detail/Detail.css';
import Status from '../Advertisements/RowItem/Status';
import { advertisementsConstants } from '../../constants/advertisementConstants';
import PageHandler from '../PageHandler';

class Advertisements extends Component {

    constructor(props) {
        super(props)

        this.state = {
            advertisementList: [],
            loading: true,
            failed: false,
            error: '',
            activePage: 1,
            showDetails: false,
            advertisement: '',
            optionsIndex: 0
        };
    }

    componentDidMount() {
        this.props.getAdvertisements();
    }




    //Page Selection
    handlePageChange(pageNumber) {
        //console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    //Handle submenu for the table row
    openSubMenuForVehicleId = (e, vehicleId) => {
        e.preventDefault();
        this.setState({ optionsIndex: this.state.optionsIndex === vehicleId ? 0 : vehicleId });
    }

    //show detail screen 
    showDetailScreen = (e, Advertisement) => {
        e.preventDefault();
        this.setState({
            showDetails: !this.state.showDetails,
            advertisement: Advertisement,
            optionsIndex: 0
        });
    }

    deleteAdvertisement = (e, advertisementId) => {
        e.preventDefault();
        this.props.deleteAdvertisements(advertisementId)
    }


    static getDerivedStateFromProps (props, state){
        
            if(props.ApplicationState === advertisementsConstants.updateTheAdvertisementList)
            {
                if(state.showDetails){
                    return {showDetails : false};
                }
            }
    }


    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.ApplicationState !== prevProps.ApplicationState) {
    //         if(this.props.ApplicationState === advertisementsConstants.updateTheAdvertisementList)
    //         {
    //             this.props.getAdvertisements();
    //             if(prevState.showDetails){
    //                 this.setState({showDetails : false});
    //             }
    //         }
    //     }
    //   }

    //Delete Vehicle function


    //Load Advertisements in a table
    renderAllAdvertisementTable(Advertisements) {
        return (
            <div className="table-list-vehicles">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>CREATED AT</th>
                                <th>STATUS</th>
                                <th className="width44" />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Advertisements?.map(Advertisement => (
                                    <tr key={Advertisement.id} style={{textAlign:'center'}}>
                                        <td>{Advertisement.id}</td>
                                        <td>{Advertisement.resourceName}</td>
                                        <td>{Advertisement.createdAt}</td>
                                        <td><Status text={Advertisement.campaigns[0]?.status}/></td>
                                        <td className="width44" >
                                            <div className="edit-popup">
                                                <div className="edit-delet-butt" onClick={e => this.openSubMenuForVehicleId(e, Advertisement.id)}>
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                                <ul className="edit-delet-link" style={{ display: this.state.optionsIndex === Advertisement.id ? 'inline-block' : 'none' }}>
                                                    <li><a onClick={e => this.showDetailScreen(e, Advertisement)}>Edit</a></li>
                                                    <li><a  onClick={e => this.deleteAdvertisement(e, Advertisement.id)}>Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }



    render() {



        //let content = this.state.loading ?
        //    <div><br /><br /><p><em> Loading...</em> </p></div> :
        //    this.state.failed ?
        //        <div className="text-danger"><br /><br />
        //            <em>{this.state.error}</em>
        //        </div> : this.renderAllVehicleTable(this.state.VehicleList);

        let content = this.renderAllAdvertisementTable(this.props.AdvertisementList);

        {this.props.ApplicationState === advertisementsConstants.updateTheAdvertisementList && this.props.getAdvertisements()}

        return (

            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>
                {this.state.showDetails ?
                     <Detail className={this.props.show ? 'slide-in' : 'slide-out'}
                        show={this.showDetailScreen}
                        objectType={userConstants.NavItem_Advertisements}
                        object={this.state.advertisement} /> :
                    <div>
                        <div className="top-part-vehicles-search padding-lr-80">
                            <div className="hehading-add-butt">
                                <h3>Advertisements</h3>
                                <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Advertisement</a>
                            </div>

                            <div className="search-part">
                                <div className="search-relative">
                                    <input type="text" name="search" placeholder="Search" className="search" />
                                    <i className="fa fa-search" aria-hidden="true" />
                                    <span className="cross-icon"><img src="../cross-image.png" /></span>
                                </div>
                            </div>
                        </div>

                        <PageHandler/>
                        {content}
                    </div>}
            </div>

        );
    }

}

const mapStateToProps = (state) => {


    return {
        AdvertisementList: state.AdvertisementStore.Advertisements,
        ApplicationState: state.AdvertisementStore.ActionState
    }

}

const actionCreators = {
    getAdvertisements: AdvertisementAction.getAdvertisements,
    deleteAdvertisements: AdvertisementAction.deleteAdvertisement
};

const connectedAdvertisements = connect(mapStateToProps, actionCreators)(Advertisements);
export { connectedAdvertisements as Advertisements };