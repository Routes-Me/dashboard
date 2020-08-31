import React, { Component } from 'react';

import { Master } from './Master';
import { Child } from './Child';


export default class Home extends Component {
    static displayName = Home.name;
    //static defaultProps = {
    //    center: {
    //        lat: 23.2500,
    //        lng: 72.4833
    //    },
    //    zoom: 11
    //};

    render() {
        return (
            <div className="tracking-page fff">
                <Master/>
                <Child/>
            </div>

        );
    }
}

