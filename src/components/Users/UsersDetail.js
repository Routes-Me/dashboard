import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as UserAction from '../../Redux/Action';
import * as InstitutionAction from '../../Redux/Action';
import Form from 'react-validation/build/form';
import { encryptAndEncode } from '../../util/encrypt';
import {config} from "../../constants/config";
import PageHandler from '../PageHandler';
import { returnObjectForSelectedId } from '../../util/basic';


class UsersDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            institutionId: "",
            email: "",
            roles: "",
            phone:"",
            user: '',
            privilege: '',
            application: '',
            errorText:"",
            password:"",
            institution: ''
        }
    }

    componentDidMount() {
        this.props.getPrivileges(1,config.DropDownLimit);
        this.props.getApplications(1,config.DropDownLimit);
        this.props.getInstitutions(1,config.DropDownLimit);
    }

    onChange = (event) => {
        if(event.target.name === 'institutionId')
        {
            this.setState({institution : returnObjectForSelectedId(this.props.InstitutionList.data, event.target.value), [event.target.name]: event.target.value})
        }
        this.setState({ [event.target.name]: event.target.value })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.userToDisplay !== undefined) {
            if (props.userToDisplay !== state.user) {
                return {
                    
                    user: props.userToDisplay,
                    id: props.userToDisplay.userId,
                    name: props.userToDisplay.name,
                    email: props.userToDisplay.email,
                    phone: props.userToDisplay.phone,
                    roles: props.userToDisplay.roles[0],
                    institutionId: props.userToDisplay.institution.institutionId,
                    institution : props.userToDisplay.institution
                }
            }
        }
    }

    //Submit button action 
    handleSubmit = (event) => {

        event.preventDefault();


        let action ='', user ='';

        {action =  this.state.user.userId? "save": "add"}

        if(action === 'save')
        {
            user = {
                userId       : this.state.id,
                Name         : this.state.name,
                Password     : encryptAndEncode(this.state.password) ,
                Email        : this.state.email,
                PhoneNumber  : this.state.phone,
                InstitutionId: this.state.institutionId,
                Roles:[
                    {
                        ApplicationId: this.state.application,
                        PrivilegeId: this.state.privilege
                    }
                ]                                                                                                                                                                                                                                                                                                             
            }
        }
        else
        {
            user = {
                Name         : this.state.name,
                Password     : encryptAndEncode(this.state.password) ,
                Email        : this.state.email,
                PhoneNumber  : this.state.phone,
                InstitutionId: this.state.institutionId,
                Roles:[
                    {
                        ApplicationId: this.state.application,
                        PrivilegeId: this.state.privilege
                    }
                ]                                                                                                                                                                                                                                                                                                             
            }
        }

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
            <div>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <div class="col-md-12" style={{padding:'0px'}}>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <Label>Name</Label><br />
                                <input type="text" name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    className="form-control" />
                                <span className="form-error is-visible">{this.state.errorText}</span>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <Label>Password</Label><br />
                                <input type="text" name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    className="form-control" />
                                <span className="form-error is-visible">{this.state.errorText}</span>
                            </div>
                        </div>
                        

                        <div className="row form-group">
                            <div className="col-md-6">
                                <Label>Email</Label><br />
                                <input type="text" name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    className="form-control" />
                                <span className="form-error is-visible">{this.state.errorText}</span>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <Label>Phone</Label><br />
                                <input type="text" name="phone"
                                    defaultValue={this.state.phone}
                                    onChange={this.onChange}
                                    className="form-control" />
                                <span className="form-error is-visible">{this.state.errorText}</span>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <Label>Applications</Label><br />
                                <select defaultValue={this.state.roles.applicationId} className="custom-select my-1 mr-sm-2" name="application" onChange={this.onChange}>
                                    {this.props.ApplicationsList.map(application => (<option key={application.id} className="dropdown-item" value={application.id}>{application.name}</option>))}
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <Label>Privilege</Label><br />
                                <select defaultValue={this.state.roles.privilegeId} className="custom-select my-1 mr-sm-2" name="privilege" onChange={this.onChange}>
                                    {this.props.PrivilegeList.map(privilege => (<option key={privilege.id} className="dropdown-item" value={privilege.id}>{privilege.name}</option>))}
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <Label>Institution</Label><br />
                                <input type="text" name="institution"
                                    value={this.state.institution ? this.state.institution.name : 'Please select a institution'}
                                    onChange={this.onChange}
                                    className="form-control" />
                                <select value={this.state.institutionId} className="custom-select" size='5' name="institutionId" onChange={this.onChange}>
                                    {this.props.InstitutionList.data?.map(institution => (<option key={institution.institutionId} className="dropdown-item" value={institution.institutionId}>{institution.name}</option>))}
                                </select>
                                <PageHandler page = {this.props.InstitutionList.page} getList={this.props.getInstitutions}/>
                            </div>
                        </div>

                    </div>
                

                    <div className="container-fluid">
                        <div className="footerStyle"><div className="left-panel" style={{width:'330px'}}></div>
                            <button type="submit" style={{ float: 'left' }} onClick={(e)=> this.handleSubmit(e)}> Create </button>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}


//connect redux
const mapStateToProps = (state) => {
    
    return {
        PrivilegeList       : [config.selectPrivilege,...state.UserStore.Privileges],
        ApplicationsList    : [config.selectApplication,...state.UserStore.Applications],
        InstitutionList     : state.InstitutionStore.Institutions,
        savedSuccessfully   : state.UserStore.Loading
    }

}

const actionCreators = {

    getPrivileges   : UserAction.getPrivileges,
    getApplications : UserAction.getApplications,
    getInstitutions : InstitutionAction.getInstitutions,
    saveUser        : UserAction.saveUser
    
}

const connectUserDetail = connect(mapStateToProps, actionCreators)(UsersDetail);
export { connectUserDetail as UsersDetail };