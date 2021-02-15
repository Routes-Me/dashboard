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
            policy: ""
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

        return (
            <div>
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