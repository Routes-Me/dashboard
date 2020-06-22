import React, { Component } from 'react';
import GMap from './GMap';
import { Tracking } from './Tracking';
export class Child extends Component {
    render() {
        return (

            <div className="right-part">
                <div className="mpas-tracking">
                    {/*<GMap />*/}
                    <Tracking />
                </div>
            </div>

            );
    }
}