import React, { Component } from 'react';

import { Master } from './Master';
import { Child } from './Child';


export default class Home extends Component {

    render() {
        return (
            <div className="tracking-page fff">
                <Master/>
                <Child/>
            </div>

        );
    }
}

