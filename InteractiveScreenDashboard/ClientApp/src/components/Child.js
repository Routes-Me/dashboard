import React, { Component } from 'react';
import GMap from './GMap';
export class Child extends Component {
    render() {
        return (

            <div className="right-part">
                <div className="mpas-tracking">
                    <GMap />
                </div>
            </div>

            );
    }
}