import React, { Component } from 'react';
import logo from './image/bitmap.png'; // Tell webpack this JS file uses this image
import img1 from './image/5.jpg'; // Tell webpack this JS file uses this image
import leftarrow from './image/left-arrow.png'; // Tell webpack this JS file uses this image
import img3 from './image/3.jpg';
import img4 from './image/4.jpg';
import uparrow from './image/up-arrow.png';
import right from './image/right.png';
import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { isEmail } from 'validator';
import { Redirect } from 'react-router-dom';
import { Banner } from './Banner';
import Axios from 'axios';
import { Home } from './Home';


import { connect } from 'react-redux';
import { authenticate } from '../Action/LoginAction'


export class Login extends Component {

	constructor(props) {
		super(props);

		this.onChangeUserName = this.onChangeUserName.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);

		this.state = {
			
			username: '',
			password: '',
			userStatus: "LOGGED OUT",
			userId : ""
		}
	}

	onChangeUserName(e) {
		this.setState({
			username: e.target.value
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value
		});
	}


	handleSubmit= (event) => {
        event.preventDefault();
        console.log("in function")
		this.form.validateAll();

		let UserObject = {
			userName: this.state.username,
			password: this.state.password
		};

		console.log("b4 API", UserObject);

		Axios.post('https://localhost:5001/api/Accounts/Login', UserObject
		).then(result => {

			console.log("Login Success", result);
			const response = result.data;
			this.setState = ({ userStatus: "Logged IN", userId: response });
			if (response != "") {
				this.props.history.push("/Home");
			}
			else {
				alert("Invalid Credentials");
			}
				
		}).catch(Error => {

			this.setState({ userStatus: "Logged Out", userId: "" })

		})
		
		//this.LoginCall()
        // // Emulate async API call
        // setTimeout(() => {
        //     this.form.showError(this.userInput, <span>API error</span>);
        // }, 1000);
	}

	LoginCall() {

	
		
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
            <div className="main">
            <div className="container-custom">
	            <div className="row">
	                <div className="col-md-4">
	                    <div className="sign c1">
	                        <center><a href="/home"><img className="bitmap" alt="" src={logo}/></a></center>
	                        <center>
	                            <h3 className="signin"> Sign in</h3>
	                        </center>
	                        <center>
	                            <p className="account">with your Routes Account<a href="http://routesme.com/" rel="noopener noreferrer" target="_blank">Learn more</a> </p>
	                        </center>
	                        <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit}>
									<div className="form-group">
										<Input placeholder="Email" className="form-control email" type="email" value={this.state.username} onChange={this.onChangeUserName} name="email" validations={[required, email]} />
	                            </div>
									<div className="form-group">
										<Input type="password" className="form-control password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} name="password" validations={[required]} />
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
	                <div className="test">
	                    <hr/>
						</div>
				    <div className="col-md-8"><Banner/></div>
						
	            </div>
        </div> 
        
        
        </div>
        );
	}

	
}