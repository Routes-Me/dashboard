import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as GApiAction from '../../../../Redux/Action';
import Detail from '../Detail/Detail';
import { userConstants } from '../../../../constants/userConstants';
// import { gapi } from 'gapi-script';
import {inLog, outLog} from '../../../../util/CustomLogging';
import Modal from '../Dialog/Modal';
import { GApiConstants } from '../../../../constants/GApiConstants';
import { getPolicies } from '../../../../Redux/Action';

class List extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tabIndex:1,
            enrollmentToken:'',
            name:'',
            showModel: false,
            listObj: [],
            policyObj: '',
            view:'',
            mode:''
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
            outLog('EMM', 'Authorized!!');
        },
        function(err) { 
            outLog('EMM',`Authorization Error: ${err}`); alert("Seems like authentication failed!!" + err.error.message);
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


    deleteEntity = (e,name) => {

        e.preventDefault();

        if(this.state.tabIndex === 1)
        this.deletePolicy(name).then(()=>this.props.updateList());

        if(this.state.tabIndex === 2)
        this.deleteDevice(name).then(()=> this.props.updateList());


    }

    deletePolicy = (name) => {
        return this.GAPI.client.androidmanagement.enterprises.policies
        .delete({
            "name":name
        })
        .then(function(response) {
            console.log('Response ', response);
        },
        function (error) {
            console.log('Error ', error);
        });
    }

    deleteDevice = (name) => {
        return this.GAPI.client.androidmanagement.enterprises.devices
            .delete({
                "name":name
            })
            .then(function(response) {
                console.log('Response ', response);
            },
            function (error) {
                console.log('Error ', error);
            })
    }

    createEnrollmentToken = () =>{
        return this.GAPI.client.androidmanagement.enterprises.enrollmentTokens.create({
            "parent": "enterprises/LC02my9vtl",
            "resource": {
              "policyName": "enterprises/LC02my9vtl/policies/policyTest"
            }
          })
          .then(function (response) {
              return response.result
          },
          function(err) { 
              outLog('EMM', `EnrollmentToken Error ${err}`);
          })
    }


    createWebToken = () => {
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
                  'attributes': { style: 'width: 98%; height:800px; border-radius: 11px; border: .5px solid; padding: 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);', scrolling: 'yes'}
                }
                var iframe = window.gapi.iframes.getContext().openChild(options);
            });
        }
        
    }

    getPolicy = (policyName) => {
        return this.GAPI.client.androidmanagement.enterprises.policies.get({
            "name": policyName
        })
        .then(function (response) {
            return response;
        },
        function(err) { 
            outLog('EMM', `EnrollmentToken Error ${err}`);
        })
    }

    showPolicyDetail = (e, policyName ) => {
        e.preventDefault();
        this.getPolicy(policyName).then(response => {this.setState({policyObj:response.result}); this.showDetailScreen(e,'Edit')})
    }

    showDeviceDetail = (e, device) => {
        e.preventDefault();
        this.setState({policyObj: device});
        this.showDetailScreen(e,'View');
    }


    onTabClick = (index) => {
        this.setState({showDetails:false});
        {index === 1 && this.getPolicies().then((response) => {this.setState({listObj:response}); console.log('Tab fn call ', response);}); 
        this.createWebToken().then((webToken) => {this.setState({webtoken:webToken}); this.loadFrameWithToken(webToken);})}
        {index === 2 && this.getDevices().then((response)=> this.setState({listObj:response}))};
        {index === 3 && this.getPolicies().then((response)=> {this.setState({listObj:response})})}

        this.setState({ tabIndex: index });
        // this.updateTheList(index);
    }

    showDetailScreen = (e, action) => {
        e.preventDefault();
            
        if(this.state.tabIndex === 2 && action === 'Add')
        {
            this.getPolicies()
            .then(policyObj => 
                this.setState({
                    policyObj : policyObj
                }));
        }
        this.setState({showDetails:!this.state.showDetails, mode: action});
    }
        

    toggleModal = () =>{
        this.setState({showModel : !this.state.showModel});
    }

    enlargeView = (view) => {
        view === 'frame' && this.createWebToken().then(token => {this.setState({webToken: token, showModel: !this.state.showModel, view: view})});
        view === 'application' && this.setState({ showModel: !this.state.showModel, view: view });
    }

    openSubMenu = (e, name) => {
        e.preventDefault();
        this.setState({ name: this.state.name === name? 0 : name });
    }


    static getDerivedStateFromProps = (props, state) =>{
        
        if(props.ApplicationState === GApiConstants.updatePolicyList)
        {
            console.log('Initiate close details');
            if(state.showDetails){
                return {showDetails : false};
            }
        }
    }

    componentDidUpdate(){
        if(this.props.ApplicationState === GApiConstants.updatePolicyList)
        {
            if(this.state.tabIndex === 1)
            {
                inLog('EMM','UpdateList');
                this.getPolicies().then((response)=> {this.setState({listObj:response}); this.props.componentReloaded();});
            }
            if(this.state.tabIndex === 2){
                this.getDevices().then((response)=> {this.setState({listObj:response}); this.props.componentReloaded()});
            }
        }
    }
    showDialogForObject = (obj) =>{
        return(
            <Modal
            show={this.state.showModel}
            onClose={this.toggleModal}
            objectType={'Emm Console'}
            objectList={obj} 
            onSelect={''} />
        );
    }


    showList(list){
        console.log('EMM render', list)
        return (
                <div className="table-list padding-lr-80">
                {this.state.tabIndex === 1 &&
                    <table id='list'>
                        <thead>
                            <tr>
                            <th>Version</th>
                            <th>Name</th>
                            <th>Package Name</th>
                            <th>Install Type</th>
                            <th className="width20"/>
                            </tr>
                        </thead>
                        <tbody>

                            {list?.map(policy => (
                                <tr key={policy.name}>
                                <td>{policy.version}</td>
                                <td>{policy.name}</td>
                                <td>{policy.applications && policy.applications[0].packageName}</td>
                                <td>{policy.applications && policy.applications[0].installType}</td>
                                <td className="width20" onClick={e => this.openSubMenu(e,policy.name)}>
                                    <div className="edit-popup">
                                        <div className="edit-delet-butt" onClick={e => this.openSubMenu(e, policy.name)}>
                                            <span />
                                            <span />
                                            <span />
                                        </div>
                                        <ul className="edit-delet-link" style={{ display: this.state.name === policy.name ? 'inline-block' : 'none' }}>
                                            <li><a onClick={(e) => this.showPolicyDetail(e, policy.name)}>Edit</a></li>
                                            <li><a onClick={e => this.deleteEntity(e, policy.name)}>Delete</a></li>
                                        </ul>
                                    </div>
                                </td>
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
                            <th className="width20"/>
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
                            <td className="width20" onClick={e => this.openSubMenu(e,device.name)}>
                                    <div className="edit-popup">
                                        <div className="edit-delet-butt" onClick={e => this.openSubMenu(e, device.name)}>
                                            <span />
                                            <span />
                                            <span />
                                        </div>
                                        <ul className="edit-delet-link" style={{ display: this.state.name === device.name ? 'inline-block' : 'none' }}>
                                            <li><a onClick={e => this.showDeviceDetail(e, device)}>Device Info</a></li>
                                            <li><a onClick={e => this.deleteEntity(e, device.name)}>Delete</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>}
                {this.state.tabIndex === 3 &&
                    <div className='row'>
                    <div className='col-md-7'><div id="container"></div><image className='expand-icon' onClick={e=> {this.enlargeView('frame')}} style={{right:'5%', bottom:'4%'}}/></div>
                    <div className='col-md-5 shadow-lg p-3 mb-8 rounded table-list applications'>
                    <image className='expand-icon' onClick={e=> {this.enlargeView('application')}}/>
                    <table id='list'>
                        <h4> Application </h4>
                        <tbody>

                            {list?.map(policy => (
                                <tr key={policy.name}>
                                <td>{policy.applications && policy.applications[0].packageName}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    </div>
                    </div>
                }
            </div>
        )
    }


    render() {

        console.log('Render the list', this.state.listObj);
        let content = this.showList(this.state.listObj);
        const tabIndex = this.state.tabIndex; 
        const policyObj = {policy: this.state.policyObj, EMMTab: tabIndex, mode: this.state.mode}

        return (
            
            <div>
            <Modal
                show={this.state.showModel}
                onClose={this.toggleModal}
                objectType={this.state.view === 'frame' ? 'Emm Console' : 'Applications'}
                objectList={this.state.view === 'frame' ? this.state.webToken : this.state.listObj} 
                onSelect={''} />

                {this.state.showDetails ?
                    <Detail className={this.props.show ? 'slide-in' : 'slide-out'}
                        show={this.showDetailScreen}
                        objectType={tabIndex === 2 ? 'Enrollment Token': `Policy`}
                        object= {policyObj}/> :
                        <div>
                        <div className="top-part-vehicles-search padding-lr-80">
                        <div className="header-add-butt">
                            <h3>EMM Console</h3>
                            {tabIndex===2 && <button className='filter-btn' onClick={e => this.showDetailScreen(e,'Add')}> Add Device</button> }
                            {tabIndex===1 && <button className='filter-btn' onClick={e => this.showDetailScreen(e,'Aad')}> Add Policy</button>}
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
        webToken: state.GApiStore.WebToken,
        ApplicationState: state.GApiStore.Actionstate
    }
}

const actionCreators = {
    getAuthorization: GApiAction.authenticate,
    createWebTokenForiFrame: GApiAction.createWebToken,
    getDevices: GApiAction.getDevices,
    getPolicies: GApiAction.getPolicies,
    updateList : GApiAction.policyPatched,
    componentReloaded : GApiAction.listComponentUpdated
};

const connectedEMM = connect(mapStateToProps, actionCreators)(List);
export { connectedEMM as default };

