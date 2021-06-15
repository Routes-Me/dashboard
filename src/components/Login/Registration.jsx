import React, { Component } from 'react'
import { connect } from 'react-redux'
import bg from '../../images/register-bg.svg';
import * as UserAction from '../../Redux/Action';
import { encryptAndEncode } from '../../util/encrypt';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: "",
            recipientName : "",
            password: "",
            confirmPassword: "",
            invitationId :''
        };
    }

    componentDidMount() {
        const queryString = require('query-string');
        let invObj = queryString.parse(this.props.location.search);
        console.log('Params ',invObj);
        this.setState({ invitation : invObj });
        this.props.getInviteeInfo(invObj.inv, invObj.tk);
    }

    validateResetForm() {
        const { password, confirmPassword } = this.state;
        if (!password || !confirmPassword) {
            return false;
        }
        return password === confirmPassword;
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    static getDerivedStateFromProps(props, state) {
        if(props.Invitee !== undefined){
            return {
                email : props.Invitee.address,
                recipientName : props.Invitee.recipientName,
                // data : JSON.parse(atob(props.data))
            }
        }
    }


    handleSubmit = (event) => {

        this.setState({ loading: true });
        event.preventDefault();
        console.log("States:", this.state);

        const userInfo = JSON.parse(atob(this.props.Invitee.data));

        const Invitee = {
            email:this.state.email,
            password: encryptAndEncode(this.state.password),
            name: this.state.recipientName,
            institutionId: userInfo.InstitutionId,
            invitationId: this.state.invitation.inv
        }

        console.log('Invitee ',Invitee)
        // if (this.form.validateAll()) {
        this.props.register(Invitee,this.state.invitation.tk);
        // }
    }

    render() {
        return (

            <div className="container-fluid h-100" style={{padding:'52px'}}>
                <div class="row align-items-center h-100">
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    <form className='col-lg-8 col-md-12 my-auto mx-auto needs-validation' onSubmit={this.handleSubmit}>
                        <h1 className='mb-5' style={{fontSize:'35px'}}>Welcome to Routes</h1>
                        {/* <div className="form-group mb-4">
                        <label htmlFor="">Email</label><br/>
                            <input type="email" className="form-control" placeholder="Email" value={this.props.Invitee?.address} onChange={this.onChange} name="email" required/>
                        </div> */}

                        <div className="form-group mb-4">
                            <label for="validationCustomUsername">Email</label>
                            <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.onChange} name="email" aria-describedby="inputGroupPrepend" required/>
                            <div className="invalid-feedback">
                            Please choose a username.
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="">Name</label><br/>
                            <input type="text" className="form-control" placeholder="Name" value={this.state.recipientName} onChange={this.onChange} name="recipientName" required/>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="">Password</label>
                            <input type="password" className="form-control" placeholder="New Password" value={this.state.password} onChange={this.onChange} name="password" required/>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="">Confirm Password</label><br/>
                            <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChange} name="confirmPassword" required/>
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
    getInviteeInfo : UserAction.getInvitationInfo,
    register : UserAction.register
}

const invitation = connect(mapStateToProps, mapDispatchToProps)(Registration)
export { invitation as default };
