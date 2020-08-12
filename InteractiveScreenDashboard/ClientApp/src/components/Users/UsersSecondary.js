import React, { Component } from 'react';

export class UsersSecondary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Vehicles: []
        }
    }

    render() {

        return (
            <div className="search-main">
                <p>Select a User <br /> to display their <b>Permissions</b> </p>
            </div>
        );
    }

}