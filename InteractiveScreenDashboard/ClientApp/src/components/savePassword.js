import React, { Component } from 'react';

export class savePassword extends Component {

    render() {
        return (
            <div className="container">
        	 <div className="forgot">
            <h2>Having trouble signing in?</h2>

            <p>Enter your new password</p>
                        <form>
                                <div className="form-group group">
                                    <input type="email" className="forgotemail" id="email" placeholder="New Password" name="email"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="forgotpassword" id="pwd" placeholder="Confirm Password" name="pwd"/>
                                </div>
                         </form>

                <button className="btn btn-primary send" onClick={this.incrementCounter}>Send</button>
            </div>
            </div>
        )
    }
}