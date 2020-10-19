﻿import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as UserAction from '../../Redux/Action';
import * as InstitutionAction from '../../Redux/Action';
import Form from 'react-validation/build/form';
import { encryptAndEncode } from '../../util/encrypt';
import {config} from "../../constants/config";


class UsersDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            InstitutionId: "",
            email: "",
            role: "",
            phone:"",
            user: '',
            userRoles: '',
            application: '',
            errorText:"",
            password:""
        }
    }

    componentDidMount() {
        this.props.getPriviledges();
        this.props.getApplications();
        this.props.getInstitutions();
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.userToDisplay !== undefined) {
            if (props.userToDisplay !== state.userToDisplay) {
                return {
                    
                    user: props.userToDisplay,
                    id: props.userToDisplay.userId,
                    name: props.userToDisplay.name,
                    email: props.userToDisplay.email,
                    phone: props.userToDisplay.phone,
                    roles: props.userToDisplay.roles,
                    InstitutionId: props.userToDisplay.InstitutionId

                }
            }
        }
    }

    //Submit button action 
    handleSubmit = (event) => {

        event.preventDefault();

        const user = {
            // userId:this.state.id,
            Name: this.state.name,
            Password: encryptAndEncode(this.state.password) ,
            Email: this.state.email,
            PhoneNumber: this.state.phone,
            InstitutionId: this.state.InstitutionId,
            Roles:[
                {
                    ApplicationId: this.state.application.toString(),
                    PrivilegeId: this.state.userRoles.toString()
               }
            ]                                                                                                                                                                                                                                                                                                             
        }

        console.log('userObj',user )
        // this.props.saveUser(user);

        let action ="";

        {this.state.user.userId? action = "save": action = "add"}

        this.props.saveUser(user,action);
    }

    render() {
        // Render nothing if the "show" prop is false
        // if (this.props.savedSuccessfully && !this.props.show) {
        //     return null;
        // }
        
        const userObj = this.state.user;
        const buttonText = userObj ? "Update" : "Add";

        return (
            <div className="container-fluid">
            <div className="row col-md-12 detail-form" style={{padding:"0px"}}>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <div className="col-md-12">

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Name</Label><br />
                                <input type="text" name="name"
                                    placeholder={userObj === undefined ? "" : userObj.email}
                                    value={userObj.email}
                                    onChange={this.onChange}
                                    className="form-control" />
                                <span className="form-error is-visible">{this.state.errorText}</span>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Password</Label><br />
                                <input type="text" name="password"
                                    placeholder={userObj === undefined ? "" : userObj.password}
                                    value={userObj.password}
                                    onChange={this.onChange}
                                    className="form-control" />
                                <span className="form-error is-visible">{this.state.errorText}</span>
                            </div>
                        </div>
                        

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Email</Label><br />
                                <input type="text" name="email"
                                    placeholder={userObj === undefined ? "" : userObj.email}
                                    value={userObj.email}
                                    onChange={this.onChange}
                                    className="form-control" />
                                <span className="form-error is-visible">{this.state.errorText}</span>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Phone</Label><br />
                                <input type="text" name="phone"
                                    placeholder={userObj === undefined ? "" : userObj.phone}
                                    defaultValue={userObj.phone}
                                    onChange={this.onChange}
                                    className="form-control" />
                                <span className="form-error is-visible">{this.state.errorText}</span>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Applications</Label><br />
                                <select defaultValue={userObj ? userObj.userRoleId : "Select a role"} className="custom-select my-1 mr-sm-2" name="application" onChange={this.onChange}>
                                    {this.props.ApplicationsList.map(application => (<option key={application.applicationId} className="dropdown-item" value={application.applicationId}>{application.name}</option>))}
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Privilege</Label><br />
                                <select defaultValue={userObj ? userObj.userRoleId : "Select a role"} className="custom-select my-1 mr-sm-2" name="userRoles" onChange={this.onChange}>
                                    {this.props.PrivilegeList.map(privilege => (<option key={privilege.privilegeId} className="dropdown-item" value={privilege.privilegeId}>{privilege.name}</option>))}
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Institution</Label><br />
                                <select defaultValue={userObj ? userObj.institutionId : "Select a institution"} className="custom-select my-1 mr-sm-2" name="InstitutionId" onChange={this.onChange}>
                                    {this.props.InstitutionList.map(institution => (<option key={institution.institutionId} className="dropdown-item" value={institution.institutionId}>{institution.name}</option>))}
                                </select>
                            </div>
                        </div>


                    </div>
                </Form>
            </div>
            <div className="container-fluid">
                
                <div className="footerStyle"><div className="left-panel" style={{width:'330px'}}></div>
                    <button type="submit" style={{ float: 'left' }} onClick={(e)=> this.handleSubmit(e)}> Create </button>
                </div>
            </div>
            </div >
        )
    }
}


//connect redux
const mapStateToProps = (state) => {
    
    return {
        PrivilegeList       : [config.selectPrivilege,...state.UserStore.Privileges],
        ApplicationsList    : [config.selectApplication,...state.UserStore.Applications],
        InstitutionList     : [config.selectInstitution,...state.InstitutionStore.Institutions],
        savedSuccessfully   : state.UserStore.Loading
    }

}

const actionCreators = {

    getPriviledges  : UserAction.getPriviledges,
    getApplications : UserAction.getApplications,
    getInstitutions : InstitutionAction.getInstitutions,
    saveUser        : UserAction.saveUser
    
}

const connectUserDetail = connect(mapStateToProps, actionCreators)(UsersDetail);
export { connectUserDetail as UsersDetail };