import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as InstitutionAction from '../../Redux/Action';
import Form from 'react-validation/build/form';

class PolicyDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            policy: "",
            version: "",
            name: "",
            packageName: "",
            installtype:""
        }
    }

    componentDidMount() {
        // this.props.getServiceList(1,5);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    //Submit button action
    handleSubmit = (event) => {

        event.preventDefault();

    }

    render() {

        const samplePolicy =`{
    "name": string,
    "version": string,
    "applications": [
                      {
                        object (ApplicationPolicy)
                      }
                    ],
    "maximumTimeToLock": string,
    "screenCaptureDisabled": boolean,
    "cameraDisabled": boolean,
    "keyguardDisabledFeatures": [
                                  enum (KeyguardDisabledFeature)
                                ],
    "defaultPermissionPolicy": enum (PermissionPolicy),
    "persistentPreferredActivities": [
                                       {
                                         object (PersistentPreferredActivity)
                                       }
                                     ],
    "openNetworkConfiguration": {
                                  object
                                },
    "systemUpdate": {
                      object (SystemUpdate)
                    },
    "accountTypesWithManagementDisabled": [
                                            string
                                          ],
    "addUserDisabled": boolean,
    "adjustVolumeDisabled": boolean,
    "factoryResetDisabled": boolean,
    "installAppsDisabled": boolean,
    "mountPhysicalMediaDisabled": boolean,
    "modifyAccountsDisabled": boolean,
    "safeBootDisabled": boolean,
}`;

            const codeStyle = {
                backgroundColor: "#eee",
                display: "block",
                padding: "20px",
                width:"100%",
                height: "60vh"
              }

              const tabIndex = this.props.tab.EMMTab;

        return (
            <div>
                {tabIndex === 2 &&
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <div className="row form-group">
                                <div className="col-md-6">
                                    <h3>123vceqd</h3><br />
                                </div>
                        </div>
                        <pre>
                        <code style={codeStyle}>
                            {samplePolicy}
                        </code>
                        </pre>
                        <div className="container-fluid">
                                <div className="footerStyle">
                                    <button type="submit" style={{ float: 'left' }}> Update </button>
                                </div>
                        </div>
                    </Form>
                }
                {tabIndex === 1 &&
                    <Form onSubmit={e => this.handleSubmit(e)}>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <Label>Version</Label><br />
                            <input type="text" name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                className="form-control" />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-6">
                            <Label>Name</Label><br />
                            <input type="text" name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.onChange}
                                className="form-control" />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-6">
                            <Label>Package Name</Label><br />
                            <input type="text" name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.onChange}
                                className="form-control" />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-6">
                            <Label>Install Type</Label><br />
                            <input type="text" name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.onChange}
                                className="form-control" />
                        </div>
                    </div>
                    </Form>
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


const connectPolicyDetail = connect(mapStateToProps, null)(PolicyDetails);
export { connectPolicyDetail as PolicyDetails };