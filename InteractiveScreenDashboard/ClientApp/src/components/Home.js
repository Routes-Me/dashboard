import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
// import ic1 from './image/icon-1.png';

import GMap from './GMap';
import { Master } from './Master';
import { Child } from './Child';


export class Home extends Component {
    static displayName = Home.name;
    static defaultProps = {
        center: {
            lat: 23.2500,
            lng: 72.4833
        },
        zoom: 11
    };

    render() {
        return (
            <div className="tracking-page fff">
                <Master />
                <Child/>
            </div>

        );
    }
}