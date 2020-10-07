﻿import React, { Component } from 'react';
import Detail from '../Detail/Detail';
import { connect } from 'react-redux';
import { userConstants } from '../../constants/userConstants';
import * as InstitutionAction from '../../Redux/Action';
import '../Detail/Detail.css';

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
        // get Institutions
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



    //Load Institution in a table 
    showInstitutionsList(institutionsList) {
        return (
            <div className="table-list-vehicles">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>TELEPHONE</th>
                                <th className="width44" />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                institutionsList.map(institution => (
                                    <tr key={institution.institutionId}>
                                        <td>{institution.institutionId}</td>
                                        <td>{institution.name}</td>
                                        <td>{institution.phoneNumber}</td>
                                        <td className="width44" >
                                            <div className="edit-popup">
                                                <div className="edit-delet-butt" onClick={e => this.openSubMenuForInstitutionId(e, institution.institutionId)}>
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                                <ul className="edit-delet-link" style={{ display: this.state.optionsIndex === institution.institutionId ? 'inline-block' : 'none' }}>
                                                    <li><a onClick={e => this.showDetailScreen(e, institution)}>Edit</a></li>
                                                    <li><a>Delete</a></li>
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

        let content = this.showInstitutionsList(this.props.InstitutionsList);

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
                                <h3>Institutions</h3>
                                <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Institution</a>
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
        );

    }


}

const mapStateToProps = (state) => {

    const Institutions = state.InstitutionStore.Institutions;
        return {
            InstitutionsList: Institutions
    }

}


//Create Redux for Users
const actionCreators = {
    getInstitutionsList: InstitutionAction.getInstitutions
};

const connectedInstitutions = connect(mapStateToProps, actionCreators)(Institutions);
export { connectedInstitutions as Institutions };