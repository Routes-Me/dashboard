import React, { Component } from 'react';
import { Primary } from './Primary';
import { Secondary } from './Secondary';
//import { SplitPane } from "react-collapse-pane";



export class Master extends Component {

    render() {
        return (

            <div className="left-panel" style={{ top:0 }}>
                 <div className="relative">
                    <div className="scroll-hide">
                        {/*<SplitPane split="horizontal">*/}
                            <Primary />
                            <Secondary />
                        {/*</SplitPane>*/}
                    </div>
                </div>
            </div>
                
            
            );
    }
}