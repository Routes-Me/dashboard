import React, { Component } from 'react';

class AccessControl extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            name : '',
            tabIndex : 1
        }
    }
    
    componentDidMount(){
        
    }
    
    onTabClick = (index) => {
        this.setState({ tabIndex: index });
    }


    render() {
        return (
            <div>

                <div className="headerTabStyle">
                        <nav>
                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a className={`nav-item nav-link ${tabIndex === 1 && "active"}`}  id="nav-home-tab" data-toggle="tab" onClick={(e) => this.onTabClick(1)} role="tab" aria-controls="nav-home" aria-selected="true"> Privileges</a>
                                <a className={`nav-item nav-link ${tabIndex === 2 && "active"}`} id="nav-profile-tab" data-toggle="tab" onClick={(e) => this.onTabClick(2)} role="tab" aria-controls="nav-profile" aria-selected="false"> Applications</a>
                            </div>
                        </nav>
                </div>



            </div>
        );
    }
}

export default AccessControl;