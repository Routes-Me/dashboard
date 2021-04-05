import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as GApiAction from '../../../../Redux/Action';
import Detail from '../Detail/Detail';
import { userConstants } from '../../../../constants/userConstants';
// import { gapi } from 'gapi-script';
import {inLog, outLog} from '../../../../util/CustomLogging';

class List extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tabIndex:1,
            webtoken:'',
            listObj: []
        }
        this.GAPI = window.gapi;
    }

    async componentDidMount() {
        this.loadGapiScript();
    }

    loadGapiScript() {
        inLog('EMM',"Loading script!!");
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.onload = () => {
          outLog('EMM',"Script loaded!!!");
        this.authorize()
        .then(()=>this.loadClient()
        .then(() =>this.onTabClick(1)));
        

        // this.createTokenForFrame().then((webToken) => this.loadFrameWithToken(webToken)););
        };
        document.body.appendChild(script);
      }


      authorize = () => {

        inLog('EMM','Authorize Request')

        this.GAPI.load("client:auth2", function() {
            window.gapi.auth2.init({client_id: process.env.REACT_APP_GAPI_CLIENTID});
        });

        return window.gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/androidmanagement"})
        .then(function() { 
            outLog('EMM', 'Sign-in successful');
        },
        function(err) { 
            outLog('EMM',`Error signing in ${err}`); alert("Seems like authentication failed!!" + err.error.message);
        });
    }

    loadClient = () => {
        inLog('EMM','Loading Client....');
        return this.GAPI.client.load("https://androidmanagement.googleapis.com/$discovery/rest?version=v1")
            .then(function() { 
                outLog('EMM', 'GAPI client loaded for API');
            },
            function(err) { alert(`Client Load API ===> Google Server Response : ${err.error.message}`);  outLog('EMM', `Error loading GAPI client for API ${err}`); });
    }



    getDevices = () => {
    
        inLog('EMM',"Get Devices request");
        // return window.gapi.client.load("androidmanagement", "v1").then(() => {
            return this.GAPI.client.androidmanagement.enterprises.devices
            .list({
              parent: "enterprises/LC02my9vtl"
            })
            .then(
              function (response) {
                  return response.result.devices;
              },
              function (err) {
                alert(
                  `Devices API => Google Server Response : ${err.error.message}`
                );
                outLog("Execute error", err);
              }
            );
        // });
      };



    getPolicies = () => {
        inLog('EMM', 'Get Policies request');
        // let responseObj = '';
        return this.GAPI.client.androidmanagement.enterprises.policies
        .list({
            parent: 'enterprises/LC02my9vtl'
        })
        .then(
            function (response) {
                return response.result.policies;
            },
            function (err) {
                outLog('EMM Policies Request Error', err);
            }
        )
        // console.log('ResponseObj returned ', responseObj);
    }





    createTokenForFrame = () => {
        inLog('EMM', 'WebToken Request')
        return this.GAPI.client.androidmanagement.enterprises.webTokens.create({
            "parent": process.env.REACT_APP_GAPI_ENTERPRICE_ID,
            "resource": {
            "parentFrameUrl": "https://localhost:3000/home"
            }
        })
        .then(function(response) {
            // outLog('EMM',`WebToken Response Success ${response.result.value}`);
            return response.result.value;
        },
        function(err) { 
            outLog('EMM', `WebToken Error ${err}`);
        });
    }

    loadFrameWithToken = (webToken) => {
        outLog('EMM', `LoadDiv Called with Passedtoken ${webToken}`);
        // this.setState({webtoken :webToken});
        if(webToken !== undefined)
        {
            this.GAPI.load('gapi.iframes', function() {
                var options = {
                  'url': `https://play.google.com/managed/browse?token=${webToken}&mode=SELECT`,
                  'where': document.getElementById('container'),
                  'attributes': { style: 'width: 100%; height:800px', scrolling: 'yes'}
                }
                var iframe = window.gapi.iframes.getContext().openChild(options);
            });
        }
        
    }


    onTabClick = (index) => {
        inLog('EMM',  `Tab clicked for ${index}`)
        {index === 1 && this.getPolicies().then((response) => {this.setState({listObj:response}); console.log('Tab fn call ', response);}); 
        this.createTokenForFrame().then((webToken) => {this.setState({webtoken:webToken}); this.loadFrameWithToken(webToken);})}
        {index === 2 && this.getDevices().then((response)=> this.setState({listObj:response}))};

        this.setState({ tabIndex: index });
        // this.updateTheList(index);
    }

    showDetailScreen = (e, institution) => {
        e.preventDefault();
        this.setState({
            showDetails: !this.state.showDetails
        })
    }




    showList(list){
        console.log('EMM render', list)
        return (
            <div>
                <div className="table-list padding-lr-80">
                {this.state.tabIndex === 1 &&
                    <table id='list'>
                        <thead>
                            <tr>
                            <th>NAME</th>
                            <th>Mode</th>
                            <th>Package Name</th>
                            <th>Install Type</th>
                            </tr>
                        </thead>
                        <tbody>

                                {list?.map(policy => (
                                    <tr key={policy.name}>
                                    <td>{policy.version}</td>
                                    <td>{policy.name}</td>
                                    <td>{policy?.applications[0]?.packageName}</td>
                                    <td>{policy?.applications[0]?.installType}</td>
                                    </tr>
                                ))}

                        </tbody>
                    </table>}
                {this.state.tabIndex === 2 &&
                    <table id='list'>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Management Mode</th>
                            <th>Ownership</th>
                            <th>Status</th>
                            <th>Enrollment Time</th>
                            </tr>
                        </thead>
                        <tbody>
                        {list?.map(device => (
                            <tr key={device.name}>
                            <td>{device.name}</td>
                            <td>{device.managementMode}</td>
                            <td>{device.ownership}</td>
                            <td>{device.state}</td>
                            <td>{device.enrollmentTime?.substr(0, 10)}</td>
                            </tr>
                        ))}

                        </tbody>
                    </table>}
                {this.state.tabIndex === 3 &&
                    <div id="container"></div>
                    // <iframe src="https://play.google.com/managed/browse?token=WAP_6YqqodsIYbEM-ZFb7I5XbvB25qYJJsoUu072Z_n74NdBGyx5Hjbb6lX7M17YlV2ZQJLFixsK0rmvGiWtM4gkAVZmQPvSRS5WT_gLkKKqg2-UPOz4Eai87opy0nasSD6lzLqrxpEkXuyfI1PyyLQfeaHkcqVJBRQ&mode=SELECT" width="100%" height="450"></iframe>
                }
            </div>
            </div>
        )
    }


    render() {
        console.log('Render the list', this.state.listObj);
        let content = this.showList(this.state.listObj);
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
                                <a className={`nav-item nav-link ${tabIndex === 1 && "active"}`} id="nav-1" data-toggle="tab" onClick={(e) => this.onTabClick(1)} role="tab" aria-controls="nav-1" aria-selected="true">Policies </a>
                                <a className={`nav-item nav-link ${tabIndex === 2 && "active"}`} id="nav-2" data-toggle="tab" onClick={(e) => this.onTabClick(2)} role="tab" aria-controls="nav-2" aria-selected="false">Devices </a>
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
        List: state.UserStore.Policies,
        gApiClient: state.GApiStore.GApiClient,
        webToken: state.GApiStore.WebToken
    }
}

const actionCreators = {
    getAuthorization: GApiAction.authenticate,
    createWebTokenForiFrame: GApiAction.createWebToken,
    getDevices: GApiAction.getDevices,
    getPolicies: GApiAction.getPolicies
};

const connectedEMM = connect(mapStateToProps, actionCreators)(List);
export { connectedEMM as default };

