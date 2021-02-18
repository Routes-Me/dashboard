import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as GApiAction from '../../../../Redux/Action';
import Detail from '../Detail/Detail';
import { userConstants } from '../../../../constants/userConstants';

class List extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tabIndex:1
        }
    }

    async componentDidMount() {
        // await this.props.getUsersList();
    }

    onTabClick = (index) => {
        this.setState({ tabIndex: index });
        // this.updateTheList(index);
    }

    showDetailScreen = (e, institution) => {
        e.preventDefault();
        this.setState({
            showDetails: !this.state.showDetails
        })
    }

    showList(list) {
        return (
            <div>
                <div className="table-list padding-lr-80">
                {this.state.tabIndex === 1 &&
                    <table>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>Mode</th>
                                <th>Enrolled At</th>
                            </tr>
                        </thead>
                        <tbody>

                                {/* // list?.map(policy => (
                                //     <tr key={policy.name}>
                                //     <td>{policy.version}</td>
                                //     <td>{policy.name}</td>
                                //     <td>{policy.applications[0].packageName}</td>
                                //     <td>{policy.applications[0].installType}</td>
                                //     </tr>
                                    
                                // )) */}

                            <tr>
                                <td>123vceqd</td>
                                <td>Device</td>
                                <td>2020-12-22 20:28:43</td>
                            </tr>
                            <tr>
                                <td>123vceqd</td>
                                <td>Device</td>
                                <td>2020-12-22 20:28:43</td>
                            </tr>
                            <tr>
                                <td>123vceqd</td>
                                <td>Device</td>
                                <td>2020-12-22 20:28:43</td>
                            </tr>
                            <tr>
                                <td>123vceqd</td>
                                <td>Device</td>
                                <td>2020-12-22 20:28:43</td>
                            </tr>
                            
                        </tbody>
                    </table>}
                {this.state.tabIndex === 2 &&
                    <table>
                        <thead>
                            <tr>
                                <th>Version</th>
                                <th>Name</th>
                                <th>Package Name</th>
                                <th>Install Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                list?.map(policy => (
                                    <tr key={policy.name}>
                                    <td>{policy.version}</td>
                                    <td>{policy.name}</td>
                                    <td>{policy.applications[0].packageName}</td>
                                    <td>{policy.applications[0].installType}</td>
                                    </tr>
                                ))
                            } */}
                            <tr>
                                <td>V1</td>
                                <td>Pre Release</td>
                                <td>com.routesme.taxi</td>
                                <td>FORCE_INSTALLED</td>
                            </tr>
                            <tr>
                                <td>V2</td>
                                <td>Test Release</td>
                                <td>com.routesme.taxi</td>
                                <td>FORCE_INSTALLED</td>
                            </tr>
                            <tr>
                                <td>V4</td>
                                <td>Test V1</td>
                                <td>com.routesme.taxi</td>
                                <td>FORCE_INSTALLED</td>
                            </tr>
                            <tr>
                                <td>V5</td>
                                <td>Testing policy release</td>
                                <td>com.routesme.taxi</td>
                                <td>FORCE_INSTALLED</td>
                            </tr>
                        </tbody>
                    </table>}
            </div>
            </div>
        )
    }


    render() {
        let content = this.showList(this.props.List);
        const tabIndex = this.state.tabIndex; 
        const policyObj = {name : "policyTest", policy: "", EMMTab: tabIndex}
        return (
            
            <div>
                
                {this.state.showDetails ?
                    <Detail className={this.props.show ? 'slide-in' : 'slide-out'}
                        show={this.showDetailScreen}
                        objectType={userConstants.NavItem_EMM}
                        object= {policyObj}/> :
                        <div>
                        <div className="top-part-vehicles-search padding-lr-80">
                        <div className="header-add-butt">
                            <h3>EMM Console</h3>
                            {/* <button className='filter-btn'><image className='filter-icon'/> AUthorize</button> */}
                            {tabIndex===2 && <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><image className='filter-icon'/> Add</a>}
                        </div>
                        <div className="headerTabStyle" style={{maxWidth:'25%',marginTop:'13px'}}>
                        <nav>
                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a className={`nav-item nav-link ${tabIndex === 1 && "active"}`} id="nav-1" data-toggle="tab" onClick={(e) => this.onTabClick(1)} role="tab" aria-controls="nav-1" aria-selected="true"> Devices</a>
                                <a className={`nav-item nav-link ${tabIndex === 2 && "active"}`} id="nav-2" data-toggle="tab" onClick={(e) => this.onTabClick(2)} role="tab" aria-controls="nav-2" aria-selected="false"> Policies</a>
                                <a className={`nav-item nav-link ${tabIndex === 3 && "active"}`} id="nav-3" data-toggle="tab" onClick={(e) => this.onTabClick(3)} role="tab" aria-controls="nav-3" aria-selected="false"> Apps</a>
                            </div>
                        </nav>
                        </div>
                    </div>
                    {content}
                    </div>
                        }
                </div>
                
        );
    }
}

const mapStateToProps = (state) => {
    return {
        List: state.UserStore.Users
    }
}

const actionCreators = {
    getUsersList: GApiAction.authenticate
};

const connectedEMM = connect(mapStateToProps, actionCreators)(List);
export { connectedEMM as default };

