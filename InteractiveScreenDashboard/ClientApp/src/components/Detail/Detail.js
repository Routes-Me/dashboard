import React, { Component } from 'react';
import { DetailHeader } from '../Detail/DetailHeader';
import { DetailBody } from '..';

class Detail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            object: "",
            objectType: ""
        }
    }

    render() {
        <div className="padding-80">
            < DetailHeader />
            < DetailBody />
        </div>
    }
}