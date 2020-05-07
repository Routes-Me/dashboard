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


export class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
			username: '',
			password: '',
			userStatus: "NOT LOGGED IN"
			
		}
		//this.setStatus = this.setStatus.bind(this);
	}


	handleSubmit= (event) => {
        event.preventDefault();
        console.log("in function")
		this.form.validateAll();
		//this.LoginCall()
        // // Emulate async API call
        // setTimeout(() => {
        //     this.form.showError(this.userInput, <span>API error</span>);
        // }, 1000);
	};

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
										<Input placeholder="Email" className="form-control email" type="email" name="email" validations={[required, email]}  />
	                            </div>
									<div className="form-group">
										<Input type="password" className="form-control password" placeholder="Password" name="password" validations={[required]} />
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
	                <div className="col-md-8">
	                    <div className="box">
	                        <div className="box-row">
	                            <div className="images-text-part img-part">
	                                <img alt="" src={img1} className="imgsize responsive c3"/>
	                                <img className="left-arrow" alt="" src={leftarrow}/>
	                            </div>
	                            <div className="images-text-part text-part">
	                                <h5 className="allh5">ALL AROUND KUWAIT</h5>
	                                <p className="text1">A nationwide image for all types of advertisement campaigns all over Kuwait metropolises.</p>
	                            </div>
	                            <div className="images-text-part img-part">
	                                <img alt="" src={img3} className="imgsize responsive c6"/>
	                                <img className="up-arrow" src={uparrow} alt=""/>
	                            </div>
	                            <div className="images-text-part text-part">
	                                <h5 className="allh52">OUR TECHNOLOGY</h5>
	                                <p className="text3">Utilizing fully customizable 11.6” interactive touch screens with payment solutions, featuring<br/>smart applications to run your advertisement and enable the audience to interact with it.</p>
	                            </div>
	                            <div className="images-text-part img-part">
	                                <img src={img4} alt="" className="imgsize responsive c9"/>
	                                <img className="right-arrow" alt="" src={right}/>
	                            </div>
	                            <div className="images-text-part text-part">
	                                <h5 className="allh53">REVOLUTIONIZE PUBLIC TRANSPORTATION</h5>
	                                <p className="text2">We believe that public transportation advertising is one of the most efficient media in Marketing and Media.</p>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
        </div> 
        
        <div className="call">
        	Call support  +965 22020406
        </div>
        </div>
        );
    }
}