import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as UserAction from '../../Redux/Action';
import * as InstitutionAction from '../../Redux/Action';
import Form from 'react-validation/build/form';

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
            userRoles: [],
            user: "",
            application:[]
        }
    }

    componentDidMount() {
        this.props.getUserRoles();
        this.props.getApplications();
        this.props.getInstitutions();
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    static getDerivedStateFromProps(props, state) {
        console.log('Users : getDerivedStateFromProps called with NewProps', props.vehicleToDisplay);
        if (props.userToDisplay !== undefined) {
            if (props.userToDisplay !== state.userToDisplay) {
                return {
                    user: props.userToDisplay,
                    id: props.userToDisplay.userId,
                    name: props.userToDisplay.name,
                    email: props.userToDisplay.email,
                    phone: props.userToDisplay.phone,
                    application: props.userToDisplay.application
                }
            }
        }
    }

    //Submit button action 
    handleSubmit = (event) => {

        event.preventDefault();

        const vehicle = {
            Email: this.state.email,
            Phone: this.state.phone,
            application: this.state.application,
            name: this.state.name
        }

        this.props.saveUser(vehicle);
    }

    render() {
        const userObj = this.state.user;
        const buttonText = userObj ? "Update" : "Add";

        return (
            <div className="row col-md-12 detail-form">
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <div class="col-md-10">


                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Name</Label><br />
                                <input type="text" name="email"
                                    placeholder={userObj === undefined ? "" : userObj.email}
                                    value={userObj.email}
                                    onChange={this.onChange}
                                    className="form-control" />
                            </div>
                        </div>
                        

                        <div className="row form-group">
                            {/*VehicleObj.model.id*/}
                            <div className="col-md-4">
                                <Label>Role</Label><br />
                                <select defaultValue={userObj ? userObj.userRoleId : "Select a role"} className="custom-select my-1 mr-sm-2" name="modelId" onChange={this.onChange}>
                                    {this.props.UserRoles.map(role => (<option className="dropdown-item" value={role.userRoleId}>{role.name}</option>))}
                                </select>
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
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Applications</Label><br />
                                <select multiple="multiple" class="custom-select" size="3" defaultValue={userObj.application}>
                                    {this.props.applicationsList.map(application => (<option value={application.id}>{application.name}</option>))}
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            {/*VehicleObj.model.id*/}
                            <div className="col-md-4">
                                <Label>Institution</Label><br />
                                <select defaultValue={userObj ? userObj.institutionId : "Select a model"} className="custom-select my-1 mr-sm-2" name="modelId" onChange={this.onChange}>
                                    {this.props.InstitutionList.map(institution => (<option className="dropdown-item" value={institution.institutionId}>{institution.name}</option>))}
                                </select>
                            </div>
                        </div>



                        <br /><br />

                        <div className="align-self-end ml-auto" style={{ textAlign: "end" }}><button type="submit" className="btn btn-primary"> {buttonText} </button></div>

                    </div>
                </Form>
            </div>
        )
    }
}


//connect redux
const mapStateToProps = (state) => {

    const roles = state.UserStore.UserRoles;

    return {
        UserRoles: roles,
        applicationsList: state.UserStore.Applications,
        InstitutionList: state.InstitutionStore.Institutions
    }

}

const actionCreators = {

    getUserRoles: UserAction.getUserRoles,
    getApplications: UserAction.getApplications,
    getInstitutions: InstitutionAction.getInstitutions,
    saveUser: UserAction.saveUser
    
}

const connectUserDetail = connect(mapStateToProps, actionCreators)(UsersDetail);
export { connectUserDetail as UsersDetail };