import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as GApiAction from '../../../../Redux/Action';
import Form from 'react-validation/build/form';
import Modal from '../Dialog/Modal';
import ReactJson from 'react-json-view';

class PolicyDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            policy: {},
            expirationTime: "",
            showModel: false,
            enrollmentToken:'',
            duration:'',
            policyName: "",
            oneTimeUse:false
        }
    }

    componentDidMount() {
        // this.props.getServiceList(1,5);
    }

    onChange = (event) => {
            console.log('value changed in form', event.target.value);
            this.setState({ [event.target.name]: event.target.value});
    }

    onChangeRadioButton = (event) => {
        const check = event.target.value === 'on' ? true: false;
        this.setState({ oneTimeUse : check });
    }

    //Submit button action
    handleSubmit = (event) => {

        event.preventDefault();
        this.props.tab.EMMTab === 2 && this.createEnrollmentToken();

    }

    toggleModal = (e) =>{
        e.preventDefault();
        this.createEnrollmentToken()
        .then(token => {this.setState({enrollmentToken: token, showModel : !this.state.showModel})});
    }



    createEnrollmentToken = () =>{
        const durationInSec = this.state.duration * 3600;
        console.log('Policy Name', durationInSec);
        return window.gapi.client.androidmanagement.enterprises.enrollmentTokens.create({
            "parent": "enterprises/LC02my9vtl",
            "resource": {
                "policyName": this.state.policyName,
                "duration": `${durationInSec}s`
            }
        }).then(
        function (response) {
            console.log('EMM', `Enrollment Token ${response.result.value}`)
            return response.result;
        },
        function(err) { 
            console.log('EMM EnrollmentToken Error', err);
        })
    }

    patchPolicy = () =>{
        console.log('Policy to patch ', this.state.policy)
        this.requestGApiPatch().then(() => this.props.updatePolicyList());
    }

    requestGApiPatch =()  =>{
        return window.gapi.client.androidmanagement.enterprises.policies.patch({
            "name":this.state.policy.name,
            "resource": this.state.policy
        })
        .then(function (response) {
            console.log('Successfull Patch',response);
            return response.result;
        },
        function(err) { 
            console.log('EMM EnrollmentToken Error', err);
        })
    }

    static getDerivedStateFromProps(props, state)
    {
        console.log('getDerived')
        if(props.tab !== undefined)
        {
            if(props.tab.EMMTab === 1)
            {
                if(props.tab.mode ==='Edit')
                {
                    console.log('Props', props.tab.policy)
                    console.log('state', state.policy)
                    if(props.tab.policy.name !== state.policy.name)
                    {
                        console.log('State set!!')
                        return {
                            policy : props.tab.policy
                        }
                    }
                }
            }
            if(props.tab.EMMTab === 2)
            {
                if(props.tab.mode ==='View')
                {
                    return {
                        policy : props.tab.policy
                    }
                }
            }
        }
    }


    returnPolicy = (tabindex) => {
        if(tabindex === 1)
        {
            return this.props.tab.policy;
        }

        if(tabindex === 2)
        {
            console.log('Tab policy', this.props.tab.policy);
            if((this.props.tab.mode === 'Add') && (this.props.tab.policy))
            return [{name:'Please select a policy'},...this.props.tab.policy];

            return this.props.tab.policy;
        }
        return {};
    }


    static defaultProps = {
        theme: 'bright:inverted',
        src: null,
        collapsed: false,
        collapseStringsAfter: 15,
        onAdd: true,
        onEdit: true,
        onDelete: true,
        displayObjectSize: true,
        enableClipboard: true,
        indentWidth: 4,
        displayDataTypes: true,
        iconStyle: 'triangle'
    };

    render() {

            const tabIndex = this.props.tab.EMMTab;
            let policyObj = this.returnPolicy(tabIndex);

            const {
                src,
                collapseStringsAfter,
                onAdd,
                onEdit,
                onDelete,
                displayObjectSize,
                enableClipboard,
                theme,
                iconStyle,
                collapsed,
                indentWidth,
                displayDataTypes
            } = this.state;
            const style = {
                padding: '10px',
                borderRadius: '3px',
                margin: '10px 0px',
                height: '700px',
            };


        return (
            
            <div>
                <Modal
                    show={this.state.showModel}
                    onClose={this.toggleModal}
                    objectType={'Enrollment Token'}
                    objectList={this.state.enrollmentToken} 
                    onSelect={''} />
                {tabIndex === 1 &&
                    <Form onSubmit={e => this.handleSubmit(e)}>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <h2>{this.state.policy ? this.state.policy.name : 'New Police'}</h2>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-12">
                        <pre>

                            <ReactJson
                                name={false}
                                collapsed={collapsed}
                                style={style}
                                theme={theme}
                                src={this.state.policy} 
                                collapseStringsAfterLength={collapseStringsAfter}
                                onEdit={e => {
                                        console.log(e);
                                        this.setState({ policy: e.updated_src });
                                    }
                                }
                                onDelete={e => {
                                        console.log(e);
                                        this.setState({ policy: e.updated_src });
                                    }
                                }
                                onAdd={e => {
                                        console.log(e);
                                        this.setState({ policy: e.new_value });
                                    }
                                }
                                displayObjectSize={displayObjectSize}
                                enableClipboard={enableClipboard}
                                indentWidth={indentWidth}
                                displayDataTypes={displayDataTypes}
                                iconStyle={iconStyle}
                                />  

                        </pre>
                        </div>
                    </div>
                    <div className="container-fluid">
                            <div className="footerStyle">
                                <button type="submit" onClick={e => this.patchPolicy()} style={{ float: 'left' }}> Update </button>
                            </div>
                    </div>
                    </Form>
                }
                {tabIndex === 2 && this.props.tab.mode === 'Add' &&
                    <Form onSubmit={e => this.toggleModal(e)}>

                    <div className="row form-group">
                        <div className="col-md-6">
                            <Label>Policy</Label><br />
                            <select defaultValue={this.state.dayInterval} className="custom-select my-1 mr-sm-2" name="policyName" onChange={this.onChange}>
                                {policyObj.map(policy => (<option className="dropdown-item" value={policy.name}>{policy.name}</option>))}
                            </select>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-6">
                            <Label>Duration (in hours)</Label><br />
                            <input type="number" name="duration"
                            value={this.state.duration}
                            onChange={this.onChange}
                            className="form-control" />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-6">
                            <Label>One Time Use</Label>
                            <label className="radio-inline"><input type="radio" name="oneTimeUse" onChange={this.onChangeRadioButton} checked={this.state.oneTimeUse}/> Yes</label>
                            <label className="radio-inline"><input type="radio" name="oneTimeUse" onChange={this.onChangeRadioButton} checked={!this.state.oneTimeUse}/> No</label>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="footerStyle">
                            <button type="submit" style={{ float: 'left' }}> Generate </button>
                        </div>
                    </div>

                    </Form>
                }
                {tabIndex === 2 && this.props.tab.mode === 'View' &&
                <div>
                <div className="row form-group">
                        <div className="col-md-6">
                            <h2>{this.state.policy ? this.state.policy.name : 'New Police'}</h2>
                        </div>
                </div>
                <div className="row form-group">
                <div className="col-md-12">
                    <pre>
                        <ReactJson
                            name={false}
                            collapsed={collapsed}
                            style={style}
                            theme={theme}
                            src={this.state.policy} 
                            collapseStringsAfterLength={collapseStringsAfter}
                            displayObjectSize={displayObjectSize}
                            enableClipboard={enableClipboard}
                            indentWidth={indentWidth}
                            displayDataTypes={displayDataTypes}
                            iconStyle={'circle'}
                            />  
                    </pre>
                </div>
                </div>
                </div>
                }
            </div>
        )
    }
}


//connect redux
const mapStateToProps = (state) => {

    return {
    }

}


const actionCreators = {
    updatePolicyList : GApiAction.policyPatched
};


const connectPolicyDetail = connect(mapStateToProps, actionCreators)(PolicyDetails);
export { connectPolicyDetail as PolicyDetails };