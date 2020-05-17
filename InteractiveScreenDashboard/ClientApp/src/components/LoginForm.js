/// <reference path="../redux/action/loginaction.js" />
import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { isEmail } from 'validator';
import logo from './image/bitmap.png'; // Tell webpack this JS file uses this image
import { connect } from 'react-redux';
import { LoginAction } from '../Redux/Action';


 class LoginForm extends Component{

	constructor(props) {

		super(props);

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {

			username: '',
			password: '',
			userStatus: "LOGGED OUT",
			userId: ""
		};
	}


	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}


	handleSubmit = (event) => {

		event.preventDefault();

		console.log("States:",this.state);

		

		let UserObject = {
			userName: this.state.username,
			password: this.state.password
		};

		console.log("the user object b4 API:", UserObject);


		if (this.form.validateAll()) {
			this.props.login(this.state.username, this.state.password);
		}
		

		//Axios.post('https://localhost:5001/api/Accounts/Login', UserObject
		//).then(result => {
		//	console.log("Login Success", result);
		//	const response = result.data;
		//	this.setState = ({ userStatus: "Logged IN", userId: response });
		//	if (response !== "") {
		//		this.props.history.push("/Home");
		//	}
		//	else {
		//		alert("Invalid Credentials");
		//	}
		//}).catch(Error => {
		//	this.setState({ userStatus: "Logged Out", userId: "" })
		//})

	}



	render() {

		const required = (value, props) => {
			if (!value || (props.isCheckable && !props.checked)) {
				return <span className="form-error is-visible">Required</span>;
			}
		};

		const email = (value) => {
			if (!isEmail(value)) {
				return <span className="form-error is-visible">${value} is not a valid email.</span>;
			}
		};

		return (

						<div className="col-md-12">
							<div className="sign c1">
								<center><a href="/home"><img className="bitmap" alt="" src={logo} /></a></center>
								<center>
									<h3 className="signin"> Sign in</h3>
								</center>
								<center>
									<p className="account">with your Routes Account<a href="http://routesme.com/" rel="noopener noreferrer" target="_blank">Learn more</a> </p>
								</center>
								<Form onSubmit={this.handleSubmit}>
									<div className="form-group">
									<Input placeholder="Email" className="form-control email" type="email" value={this.state.username} onChange={this.onChange} name="username" validations={[required, email]} />
									</div>
									<div className="form-group">
									<Input placeholder="Password" className="form-control password" type="password" value={this.state.password} onChange={this.onChange} name="password" validations={[required]} />
									</div>
									<div className="forgotpwd">
										<p><a href="/forgotpassword">Forgot Password?</a></p>
									</div>
									<div className="form-group">
										<Input type="submit" value="Login" className="btn btn-primary form-control login" />
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
	const { loggingIn } = state.Lo;
	return { loggingIn };
}

const actionCreators = {
	login: LoginAction.userSignInRequest
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginForm);
export { connectedLoginPage as LoginForm };
