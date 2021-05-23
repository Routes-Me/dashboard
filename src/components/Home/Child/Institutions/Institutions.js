import React, { Component } from 'react';
import { connect } from 'react-redux';
import Detail from '../Detail/Detail';
import * as InstitutionAction from '../../../../Redux/Action';
import '../Detail/Detail.css';
import PageHandler from '../PageHandler';
import { config } from '../../../../constants/config';
import { userConstants } from '../../../../constants/userConstants';
import { institutionConstants } from '../../../../constants/institutionConstants';
import { isROU } from '../../../../util/basic';

class Institutions extends Component {

    constructor(props) {
        super(props)

        this.state = {
            institutionsList: [],
            loading: true,
            failed: false,
            error: '',
            activePage: 1,
            showDetails: false,
            institution: '',
            optionsIndex:0
        }
    }


    //Load Data
    componentDidMount() {
        this.props.getInstitutionsList(1,config.Pagelimit);
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
                return {showDetails : false}
            }
        }
        return null;
    }

    componentDidUpdate() {
        if(this.props.ApplicationState === institutionConstants.saveInstitutions_SUCCESS)
        {
            this.props.getInstitutionsList(1,config.Pagelimit);
        }
    }



    //Load Institution in a table 
    showInstitutionsList(institutionsList) {
        return (
            <div>
            <PageHandler page = {institutionsList.page} getList={this.props.getInstitutionsList} style='header'/>
            <div className="table-list padding-lr-80">
                {/* <div className="table"> */}
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>TELEPHONE</th>
                                <th className="width20" />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                institutionsList.data?.map(institution => (
                                    <tr key={institution.institutionId}>
                                        <td>{institution.institutionId}</td>
                                        <td>{institution.name}</td>
                                        <td>{institution.phoneNumber}</td>
                                        {!isROU(this.props.role) &&
                                        <td className="width20">
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

        let content = this.showInstitutionsList(this.props.InstitutionsList);
        {this.props.ApplicationState === institutionConstants.saveInstitutions_SUCCESS && this.props.getInstitutionsList(1,config.Pagelimit)}

        return (
            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>
                {this.state.showDetails ?
                    <Detail className={this.props.show ? 'slide-in' : 'slide-out'}
                        show={this.showDetailScreen}
                        objectType={userConstants.NavItem_Institutions}
                        object={this.state.institution} /> :
                    <div>
                        <div className="top-part-vehicles-search padding-lr-80">
                            <div className="header-add-butt">
                                <h3>Institutions</h3>
                                {!isROU(this.props.role) &&
                                <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Institution</a>}
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
        );

    }


}

const mapStateToProps = (state) => {

        return {
            InstitutionsList: state.InstitutionStore.Institutions,
            role: state.Login.role,
            ApplicationState: state.InstitutionStore.ActionState
    }

}

//Create Redux for Users
const actionCreators = {
    getInstitutionsList: InstitutionAction.getInstitutions,
    deleteInstitution : InstitutionAction.DeleteInstitution
};

const connectedInstitutions = connect(mapStateToProps, actionCreators)(Institutions);
export { connectedInstitutions as default };