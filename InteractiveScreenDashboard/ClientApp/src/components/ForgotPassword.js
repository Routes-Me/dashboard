import React, { Component } from 'react';
import Input from 'react-validation/build/input';
import { isEmail } from 'validator';
import { connect } from 'react-redux';
import * as LoginAction from '../Redux/Action';

 class ForgotPassword extends Component {
    

    constructor(props) {

        super(props);

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: ''
        };

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    handleSubmit = (event) => {

        event.preventDefault();
        console.log("States:", this.state);

        //if (this.form.validateAll()) {
        this.props.Forgot_Password(this.state.email);
        //}
    }

     render() {

         const required = (value, props) => {
             if (!value || props.isCheckable && !props.checked) {
                 return <span className="form-error is-visible">Required</span>;
             }
         };

         const email = (value) => {
             if (!isEmail(value)) {
                 return <span className="form-error is-visible">${value} is not a valid email.</span>;
             }
         };

        return (

            <div className="container">
                <br />
                <br />
                <div className="forgot">

                    <h2>Having trouble signing in?</h2>

                    <p>Enter your email and we will send instuctions to rest the password</p>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group group">
                            <input type="email" className="forgotemail" id="email" placeholder="Email" value={this.state.email} onChange={this.onChange} name="email" validations={[required, email]}/>
                        </div>
                    </form>

                    <div className="form-group">
                        <button className="send" disabled={email} onClick={this.handleSubmit}>Send</button>
                    </div>
                </div>

            </div>

        );

    }
}

function mapState(state) {
    const { forgotPassword } = state;
    return { forgotPassword };
}

const actionCreators = {
    Forgot_Password: LoginAction.forgotPassword
};

const connectedForgotPasswordPage = connect(mapState, actionCreators)(ForgotPassword);
export { connectedForgotPasswordPage as ForgotPassword };