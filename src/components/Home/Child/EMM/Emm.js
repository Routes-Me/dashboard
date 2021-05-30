import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as GApiAction from '../../../../Redux/Action';
import Detail from '../Detail/Detail';
import {inLog, outLog} from '../../../../util/CustomLogging';
import Modal from '../Dialog/Modal';
import { GApiConstants } from '../../../../constants/GApiConstants';
import { gapi } from 'gapi-script';
import GapiRequest from '../../../../util/gapi';
import Launch from '../../../Launch';
const gapiObj = new GapiRequest();

class Emm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tabIndex:1,
            name:'',
            showModel: false,
            listObj: [],
            policyObj: '',
            view:'',
            mode:'',
            loading:true
        }

        // this.GAPI = window.gapi;
    }

    async componentDidMount() {
        this.loadGapiScript();
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
                gapiObj.getPolicies().then((response)=> {this.setState({listObj:response}); this.props.componentReloaded();});
            }
            if(this.state.tabIndex === 2){
                gapiObj.getDevices().then((response)=> {this.setState({listObj:response}); this.props.componentReloaded()});
            }
        }
    }

    loadGapiScript(){
        inLog('EMM',"Loading script!!");
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        
        document.head.appendChild(script); 
        
        script.onload = () => {
        outLog('EMM',"Script loaded!!!");
        gapiObj.authorize()
        .then(()=>gapiObj.loadClient()
        .then(() =>this.onTabClick(1)));
        };
        
    }


    deleteEntity = (e,name) => {
        e.preventDefault();

        if(this.state.tabIndex === 1)
        gapiObj.deletePolicy(name).then(()=>this.props.updateList());

        if(this.state.tabIndex === 2)
        gapiObj.deleteDevice(name).then(()=> this.props.updateList());


    }


    loadFrameWithToken = (webToken) => {
        outLog('EMM', `LoadDiv Called with Passedtoken ${webToken}`);
        // this.setState({webtoken :webToken});
        if(webToken !== undefined)
        {
            window.gapi.load('gapi.iframes', function() {
                var options = {
                  'url': `https://play.google.com/managed/browse?token=${webToken}&mode=SELECT`,
                  'where': document.getElementById('container'),
                  'attributes': { style: 'width: 98%; height:800px; border-radius: 11px; border: .5px solid; padding: 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);', scrolling: 'yes'}
                }
                var iframe = window.gapi.iframes.getContext().openChild(options);
            });
        }
        
    }

    showPolicyDetail = (e, policyName ) => {
        e.preventDefault();
        gapiObj.getPolicy(policyName).then(response => {this.setState({policyObj:response.result}); this.showDetailScreen(e,'Edit')})
    }

    showDeviceDetail = (e, device) => {
        e.preventDefault();
        this.setState({policyObj: device});
        this.showDetailScreen(e,'View');
    }


    onTabClick = (index) => {
        console.log('tab clicked to default')
        this.setState({showDetails:false, loading:true});
        {index === 1 && gapiObj.getPolicies().then((response) => {this.setState({listObj:response,loading:false});});}
        {index === 2 && gapiObj.getDevices().then((response)=> this.setState({listObj:response,loading:false}))};
        {index === 3 && gapiObj.getPolicies().then((response)=> {this.setState({listObj:response,loading:false})});
        gapiObj.createWebToken().then((webToken) => {this.setState({webtoken:webToken}); this.loadFrameWithToken(webToken);})}

        this.setState({ tabIndex: index });
    }

    showDetailScreen = (e, action) => {
        e.preventDefault();
            
        if(this.state.tabIndex === 2 && action === 'Add')
        {
            return gapiObj.getPolicies()
            .then(policyObj => 
                {this.setState({
                    policyObj : policyObj,
                    showDetails:!this.state.showDetails,
                    mode: action
                });
            console.log('Response from getPolicies', policyObj)});
        }
        this.setState({showDetails:!this.state.showDetails, mode: action});
    }

    toggleModal = () =>{
        this.setState({showModel : !this.state.showModel});
    }

    enlargeView = (view) => {
        view === 'frame' && gapiObj.createWebToken().then(token => {this.setState({webToken: token, showModel: !this.state.showModel, view: view})});
        view === 'application' && this.setState({ showModel: !this.state.showModel, view: view });
    }

    openSubMenu = (e, name) => {
        e.preventDefault();
        this.setState({ name: this.state.name === name? 0 : name });
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
                            <tr key={device.hardwareInfo?.serialNumber}>
                            <td>{device.hardwareInfo?.serialNumber}</td>
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
            {this.state.loading ? <Launch /> :
            <>
                <Modal
                    show={this.state.showModel}
                    onClose={this.toggleModal}
                    objectType={this.state.view === 'frame' ? 'Emm Console' : 'Applications'}
                    objectList={this.state.view === 'frame' ? this.state.webToken : this.state.listObj} 
                    onSelect={''} />

                {this.state.showDetails ?
                    <Detail className={this.state.showDetail ? 'slide-in' : 'slide-out'}
                        show={this.showDetailScreen}
                        objectType={tabIndex === 2 ? this.state.mode ==='Add'? 'Devices' : 'Enrollment Token': `Policy`}
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
            </>}

                </div>
                
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ApplicationState: state.GApiStore.Actionstate
    }
}

const actionCreators = {
    updateList : GApiAction.policyPatched,
    componentReloaded : GApiAction.listComponentUpdated
};

const connectedEMM = connect(mapStateToProps, actionCreators)(Emm);
export { connectedEMM as default };

