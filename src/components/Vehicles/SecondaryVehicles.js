import React, { Component } from 'react';

export class SecondaryVehicles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Vehicles: []
        }
    }

    render() {
        
        return (
            <div className="search-main">
                <p>Select a Vehicle <br /> to display <b>Driver info</b> related</p>
            </div>
        );
    }

}