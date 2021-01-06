import React, { Component } from 'react';
import { Master } from './Master';
import { Child } from './Child';
import '../components/Style/home.css';

export default class Home extends Component {

    render() {
        return (
            <div className="tracking-page">
                <Master/>
                <Child/>
            </div>
        );
    }
}

