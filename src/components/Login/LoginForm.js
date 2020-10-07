﻿import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { isEmail } from 'validator';
import logo from '../image/bitmap.png'; // Tell webpack this JS file uses this image
import { connect } from 'react-redux';
import * as LoginAction from '../../Redux/Action';




  class LoginForm extends Component{

	constructor(props) {

		super(props);


		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateAll = this.validateAll.bind(this);


		this.state = {
			loading: false,
			username: '',
			password: '',
			name : '',
			userId: '',
			usernameError: '',
			passwordError: '',
			isValid: false
		};
	}


	validateAll = () => {

		if (!this.state.username.length ===0) {
			this.setState({ usernameError: "Please enter your username!!"});
		}
		//else if (!isEmail(this.state.username)) {
		//	usernameError = "Invalid email!!";
		//}

		if (!this.state.password.length === 0) {
			this.setState({ passwordError:"Please enter your password!!" });
		}

		if (this.state.usernameError || this.state.passwordError) {
			return false;
		}

		return true;
	};

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		// this.validateAll();
	}



	handleSubmit = (event) => {

		event.preventDefault();

		const isValid = this.validateAll();
		if (isValid) {
			this.setState({ loading: true });
			this.props.login(this.state.username, this.state.password);
		}
		
	}

	  //static getDerivedStateFromProps(props, state) {
		 // //console.log('Users : getDerivedStateFromProps called with NewProps', props.vehicleToDisplay);
		 // if (props.institutionToDisplay !== undefined) {
			//  if (props.institutionToDisplay !== state.institutionToDisplay) {
			//	  return {
			//		  institution: props.institutionToDisplay,
			//		  id: props.institutionToDisplay.institutionId,
			//		  name: props.institutionToDisplay.name,
			//		  phoneNumber: props.institutionToDisplay.phoneNumber
			//	  }
			//  }
		 // }
	  //}
	

	render() {

		const required = (value, props) => {
			if ((!value) || (props.onSubmit && !props.checked)) {
				return <span className="form-error is-visible">Required</span>;
			}
		};

		const email = (value) => {
			if (!isEmail(value)) {
				return <span className="form-error is-visible">${value} is not a valid email.</span>;
			}
		};

		const { loading } = this.props.loggingIn;
		
		//const { handleSubmit, register } = useForm();
		//const onSubmit = values => console.log(values);
		return (

			<div className="col-md-12">
				<div className="sign c1">

					<center>
						<a href="/home"><img className="bitmap" alt="" src={logo} /></a>
					</center>
					<center>
						<h3 className="signin"> Sign in</h3>
					</center>
					<center>
						<p className="account">with your Routes Account<a href="http://routesme.com/" rel="noopener noreferrer" target="_blank">Learn more</a> </p>
					</center>

					<Form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<Input placeholder="Email" className="form-control email" type="string" value={this.state.username} onChange={this.onChange} name="username" validations={[required]} />
							<span className="form-error is-visible">{this.state.usernameError}</span>
						</div>
						<div className="form-group">
							<Input placeholder="Password" className="form-control password" type="password" value={this.state.password} onChange={this.onChange} name="password" validations={[required]} />
							<span className="form-error is-visible">{this.state.passwordError}</span>
						</div>
						<div className="forgotpwd">
							<p><a href="/forgotpassword">Forgot Password?</a></p>
						</div>
						<div className="form-group">
							<button type="submit" className="buttonStyle">
								{this.state.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
								{this.state.loading && <span>  Logging In...</span>}
								{!this.state.loading && <span>Login</span>}
							</button>		
						</div>			
					</Form>

				</div>
			</div>

		);
	}
}


//LoginForm.propTypes = {
//	userSignInRequest: React.PropTypes.func.isRequired
//}

function mapState(state) {
	return {
		loggingIn: state.Login.loading
	};
}

const actionCreators = {
	login: LoginAction.userSignInRequest
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginForm);
export { connectedLoginPage as LoginForm };