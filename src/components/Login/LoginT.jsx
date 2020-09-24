import React, { Component } from 'react';

export class LoginsT extends Component
{
    constructor(props) {

        super(props);
        // First the Parent creates a state for what will be passed
        this.state = { userStatus: "NOT LOGGED IN" }
        this.setStatus = this.setStatus.bind(this);
    }


    // A method is provided for the child component to update the state of the userStatus
    //setStatus(username, password) {
    //    const newUsers = users;
    //    newUsers.map(user => {
    //        if (user.username == username && user.password === password) {  
    //            this.setState({
    //                userStatus: "LOGGED IN"
    //            })
    //        }
    //    });
    //}
}