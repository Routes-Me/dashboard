import React, { Component } from 'react';
import { connect } from 'react-redux';
import { config } from '../../constants/config';
import PageHandler from '../PageHandler';
import * as PrizeAction from '../../Redux/Action/PrizeAction';

export class Prizes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tabIndex:1
        }
    }

    onTabClick = (index) => {
        this.setState({ tabIndex: index });
    }

    renderList(Vehicles) {
        return (
            <div>
            {/* <PageHandler page = {Vehicles.page} getList={this.props.getVehiclesForInstitution} institutionId={this.props.user.InstitutionId} style='header'/> */}
            <div className="table-list padding-lr-80">
                    <table>
                        <thead>
                            <tr style={{height:'51px'}}>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>YEAR</th>
                                <th>PHONE</th>
                                <th>CREATED AT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Vehicles.data?.map(Vehicle => (
                                    <tr  key={Vehicle.CandidateId}>
                                        <td>{Vehicle.CandidateId}</td>
                                        <td>{Vehicle.Name}</td>
                                        <td>{Vehicle.Email}</td>
                                        <td>{Vehicle.DateOfBirth}</td>
                                        <td>{Vehicle.PhoneNumber}</td>
                                        <td>{Vehicle.CreatedAt}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }


    updateTheList = (tabIndex) => {
        if(tabIndex === 1)
        {
            this.props.getCandidatesForDraw(1, config.Pagelimit);
        }
        // else
        // {
        //     this.props.getDraws(1, config.Pagelimit);
        // }
    }

    render() {


        let list = this.state.tabIndex === 1 ? this.props.getCandidatesForDraw : this.props.getDraws
        let content = this.renderList(list);
        const tabIndex = this.state.tabIndex; 

        return (
            <div>
                <div className="top-part-vehicles-search padding-lr-80">
                    <div className="hehading-add-butt">
                        <h3>Prizes</h3>
                        {/* <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Vehicle</a> */}
                    </div>
                    <div className="headerTabStyle" style={{maxWidth:'25%',marginTop:'13px'}}>
                            <nav>
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className={`nav-item nav-link ${tabIndex === 1 && "active"}`}  id="nav-home-tab" data-toggle="tab" onClick={(e) => this.onTabClick(1)} role="tab" aria-controls="nav-home" aria-selected="true"> Candidates</a>
                                    <a className={`nav-item nav-link ${tabIndex === 2 && "active"}`} id="nav-profile-tab" data-toggle="tab" onClick={(e) => this.onTabClick(2)} role="tab" aria-controls="nav-profile" aria-selected="false">Draws</a>
                                    <a className={`nav-item nav-link ${tabIndex === 3 && "active"}`} id="nav-profile-tab" data-toggle="tab" onClick={(e) => this.onTabClick(3)} role="tab" aria-controls="nav-profile" aria-selected="false">Winners</a>
                                </div>
                            </nav>
                    </div>
                    <div className="hehading-add-butt">
                    <div className="search-part" style={{maxWidth:'338px', marginTop:'69px'}}>
                        <div className="search-relative">
                            <input type="text" name="search" placeholder="Search" className="search" />
                            <i className="fa fa-search" aria-hidden="true" />
                            <span className="cross-icon"><img src="../cross-image.png" /></span>
                        </div>
                    </div>
                    {/* <PageHandler page = {Vehicles.page} getList={this.props.getVehiclesForInstitution} institutionId={this.props.user.InstitutionId} style='header'/> */}
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
    }
}

const actionCreators = {
    getCandidatesForDraw : PrizeAction.getCandidates,
    getDraws : PrizeAction.getDraws
};

const connectedPrizes = connect(mapStateToProps, actionCreators)(Prizes);
export { connectedPrizes as default };
