import React, { Component } from 'react';
import Detail from '../Detail/Detail';
import { connect } from 'react-redux';
import { userConstants } from '../../constants/userConstants';
import * as AdvertisementAction from '../../Redux/Action';
import '../Detail/Detail.css';
import { advertisementsConstants } from '../../constants/advertisementConstants';
import PageHandler from '../PageHandler';
import { config } from '../../constants/config';
import Status from '../Advertisements/RowItem/Status';
import { isReadOnlyMode } from '../../util/basic';

class Campaigns extends Component {

    constructor(props){
        super(props)

        this.state = {
            camapignsList :[],
            showDetails: false,
            optionsIndex:0,
            campaign:''
        }
    }

        //Load Data
        componentDidMount() {
            this.props.getCampaignsList(1,config.Pagelimit);
        }
    
        //Handle Page selection
        handlePageChange(pageNumber) {
            this.setState({ activePage: pageNumber });
        }
    
        //Handle SubMenu Toggle for the Table
        openSubMenuForCampaignId = (e, campaignId) => {
            e.preventDefault();
            this.setState({ optionsIndex: this.state.optionsIndex === campaignId ? 0 : campaignId });
        }
    
    
        //Show Detail Screen
        showDetailScreen = (e, campaign) => {
            e.preventDefault();
            this.setState({
                showDetails  : !this.state.showDetails,
                campaign     : campaign,
                optionsIndex : 0
            })
        }
    
        //Delete Institution
        deleteCampaign = (e, campaignId) => {
            e.preventDefault();
            this.props.deleteCampaign(campaignId)
        }
    
    
        static getDerivedStateFromProps (props, state){
            if(state.showDetails){
                if(props.ApplicationState === advertisementsConstants.updateTheCampaignsList)
                {
                    return {showDetails : false}
                }
            }
            return null;
        }

        //Load campaigns in a table 
        showCampaignsList(campaignsList) {
            return (
                <div>
                    <PageHandler page = {campaignsList.page} getList={this.props.getCampaignsList} style='header'/>
                    <div className="table-list padding-lr-80">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>TITLE</th>
                                    <th>START AT</th>
                                    <th>END AT</th>
                                    <th>STATUS</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    campaignsList.data?.map(campaign => (
                                        <tr key={campaign.campaignId}>
                                            <td>{campaign.campaignId}</td>
                                            <td>{campaign.title}</td>
                                            <td>{campaign.startAt}</td>
                                            <td>{campaign.endAt}</td>
                                            <td><Status text={campaign.status}/></td>
                                        {!isReadOnlyMode(this.props.user) &&
                                            <td>
                                                <div className="edit-popup">
                                                    <div className="edit-delet-butt" onClick={e => this.openSubMenuForCampaignId(e,campaign.campaignId)}>
                                                        <span />
                                                        <span />
                                                        <span />
                                                    </div>
                                                    <ul className="edit-delet-link" style={{ display: this.state.optionsIndex === campaign.campaignId ? 'inline-block' : 'none' }}>
                                                        <li><a onClick={e => this.showDetailScreen(e, campaign)}>Edit</a></li>
                                                        <li><a onClick={e => this.deleteCampaign(e, campaign.campaignId)}>Delete</a></li>
                                                    </ul>
                                                </div>
                                            </td>}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }

    render() {

        let content = this.showCampaignsList(this.props.campaignsList);
        {this.props.ApplicationState === advertisementsConstants.updateTheCampaignsList && this.props.getCampaignsList()}


        return (
            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>
                {this.state.showDetails ?
                    <Detail className={this.props.show ? 'slide-in' : 'slide-out'}
                        show={this.showDetailScreen}
                        objectType={userConstants.NavItem_Campaigns}
                        object={this.state.campaign} /> :
                    <div>
                        <div className="top-part-vehicles-search padding-lr-80">
                            <div className="header-add-butt">
                                <h3>Campaigns</h3>
                                {!isReadOnlyMode(this.props.user) &&
                                <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Campaigns</a>}
                            </div>

                            <div className="search-part">
                                    <input type="text" name="search" placeholder="Search" className="search" />
                                    <i className="fa fa-search" aria-hidden="true" />
                                    <span className="cross-icon"><img src="../cross-image.png" /></span>
                            </div>
                        </div>
                        {content}
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        campaignsList: state.AdvertisementStore.Campaigns,
        user: state.Login.user,
        ApplicationState: state.AdvertisementStore.ActionState
    }

}


//Create Redux for Users
const actionCreators = {
    getCampaignsList: AdvertisementAction.getCampaigns,
    deleteCampaign : AdvertisementAction.deleteCampaign
};

const connectedCampaigns = connect(mapStateToProps, actionCreators)(Campaigns);
export { connectedCampaigns as default };
