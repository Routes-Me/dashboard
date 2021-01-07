import React, { Component } from 'react';
import { Primary } from './Primary';
import { Secondary } from './Secondary';
//import { SplitPane } from "react-collapse-pane";



export class Master extends Component {

    render() {
        return (

            <div className="left-panel">
                        {/*<SplitPane split="horizontal">*/}
                            <Primary />
                            <Secondary />
                        {/*</SplitPane>*/}
            </div>
                
            
            );
    }
}