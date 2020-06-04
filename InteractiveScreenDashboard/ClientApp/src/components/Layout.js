import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        var hrfe = window.location.href;

        if (hrfe === "https://localhost:5001") {
            return <div><NavMenu />{this.props.children}</div>;
        } else {
            return <span className="homeheader">{this.props.children}</span>;
        }
    }
}