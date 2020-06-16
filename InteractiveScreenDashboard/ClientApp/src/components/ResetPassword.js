import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { connect } from 'react-redux';
import * as LoginAction from '../Redux/Action';

class ResetPassword extends Component {

    constructor(props) {

        super(props);

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateResetForm = this.validateResetForm.bind(this);

        this.state = {
            loading: false,
            email: "",
            password: "",
            confirmPassword: ""
        };
    }

    componentDidMount() {
        this.email = this.props.match.params.email;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.validateResetForm();
    }

    validateResetForm() {
        const { password, confirmPassword } = this.state;
        return password === confirmPassword;
    }


    handleSubmit = (event) => {

        this.setState({ loading: true });
        event.preventDefault();
        console.log("States:", this.state);

        let ResetPasswordObject = {
            Email: this.email,
            Password: this.state.password,
            ConfirmPassword: this.state.confirmPassword
        };

        //if (this.form.validateAll()) {
        this.props.Reset_Password(ResetPasswordObject);
        //}
    }


    render() {

        const { loading } = this.state;

        return (
            <div className="container">
                <br />
                <br/>
                <div className="forgot">

                    <h2>Having trouble signing in?</h2>

                    <p>Enter your new password</p>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="password" className="forgotpassword" id="Newpwd" placeholder="New Password" value={this.state.password} onChange={this.onChange} name="password" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="forgotpassword" id="Confirmpwd" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChange} name="confirmPassword" />
                        </div>
                    </form>
                    <button className="btn btn-primary form-control login" onClick={this.handleSubmit} disabled={!this.validateResetForm()}>
                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                        {loading && <span>  Sending...</span>}
                        {!loading && <span>Send</span>}
                    </button>
                    
                </div>

            </div>
        );
    }
}

function mapState(state) {
    const { resetPassword } = state;
    return { resetPassword };
}

const actionCreators = {
    Reset_Password: LoginAction.ResetPassword
};

const connectedResetPasswordPage = connect(mapState, actionCreators)(ResetPassword);
export { connectedResetPasswordPage as ResetPassword };