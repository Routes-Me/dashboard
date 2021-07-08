import React from 'react';
import '../../../Style/home.css';
import '../Dialog/modal.scss';
import { vehicleConstants } from '../../../../constants/vehicleConstants';
import { config } from '../../../../constants/config';

class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            vehicleToDisplay: "",
            modelId: "",
            modelYear: "",
            deviceId: "",
            plateNumber: "",
            InstitutionId: "",
            ModelList: [],
            selectedModel: "",
            validationError: "",
            loading: false
        }

    }

    showSearchList = (searchList) => {
        if (searchList !== "") {
            return (
                <div className="searchList">
                    <table>
                        <tbody>
                            {
                                searchList.map(obj => (
                                    <tr key={obj.name} onClick={() => { this.onselection(obj) }}>
                                        <td>{obj.name}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    returnSearch = () => {
        return (
            <div className="search-part">
                <input type="text" name="search" placeholder="Search" className="search" />
                <i className="fa fa-search" aria-hidden="true" />
            </div>
        )
    }


    returnEnrollmentdetails = (token, policyName) => {
        return (
            <div className='col-md-12'>
                <div className='col-md-12' style={{ textAlign: 'center' }}>
                    <h2>{token}</h2> <i class="bi bi-clipboard"></i>
                    <hr />
                    <h3>Policy Name</h3>
                    <h5>{policyName}</h5>
                    <hr />
                </div>
                <div className='row col-md-12' style={{ padding: '3%' }}>
                    <h4>Provision a device</h4>
                    <p>Provisioning refers to the process of enrolling a device with an enterprise and applying the appropriate policies to the device. Before attempting to provision a device, ensure that the device is running Android 6.0 or above.
                        You need an enrollment token for each device that you want to provision (you can use the same token for multiple devices), when creating a token specify a policy that will be applied to the device.</p>
                    <ol>
                        <li>Turn on a new or factory-reset device.</li>
                        <li>Follow the setup wizard and enter your Wi-Fi details.</li>
                        <li>When prompted to sign in, enter afw#setup.</li>
                        <li>Tap Next, and then accept the installation of Android Device Policy.</li>
                        <li>Enter the generated enrollment token</li>
                    </ol>
                </div>
            </div>
        )
    }

    returnVehicles = (vehicles) => {
        return (
            <div className="searchList">
                <table>
                    <thead style={{ position: 'sticky', top: '200px', backgroundColor: 'white' }}>
                        <tr style={{ height: '51px' }}>
                            <th style={{ paddingLeft: '50px' }}>#</th>
                            <th>VEHICLE-ID</th>
                            <th>DEVICE-ID</th>
                            <th>INSTITUTION-ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vehicles.map((vehicle, index) => (
                                <tr key={vehicle.id}>
                                    <td style={{ paddingLeft: '50px' }}>{index}</td>
                                    <td>{vehicle.id}</td>
                                    <td>{vehicle.deviceId}</td>
                                    <td>{vehicle.institutionId}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>)
    }

    returnIdforObjectType = (object, objectType) => objectType === vehicleConstants.searchDialogFor_Makers ? object.manufacturerId : object.modelId;

    onselection(obj) {
        this.props.onSelect(obj);
    }

    render() {

        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fefefe',
            borderRadius: 5,
            maxWidth: 300,
            minHeight: 300,
            margin: '0 auto'
        };

        const verifyTitleForEMM = (title) => {
            return title !== 'Enrollment Token' && title !== 'Emm Console' && title !== config.sessionExpired;
        }

        const title = this.props.objectType;
        let content = verifyTitleForEMM(title) && this.showSearchList(this.props.objectList);

        //const VehicleObj = this.props.objectToDisplay;


        return (
            <div className="modalNew">
                <div className={`modal-content${title === 'Emm Console' ? ' wider' : ''}`}>

                    <div className="top-part-vehicles-search model-header">
                        <span className="closeBtn" style={{ float: "right", display: "block" }} onClick={this.props.onClose} />
                        <div className="header-add-butt">
                            <h3>{title}</h3>
                        </div>
                        <hr />
                        {verifyTitleForEMM(title) &&
                            this.returnSearch()}
                    </div>
                    {title === 'Enrollment Token' ?
                        this.returnEnrollmentdetails(this.props.objectList.value, this.props.objectList.policyName)
                        : title === 'Emm Console' ?
                            <iframe
                                src={`https://play.google.com/managed/browse?token=${this.props.objectList}&mode=SELECT`}
                                width="100%"
                                height="100%"
                                onLoad={this.hideSpinner}
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0" />
                            : title === config.onlineVehicles || config.offlineVehicles ?
                                this.returnVehicles(this.props.objectList)
                                : content}

                </div>
            </div>
        );
    }
}


export default Modal;
