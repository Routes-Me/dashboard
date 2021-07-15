import React from 'react';
import '../../../Style/home.css';
import '../Dialog/modal.scss';
import '../Detail/Detail.css';
import { vehicleConstants } from '../../../../constants/vehicleConstants';
import { config } from '../../../../constants/config';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertUnixTimeToDateTime, convertUnixTimeToHours } from '../../../../util/basic';
import { validate } from '../../../../util/basic';

class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            modelId: "",
            modelYear: "",
            startDate: "",
            endDate: "",
            title: "",
            list: []
        }

    }

    setDateRange = (update) => {
        this.setState({ startDate: update[0], endDate: update[1] });
    }


    static getDerivedStateFromProps(props, state) {
        if (props.objectType !== state.title) {
            if (props.objectType === config.offlineVehicles || props.objectType === config.onlineVehicles) {
                let strtDate = new Date();
                let edDate = new Date();
                strtDate.setDate(edDate.getDate() - 3);
                return {
                    title: props.objectType,
                    startDate: strtDate,
                    endDate: edDate
                }
            }
        }
    }


    componentDidUpdate(prevProps, prevState) {

        if (this.state.title !== prevState.title) {
            console.log('Title change ', prevState.title);
            let status = prevState.title === config.onlineVehicles ? config.OnlineLog : config.OfflineLog;
            this.props.onSelect(this.state.startDate, this.state.endDate, status);
        }
    }





    updateDateRange = (date, key, title) => {
        if (key === 'startDate') {
            if (this.state.startDate !== undefined) {
                this.setState({ startDate: date })
            }
        }
        if (key === 'endDate') {
            if (this.state.endDate !== undefined && this.state.startDate !== undefined && date > this.state.startDate) {
                this.setState({ endDate: date })
            }
        }
        if (this.compareDateTimeRange(this.state.startDate, this.state.endDate)) {
            let status = title === config.onlineVehicles ? config.OnlineLog : config.OfflineLog
            this.props.onSelect(this.state.startDate, date, status);
        }
    }

    compareDateTimeRange = (start, end) => {
        return start.getTime() < end.getTime();
    }

    showSearchList = (searchList) => {
        if (searchList !== "" && searchList !== undefined) {
            return (
                <div className="searchList">
                    <table>
                        <tbody>
                            {
                                searchList.map(obj => (
                                    <tr key={obj.name} onClick={() => { this.onselection(obj) }}>
                                        <td style={{ paddingLeft: "40px" }}>{obj.name}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    returnSearch = (title) => {
        return (
            <div className="search-part d-flex justify-content-between">
                <div style={{ padding: '0px' }}>
                    {/* <input type="text" name="search" placeholder="Search" className="search" />
                    <i className="fa fa-search" aria-hidden="true" /> */}
                </div>
                <div style={{ display: "flex" }}>
                    <DatePicker
                        className="dateFilter"
                        selected={this.state.startDate}
                        onChange={(date) => this.updateDateRange(date, 'startDate', title)}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeSelect
                        isClearable />
                    <DatePicker
                        className="dateFilter"
                        selected={this.state.endDate}
                        onChange={(date) => this.updateDateRange(date, 'endDate', title)}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeSelect
                        isClearable />
                </div>
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

    returniFrame = (token) => {
        return (
            <iframe
                src={`https://play.google.com/managed/browse?token=${token}&mode=SELECT`}
                width="100%"
                height="100%"
                onLoad={this.hideSpinner}
                frameBorder="0"
                marginHeight="0"
                marginWidth="0" />
        )
    }

    returnVehicles = (vehicles) => {
        console.log('Log Model ', vehicles);
        return (
            <div className="searchList">
                <table>
                    <thead style={{ position: 'sticky', top: '180px', backgroundColor: 'white' }}>
                        <tr style={{ height: '51px', borderBottom: "0.5px solid black" }}>
                            <th style={{ paddingLeft: '50px' }}>#</th>
                            <th>Plate Number</th>
                            <th>CHECKED-AT</th>
                            <th>TOTAL</th>
                            <th>INSTITUTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vehicles.data && vehicles.data.map((vehicle, index) => (
                                <tr key={vehicle.vehicleId}>
                                    <td style={{ paddingLeft: '50px' }}>{index + 1}</td>
                                    <td>{validate(vehicle.plateNumber)}</td>
                                    <td>{vehicle.days > 1 ? vehicle.days + ' days' : vehicle.days + ' day'}</td>
                                    <td>{convertUnixTimeToHours(vehicle.total)}</td>
                                    <td>{validate(vehicle.institutionName)}</td>
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

        let title = this.props.objectType;
        const verifyTitleForEMM = (title) => {
            return title !== 'Enrollment Token' && title !== 'Emm Console';
        }

        const returnSearchForVehicles = (title) => {
            return title === 'Manufacturers' || title === "Models";
        }

        const returnSearchForTracking = (title) => {
            return title === config.offlineVehicles || title === config.onlineVehicles;
        }


        return (
            <div className="modalNew">
                <div className={`modal-content${title === 'Emm Console' ? ' wider' : ''}`}>

                    <div className="top-part-vehicles-search model-header">
                        <span className="closeCrudBtn" style={{ float: "right", display: "block" }} onClick={this.props.onClose} />
                        <div className="header-add-butt">
                            <h3>{title} {this.props.objectList && `(${validate(this.props.objectList.total)})`}</h3>
                        </div>
                        <hr />
                        {returnSearchForTracking(title) &&
                            this.returnSearch(title)}
                    </div>
                    {title === 'Enrollment Token' ?
                        this.returnEnrollmentdetails(this.props.objectList.value, this.props.objectList.policyName)
                        : title === 'Emm Console' ?
                            this.returniFrame(this.props.objectList)
                            : title === config.onlineVehicles || title === config.offlineVehicles ?
                                this.props.objectList && this.returnVehicles(this.props.objectList)
                                : this.showSearchList(this.props.objectList)}

                </div>
            </div>
        );
    }
}


export default Modal;
