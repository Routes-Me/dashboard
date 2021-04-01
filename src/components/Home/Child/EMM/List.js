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
        // inLog('EMM','ComponentDidMount');
        // this.authorize().then(this.loadClient());
        // await this.props.getAuthorization();
        // this.props.getPolicies();
        // this.props.createWebTokenForiFrame();
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
        .then(()=> this.createTokenForFrame()
        .then((webToken) => this.loadFrameWithToken(webToken)
        .then(() =>this.onTabClick(1)))));
        
        // this.createTokenForFrame().then((webToken) => this.loadFrameWithToken(webToken)););
        };
        document.body.appendChild(script);
      }


      authenticateJS() {
        inLog('EMM',"Authenticate Request");
        return window.gapi.auth2
          .getAuthInstance()
          .signIn({ scope: "https://www.googleapis.com/auth/androidmanagement" })
          .then(
            function () {
                outLog('EMM', 'Sign-in successful');
            },
            function (err) {
                outLog('EMM',`Error signing in ${err}`);
            }
          );
      }
      loadClientJS() {
        inLog('EMM','Load Client JS Request')
        window.gapi.client.setApiKey(process.env.REACT_APP_GAPI_APIKEY);
        return window.gapi.client
          .load("https://androidmanagement.googleapis.com/$discovery/rest?version=v1")
          .then(
            function () {
                outLog('EMM', "GAPI client loaded for API");
            },
            function (err) {
                outLog('EMM', `Error loading GAPI client for API ${err}`);
            }
          );
      }
      // Make sure the client is loaded and sign-in is complete before calling this method.
      executeJS() {
        return window.gapi.client.androidmanagement.enterprises.devices
          .list({
            parent: "enterprises/LC02my9vtl"
          })
          .then(
            function (response) {
              // Handle the results here (response.result has the parsed body).
              outLog('EMM', `Devices ${response}`);
            },
            function (err) {
                outLog('EMM', `Devices error ${err}`);
            }
          );
      }

      initGApi() {
        inLog('EMM','Init GApi request!!')
        window.gapi.load("client:auth2", () => {
            window.gapi.auth2.init({
              "apiKey": process.env.REACT_APP_GAPI_APIKEY,
              "client_id":process.env.REACT_APP_GAPI_CLIENTID,
              "scope": "https://www.googleapis.com/auth/androidmanagement",
              "discoveryDocs":"https://androidmanagement.googleapis.com/$discovery/rest?version=v1"
            });
            outLog('EMM',"GAPI inited!!!");
            this.authenticate().then(() => this.getDevices());
        });
      }


      authenticate() {
        inLog('EMM',"Authenticate Request")
        return window.gapi.auth2
          .getAuthInstance()
          .signIn({scope: "https://www.googleapis.com/auth/androidmanagement"})
          .then(() => 
            function () { outLog('EMM',"Sign-in successful");},
            function (err) { outLog('EMM',"Error signing in", err);}
          );
      }



    getDevices = () => {
    
        inLog('EMM',"Get Devices request");
        // return window.gapi.client.load("androidmanagement", "v1").then(() => {
        window.gapi.client.androidmanagement.enterprises.devices
            .list({
              parent: "enterprises/LC02my9vtl"
            })
            .then(
              function (response) {
                  const devicesList = response.result.devices;
                  console.log("Devices :", devicesList);
                  var list_Table =`<table>
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Mode</th>
                          <th>Enrollment Time</th>
                      </tr>
                  </thead>
                  <tbody>`
                  devicesList.forEach(device => {
                    list_Table+=
                        `<tr key=${device.name}>
                        <td>${device.name}</td>
                        <td>${device.managementMode}</td>
                        <td>${device.enrollmentTime}</td>
                        </tr>`
                        
                  });
                  list_Table+=`</tbody>
                  </table>`
                  document.getElementById("list").innerHTML = list_Table;
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
        window.gapi.client.androidmanagement.enterprises.policies
        .list({
            parent: 'enterprises/LC02my9vtl'
        })
        .then(
            function (response) {
                
                let policies = response.result.policies;
                console.log('Policies :', policies);
                var list_Table = `<table><thead>
                <tr>
                    <th>NAME</th>
                    <th>Mode</th>
                    <th>Package Name</th>
                    <th>Install Type</th>
                </tr>
            </thead>
            <tbody><tbody>`;
                policies.forEach( policy =>{
                    console.log('Each obj', policy);
                    list_Table +=
                    `<tr key=${policy.name}>
                    <td>${policy.version}</td>
                    <td>${policy.name}</td>
                    <td>${policy.applications[0].packageName}</td>
                    <td>${policy.applications[0].installType}</td>
                    </tr>`
                })
                list_Table += "<tbody></table>";
    
                document.getElementById("list").innerHTML = list_Table;
            },
            function (err) {
                outLog('EMM Policies Request Error', err);
            }
        )
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



    createTokenForFrame = () => {
        inLog('EMM', 'WebToken Request')
        return window.gapi.client.androidmanagement.enterprises.webTokens.create({
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
        // if(webToken !== undefined)
        // {
            window.gapi.load('gapi.iframes', function() {
                var options = {
                  'url': "https://play.google.com/managed/browse?token=WAP_6YqoW7EmejXBdvfp7uoe7sHdVnRSa0oO7j8m1mjEyMBMijJUmU4ybNpZB5nCpHitXwBR5mBUGCYqkzy5ZKoVyYpvzmAPrJDqfhevwbEeuU_oZMWEdse24rmz-EiMF7eQYLoMtOLyBoOZrrQDYe36OM6UKN6IRqw&mode=SELECT",
                  'where': document.getElementById('container'),
                  'attributes': { style: 'width: 100%; height:800px', scrolling: 'yes'}
                }
                var iframe = window.gapi.iframes.getContext().openChild(options);
            });
        // }
        
    }

    // getPolicies =() => {
    //     inLog('EMM', 'List policies Request')
    //     return gapi.client.androidmanagement.enterprises.policies.list({
    //       "parent": "enterprises/LC02my9vtl"
    //     })
    //     .then(function(response) {
    //           this.showList(response.result.policies);
    //           outLog('EMM',`Policies Response Success ${response}`);
    //     },
    //     function(err) { 
    //         outLog('EMM', `Google Server Response ${err.error.message}`); 
    //     });
    // }


    onTabClick = (index) => {
        inLog('EMM',  `Tab clicked for ${index}`)
        {index === 1 && this.getPolicies(); 
            this.createTokenForFrame().then((webToken) => this.loadFrameWithToken(webToken));}
        {index === 2 && this.getDevices()}
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
        inLog('EMM','showlist called to render!!')
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
                                    <td>{policy.applications[0].packageName}</td>
                                    <td>{policy.applications[0].installType}</td>
                                    </tr>
                                ))}

                        </tbody>
                    </table>}
                {this.state.tabIndex === 2 &&
                    <table id='list'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mode</th>
                                <th>Enrollment Time</th>
                            </tr>
                        </thead>
                        <tbody>
                        {list?.map(device => (
                            <tr key={device.name}>
                            <td>{device.name}</td>
                            <td>{device.managementMode}</td>
                            <td>{device.enrollmentTime}</td>
                            </tr>
                        ))}

                        </tbody>
                    </table>}
                {this.state.tabIndex === 3 &&
                    <div id="container" style="width: 100%; height: 200px;"></div>
                }
            </div>
            </div>
        )
    }


    render() {
        console.log('Render the list', this.state.policies);
        let content = this.showList(this.state.policies);
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
                    <div id="container" style="width: 100%; height: 200px;"></div>
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

