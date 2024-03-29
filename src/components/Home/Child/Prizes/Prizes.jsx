import React, { Component } from 'react';
import { connect } from 'react-redux';
import { config } from '../../../../constants/config';
import PageHandler from '../PageHandler';
import * as PrizeAction from '../../../../Redux/Action/PrizeAction';
import Status from '../Advertisements/RowItem/Status';

class Prizes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabIndex:1
        }
    }

    componentDidMount(){
        this.updateTheList(this.state.tabIndex);
    }

    onTabClick = (index) => {
        this.setState({ tabIndex: index });
        this.updateTheList(index);
    }

    renderList(Vehicles) {
        return (
            <div className="table-list padding-lr-80-top-0">
            {this.state.tabIndex === 1 &&
                    <div>
                        <div className="header-add-butt" style={{marginTop:'69px'}}>
                            <div className='col-md-6' style={{padding:'0px'}}>
                            <div className="search-part" style={{maxWidth:'338px', padding:'0px'}}>
                                    <input type="text" name="search" placeholder="Search" className="search" />
                                    <i className="fa fa-search" aria-hidden="true" />
                            </div>
                            </div>
                            <div className='col-md-6'>
                            <PageHandler page = {Vehicles.page} getList={this.props.getCandidatesForDraw} style='header' institutionId='1580030173'/>
                            </div>
                            <button className='filter-btn'><i className='filter-icon'/> Add Filter</button>
                        </div>
                        
                    <table>
                        <thead>
                            <tr style={{height:'51px'}}>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                                <th>Phone Number</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Vehicles.data?.map(Vehicle =>(
                                    <tr  key={Vehicle.candidateId}>
                                        <td>{Vehicle.name}</td>
                                        <td>{Vehicle.email}</td>
                                        <td>{Vehicle.dateOfBirth?.substr(0, 10)}</td>
                                        <td>{Vehicle.phoneNumber}</td>
                                        <td>{Vehicle.createdAt}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>}
            {this.state.tabIndex === 2 &&
            <div>
                <div className="header-add-butt" style={{marginTop:'69px'}}>
                        <div className='col-md-6' style={{padding:'0px'}}>
                        <div className="search-part" style={{maxWidth:'338px', padding:'0px'}}>
                                <input type="text" name="search" placeholder="Search" className="search" />
                                <i className="fa fa-search" aria-hidden="true" />
                        </div>
                        </div>
                        <div className='col-md-6'>
                        <PageHandler page = {Vehicles.page} getList={this.props.getCandidatesForDraw} style='header'/>
                        </div>
                        <button className='filter-btn'><image className='filter-icon'/> Add Filter</button>
                </div>
                
                <table>
                        <thead>
                            <tr style={{height:'51px'}}>
                                <th>Name</th>
                                <th>Start At</th>
                                <th>End At</th>
                                <th>Status</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Vehicles.data?.map(Vehicle => (
                                    <tr key={Vehicle.drawId}>
                                        <td>{Vehicle.name}</td>
                                        <td>{Vehicle.startAt}</td>
                                        <td>{Vehicle.endAt}</td>
                                        <td><Status text={Vehicle.status}/></td>
                                        <td>{Vehicle.createdAt}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                </table>
            </div>}
            </div>
        );
    }


    updateTheList = (tabIndex) => {
        if(tabIndex === 1)
        {
            this.props.getCandidatesForDraw(1, config.Pagelimit,'1580030173');
        }
        else
        {
            this.props.getDraws(1, config.Pagelimit);
        }
    }

    render() {

        let content = '';
        if(this.state.tabIndex === 1){
            content = this.renderList(this.props.CandidatesList)
        }
        else if(this.state.tabIndex === 2){
            content = this.renderList(this.props.Draws)
        }
        const tabIndex = this.state.tabIndex; 

        return (
            <div>
                <div className="top-part-vehicles-search padding-lr-80">
                    <div className="header-add-butt">
                        <h3>Prizes</h3>
                        {/* <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Vehicle</a> */}
                    </div>
                    <div className="headerTabStyle" style={{maxWidth:'25%',marginTop:'13px'}}>
                            <nav>
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className={`nav-item nav-link ${tabIndex === 1 && "active"}`} id="nav-1" data-toggle="tab" onClick={(e) => this.onTabClick(1)} role="tab" aria-controls="nav-1" aria-selected="true"> Candidates</a>
                                    <a className={`nav-item nav-link ${tabIndex === 2 && "active"}`} id="nav-2" data-toggle="tab" onClick={(e) => this.onTabClick(2)} role="tab" aria-controls="nav-2" aria-selected="false">Draws</a>
                                    <a className={`nav-item nav-link ${tabIndex === 3 && "active"}`} id="nav-3" data-toggle="tab" onClick={(e) => this.onTabClick(3)} role="tab" aria-controls="nav-3" aria-selected="false">Winners</a>
                                </div>
                            </nav>
                    </div>

                    
                </div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        CandidatesList: state.PrizeStore.Candidates,
        Draws : state.PrizeStore.Draws
    }
}

const actionCreators = {
    getCandidatesForDraw : PrizeAction.getCandidates,
    getDraws : PrizeAction.getDraws
};

const connectedPrizes = connect(mapStateToProps, actionCreators)(Prizes);
export { connectedPrizes as default };
