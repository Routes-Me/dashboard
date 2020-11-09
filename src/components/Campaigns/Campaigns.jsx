import React, { Component } from 'react';
import Detail from '../Detail/Detail';
import { connect } from 'react-redux';
import { userConstants } from '../../constants/advertisementConstants';
import * as InstitutionAction from '../../Redux/Action';
import '../Detail/Detail.css';
import { institutionConstants } from '../../constants/institutionConstants';

export default class Campaigns extends Component {

    constructor(props){
        super(props)

        this.state = {
            camapignsList :[],
            showDetails: false
        }
    }

        //Load Data
        componentDidMount() {
            this.props.getInstitutionsList();
        }
    
        //Handle Page selection
        handlePageChange(pageNumber) {
            this.setState({ activePage: pageNumber });
        }
    
        //Handle SubMenu Toggle for the Table
        openSubMenuForInstitutionId = (e, institutionId) => {
            e.preventDefault();
            this.setState({ optionsIndex: this.state.optionsIndex === institutionId ? 0 : institutionId });
        }
    
    
        //Show Detail Screen
        showDetailScreen = (e, institution) => {
            e.preventDefault();
            this.setState({
                showDetails: !this.state.showDetails,
                institution: institution,
                optionsIndex: 0
            })
        }
    
        //Delete Institution
        deleteInstitution = (e, institutionId) => {
            e.preventDefault();
            this.props.deleteInstitution(institutionId)
        }
    
    
        static getDerivedStateFromProps (props, state){
            if(state.showDetails){
                if(props.ApplicationState === institutionConstants.saveInstitutions_SUCCESS)
                {
                    props.getInstitutionsList();
                    return {showDetails : false}
                }
            }
            return null;
        }

        //Load campaigns in a table 
        showCampaignsList(campaignsList) {
            return (
                <div className="table-list-vehicles">
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Start At</th>
                                    <th>End At</th>
                                    <th>Created At</th>
                                    <th className="width44" />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    campaignsList.map(campaign => (
                                        <tr key={campaign.campaignId} style={{textAlign:'center'}}>
                                            <td>{campaign.campaignId}</td>
                                            <td>{campaign.title}</td>
                                            <td>{campaign.startAt}</td>
                                            <td>{campaign.endAt}</td>
                                            <td>{campaign.createdAt}</td>
                                            <td className="width44" >
                                                <div className="edit-popup">
                                                    <div className="edit-delet-butt" onClick={e => this.openSubMenuForInstitutionId(e, institution.institutionId)}>
                                                        <span />
                                                        <span />
                                                        <span />
                                                    </div>
                                                    <ul className="edit-delet-link" style={{ display: this.state.optionsIndex === institution.institutionId ? 'inline-block' : 'none' }}>
                                                        <li><a onClick={e => this.showDetailScreen(e, institution)}>Edit</a></li>
                                                        <li><a onClick={e => this.deleteInstitution(e, institution.institutionId)}>Delete</a></li>
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
            )
        }

    render() {

        let content = this.showCampaignsList(this.props.CampaignsList);
        {this.props.ApplicationState === institutionConstants.saveInstitutions_SUCCESS && this.props.GetCampaignsList()}


        return (
            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>
                {this.state.showDetails ?
                    <Detail className={this.props.show ? 'slide-in' : 'slide-out'}
                        show={this.showDetailScreen}
                        objectType={userConstants.NavItem_Institutions}
                        object={this.state.institution} /> :
                    <div>
                        <div className="top-part-vehicles-search padding-lr-80">
                            <div className="hehading-add-butt">
                                <h3>Campaigns</h3>
                                <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Campaigns</a>
                            </div>

                            <div className="search-part">
                                <div className="search-relative">
                                    <input type="text" name="search" placeholder="Search" className="search" />
                                    <i className="fa fa-search" aria-hidden="true" />
                                    <span className="cross-icon"><img src="../cross-image.png" /></span>
                                </div>
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
        CampaignsList: state.InstitutionStore.Institutions,
        ApplicationState: state.InstitutionStore.ActionState
    }

}


//Create Redux for Users
const actionCreators = {
GetCampaignsList: InstitutionAction.getInstitutions,
DeleteCampaign : InstitutionAction.DeleteInstitution
};

const connectedInstitutions = connect(mapStateToProps, actionCreators)(Institutions);
export { connectedInstitutions as Institutions };
