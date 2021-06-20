import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { isEmail } from 'validator';
import logo from '../../images/Routes_logo.svg'; 
import { connect } from 'react-redux';
import * as LoginAction from '../../Redux/Action';
import {clearStorage} from '../../util/localStorage'



class LoginForm extends Component{

	constructor(props) {

		super(props);

		clearStorage();
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
			isValid: false,
			inputType: 'password'
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

	isPasswordType = (text) => text === 'password' ? true : false

	togglePassword = (e) => {
		e.preventDefault();
		const type = this.isPasswordType(this.state.inputType) ? 'text' : 'password';
		this.setState({inputType: type });
	}



	handleSubmit = (event) => {

		event.preventDefault();

		const isValid = this.validateAll();
		if (isValid) {
			this.setState({ loading: true });
			this.props.login(this.state.username, this.state.password);
		}
		
	}


	

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

		return (

				<div className="loginForm">

					<div style={{textAlign:'center'}}>
					<img className="bitmap" alt="" src={logo} />
					</div>
					<div className='shadowBox'>
						<h3 className="signin"> Sign in</h3>
						<p className="account">with your Routes Account<a href="http://routesme.com/" rel="noopener noreferrer" target="_blank">Learn more</a> </p>

						<Form onSubmit={this.handleSubmit}>
								<Input placeholder="Email" className="form-control email" type="string" value={this.state.username} onChange={this.onChange} name="username" validations={[email]} />
								<span className="form-error is-visible">{this.state.usernameError}</span>


								<div className="input-group">
									<Input placeholder="Password" className="form-control password" type={this.state.inputType} value={this.state.password} onChange={this.onChange} name="password" validations={[required]} />
									<span className="form-error is-visible">{this.state.passwordError}</span>                                
									<div class="input-group-addon" onClick={e => {this.togglePassword(e)}}>
                                			<a><i className={this.isPasswordType(this.state.inputType) ? `fa fa-eye-slash`:`fa fa-eye`} aria-hidden="true"></i></a>
                                    </div>
                                </div>


							<div className="forgotpwd">
								<p style={{margin:'0px'}}><a href="/forgotpassword">Forgot Password?</a></p>
							</div>
							<button type="submit" className="buttonStyle">
								{this.props.loggingIn && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
								{this.props.loggingIn && <span>  Logging In...</span>}
								{!this.props.loggingIn && <span>Login</span>}
							</button>		
						</Form>

					</div>

				</div>
		);
	}
}

function mapState(state) {
	return {
		loggingIn: state.Login.loading
	};
}

const actionCreators = {
	login: LoginAction.userSignInRequestV1
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginForm);
export { connectedLoginPage as LoginForm };
