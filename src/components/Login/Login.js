import React, { Component } from 'react';
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

						<div className="col-sm-12 col-md-12">
							<LoginForm />
						</div>
						
					</div>

				</div> 
				<Footer/>

			</div>
        );
	}
	
}



