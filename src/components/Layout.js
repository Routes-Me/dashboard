import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        var hrfe = window.location.href;

        if (hrfe === "http://localhost:55205/forgotpassword") {
            return <div><NavMenu />{this.props.children}</div>;
        } else {
            return <span className="homeheader">{this.props.children}</span>;
        }
    }
}