import React, { Component } from 'react'
import { connect } from 'react-redux'
import bg from '../../images/register-bg.svg';
import * as UserAction from '../../Redux/Action';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: "",
            recipientName : "",
            password: "",
            confirmPassword: ""
        };
    }

    componentDidMount() {
        const queryString = require('query-string');
        let invObj = queryString.parse(this.props.location.search);
        console.log('Params ',invObj);
        this.props.getInviteeInfo(invObj.inv, invObj.tk);
    }

    validateResetForm() {
        const { password, confirmPassword } = this.state;
        if (!password || !confirmPassword) {
            return false;
        }
        return password === confirmPassword;
    }


    static getDerivedStateFromProps(props, state) {
        if(props.Invitee !== undefined){
            return {
                email : props.address,
                recipientName : props.recipientName,
                // data : JSON.parse(atob(props.data))
            }
        }
    }


    handleSubmit = (event) => {

        this.setState({ loading: true });
        event.preventDefault();
        console.log("States:", this.state);

        const userInfo = JSON.parse(atob(this.props.data));

        const Invitee = {
            Email:this.state.email,
            PhoneNumber: this.state.data.Data,
            Password: this.state.password,
            Name: this.state.recipientName,
            Role: "manager",
            InstitutionId: this.state.data.InstitutionId
        }

        //if (this.form.validateAll()) {
        this.props.Reset_Password(Invitee);
        //}
    }

    render() {
        return (

            <div className="container-fluid h-100" style={{padding:'52px'}}>
                <div class="row align-items-center h-100">
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    <form className='col-lg-8 col-md-12 my-auto mx-auto needs-validation' onSubmit={this.handleSubmit}>
                        <h1 className='mb-5' style={{fontSize:'35px'}}>Welcome to Routes</h1>
                        <div className="form-group mb-4">
                        <label htmlFor="">Email</label><br/>
                            <input type="email" className="form-control" placeholder="Email" value={this.props.Invitee?.address} onChange={this.onChange} name="email" />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="">Name</label><br/>
                            <input type="text" className="form-control" placeholder="Name" value={this.props.Invitee?.recipientName} onChange={this.onChange} name="recipientName" />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="">Password</label>
                            <div className="input-group">
                                <input type="password" className="form-control" placeholder="New Password" value={this.state.password} onChange={this.onChange} name="password" />
                                <div class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="">Confirm Password</label><br/>
                            <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChange} name="confirmPassword" />
                        </div>
                        <button className="send" onClick={this.handleSubmit} disabled={!this.validateResetForm()}>
                        {/* {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                        {loading && <span>  Sending...</span>}
                        {!loading && <span>Send</span>} */}
                        <span>Send</span>
                        </button>
                    </form>
                </div>
                <div className="col-sm-6 d-none d-lg-block">
                <img className="img-fluid mx-auto d-block" alt="Responsive image" src={bg} />
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    Invitee : state.UserStore.Invitee
})

const mapDispatchToProps = {
    getInviteeInfo : UserAction.getInvitationInfo
}

const invitation = connect(mapStateToProps, mapDispatchToProps)(Registration)
export { invitation as default };
