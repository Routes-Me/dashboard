import React, { Component } from 'react';
import { Primary } from './Primary';
import { Secondary } from './Secondary';
import { SplitPane } from "react-collapse-pane";
import { nodeName } from 'jquery';



export class Master extends Component {

    // const resizerOptions: SplitPaneProps['resizerOptions'] = {
    //     css: {
    //       width: '1px',
    //       background: 'rgba(0, 0, 0, 0.1)',
    //     },
    //     hoverCss: {
    //       width: '10px',
    //       marginLeft: '-10px',
    //       backgroundImage:
    //         'radial-gradient(at center center,rgba(0,0,0,0.2) 0%,transparent 70%,transparent 100%)',
    //       backgroundSize: '50px 100%',
    //       backgroundPosition: '0 50%',
    //       backgroundRepeat: 'no-repeat',
    //       borderRight: '1px solid rgba(0, 0, 0, 0.1)',
    //     },
    //     grabberSize: '1rem',
    //   };

    render() {
        return (

            <div className="left-panel">
                        <SplitPane 
                            split="horizontal"
                            resizerOptions={{
                                css: {
                                    width: '100%',
                                    height:'1px',
                                    background: 'black',
                                },
                                hoverCss: {
                                    width: '100%',
                                    height: '1px',
                                    background: '1px solid black',
                                },
                                grabberSize: '1rem',
                            }}
                            collapseOptions={{
                                beforeToggleButton:<button style={{backgroundColor:'#0b0b0b', width:'32.6px', height:'2.7px', borderRadius:'2px', border:'none', marginTop:'4px'}}/>,
                                afterToggleButton:<button  style={{backgroundColor:'#0b0b0b', width:'32.6px', height:'2.7px', borderRadius:'2px', border:'none', marginTop:'4px'}}/>,
                                buttonTransition:'none',
                                overlayCss: { backgroundColor: 'rgb(0, 0, 0, 0.1)' },
                                collapseDirection:'down',
                                timeout: 300,
                                transition: 'none',
                                collapseSize: 390,
                                buttonPositionOffset:'4px'
                            }}>
                            <Primary />
                            <Secondary />
                        </SplitPane>
            </div>
                
            
            );
    }
}