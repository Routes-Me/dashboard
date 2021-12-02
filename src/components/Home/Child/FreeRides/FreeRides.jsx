import React, { Component } from 'react';
import PageHandler from '../PageHandler';
import * as PrizeAction from '../../../../Redux/Action/PrizeAction';
import { connect } from 'react-redux';
import Detail from '../Detail/Detail';
import { userConstants } from '../../../../constants/userConstants';
import { config } from '../../../../constants/config';

class FreeRides extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rideList: [],
            title: "",
            start: "",
            end: "",
            limit: 0,
            fare: 0,
            tabIndex: 1,
            showDetails: false
        }
    }

    renderList(rideList) {
        return (
            <div className="table-list">
                {this.state.tabIndex === 1 &&
                    <>
                        <div className="header-add-butt" style={{ marginTop: '69px' }}>
                            <div className='col-md-6' style={{ padding: '0px' }}>
                                <div className="search-part" style={{ maxWidth: '338px', padding: '0px' }}>
                                    <input type="text" name="search" placeholder="Search" className="search" />
                                    <i className="fa fa-search" aria-hidden="true" />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <PageHandler page={rideList.page} getList={this.props.getFreeRideList} style='header' institutionId='1580030173' />
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr style={{ height: '51px' }}>
                                    <th>Title</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Limit</th>
                                    <th>Fare</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rideList.data?.map(ride => (
                                        <tr key={ride.Title}>
                                            <td>{ride.Title}</td>
                                            <td>{ride.Start?.substr(0, 10)}</td>
                                            <td>{ride.End?.substr(0, 10)}</td>
                                            <td>{ride.Limit}</td>
                                            <td>{ride.Fare}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </>}
            </div>
        )
    }

    onTabClick = (index) => {
        this.setState({ tabIndex: index });
        this.updateTheList(index);
    }

    updateTheList = (tabIndex) => {
        if (tabIndex === 1) {
            this.props.getFreeRideList(1, config.Pagelimit);
        }
        else {
            this.props.getRedemptionsList(1, config.Pagelimit);
        }
    }

    showDetailScreen = (e, ride) => {
        e.preventDefault();
        this.setState({
            showDetails: !this.state.showDetails,
            ride: ride
        })
    }


    render() {
        let content = '';
        const tabIndex = this.state.tabIndex;
        if (tabIndex === 1) {
            content = this.renderList(this.props.getFreeRideList)
        }
        return (
            <div>
                {this.state.showDetails ?
                    <Detail className={this.props.show ? 'slide-in' : 'slide-out'}
                        show={this.showDetailScreen}
                        objectType={userConstants.NavItem_FreeRides}
                        object={this.state.ride} /> :
                    <div className="top-part-vehicles-search padding-lr-80">
                        <div className="header-add-butt" onClick={e => this.showDetailScreen(e)}>
                            <h3>Free Rides</h3>
                            {tabIndex === 1 && <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Free Ride</a>}
                        </div>
                        <div className="headerTabStyle" style={{ maxWidth: '25%', marginTop: '13px' }}>
                            <nav>
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className={`nav-item nav-link ${tabIndex === 1 && "active"}`} id="nav-1" data-toggle="tab" onClick={(e) => this.onTabClick(1)} role="tab" aria-controls="nav-1" aria-selected="true"> Rides</a>
                                    <a className={`nav-item nav-link ${tabIndex === 2 && "active"}`} id="nav-2" data-toggle="tab" onClick={(e) => this.onTabClick(2)} role="tab" aria-controls="nav-2" aria-selected="false"> Redemptions</a>
                                </div>
                            </nav>
                        </div>
                        {content}
                    </div>}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        rideList: state.PrizeStore.FreeRides,
        redemptionsList: state.PrizeStore.Redemptions
    }
}

const actionCreators = {
    getFreeRideList: PrizeAction.getFreeRides,
    getRedemptionsList: PrizeAction.getRedemptionList
};

const connectedFreeRides = connect(mapStateToProps, actionCreators)(FreeRides);
export { connectedFreeRides as default };