import React, { Component } from 'react';

export class InstitutionsSecondary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Vehicles: []
        }
    }

    render() {

        return (
            <div className="search-main">
                <p>Select a Institution <br /> to display <b>Services</b> related</p>
            </div>
        );
    }

}