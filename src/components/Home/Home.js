import React, { Component } from 'react';
import { Master } from './Master/Master';
import { Child } from './Child/Child';
import '../../components/Style/home.css';

export default class Home extends Component {

    render() {
        return (
            <div className="homePage">
                <Master/>
                <Child/>
            </div>
        );
    }
}

