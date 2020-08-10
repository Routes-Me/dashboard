﻿import React, { Component } from 'react';
import DetailHeader from '../Detail/DetailHeader';
import DetailBody  from '../Detail/DetailBody';

export default class Detail extends Component {

    render() {

        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        return(
        <div className="padding-80">
                < DetailHeader objectType={this.props.objectType} object={this.props.object}/>
                < DetailBody objectType={this.props.objectType} object={this.props.object} />
            </div>
            )
    }
}