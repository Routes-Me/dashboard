import React, { Component } from 'react';
import { Primary } from './Primary';
import { Secondary } from './Secondary';



export class Master extends Component {

    render() {
        return (
                <div className="left-panel" style={{ top: 0, }}>
                    <div className="relative">
                    <div className="scroll-hide">
                        <Primary/>
                    
                        <Secondary/>
                    </div>
                    </div>
                </div>
            
            );
    }
}