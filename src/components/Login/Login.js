import React, { Component } from 'react';
import { Banner } from './Banner';
import { LoginForm } from './LoginForm';
import {Footer} from './Footer';



export class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {

			username: '',
			password: '',
			userStatus: "LOGGED OUT",
			userId: ""
		};
	}

    render() {

		//const { userSignInRequest } = this.props;

		return (

			<div className="main">

				<div className="container-custom">

					<div className="row">

						<div className="col-sm-12 col-md-4">
							<LoginForm />
						</div>
						<div className="test">
							<hr />
						</div>
						<div className="col-md-8">
							<Banner />
						</div>
						
					</div>

				</div> 
				<Footer/>

			</div>
        );
	}
	
}



