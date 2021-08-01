import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getCurrentDate } from '../../../../util/basic';
import * as AnalyticsAction from '../../../../Redux/Action/AnalyticsAction';
import { analyticsConstant } from '../../../../constants/analyticsConstants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { config } from '../../../../constants/config';
class Analytics extends Component {


    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            entity: config.analytics.qrScans
        }
    }

    componentDidMount() {
        // let strtDate = new Date("2020-12-20");
        let endDate = new Date();
        let strtDate = new Date();
        strtDate.setDate(endDate.getDate() - 21);
        this.setState({ startDate: strtDate, endDate: endDate });
        this.props.getAnalytics(this.state.entity, strtDate, endDate)
    }

    componentDidUpdate() {
        if (this.props.ApplicationState === analyticsConstant.getAdvertisement_SUCCESS) {

        }
    }

    setDateRange = (update) => {
        this.setState({ startDate: update[0], endDate: update[1] });
        if (update[1] !== null)
            this.setState({ startDate: update[0], endDate: update[1] });
        this.props.getAnalytics(this.state.entity, update[0], update[1]);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.getAnalytics(event.target.value, this.state.startDate, this.state.endDate);
    }


    render() {

        if (this.props.AdvertisementList.data) {
            this.state.entity === config.analytics.qrScans ? this.props.AdvertisementList.data.sort(function (a, b) {
                const aTotal = a.iOS + a.Android + a.web + a.Windows + a.Mac;
                const bTotal = b.iOS + b.Android + b.web + b.Windows + b.Mac;
                return bTotal - aTotal;
            }) : this.props.AdvertisementList.data.sort(function (a, b) {
                const aTotal = a.Morning + a.Noon + a.Evening + a.Night;
                const bTotal = b.Morning + b.Noon + b.Evening + b.Night;
                return bTotal - aTotal;
            })
        }


        this.props.AdvertisementList.data && console.table(this.props.AdvertisementList.data);

        return (
            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>
                <div>
                    <div className="top-part-vehicles-search padding-lr-80">
                        <div className="header-add-butt">
                            <h3>Analytics</h3>
                            {/* <div className="btn-group">
                                <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Action
                                </button>
                                <div className="dropdown-menu"> */}

                            {/* </div>
                            </div> */}
                            {/* <label style={{ float: 'right', fontSize: '14px', fontFamily: 'Roboto' }}>20-dec-2020 - {getCurrentDate()}</label> */}
                            <div style={{ float: 'right', display: "flex" }}>
                                <select value={this.state.entity} className="dateRange" name="entity" onChange={this.onChange}>
                                    <option key={0} className="dropdown-item" value={0}>Select an category</option>
                                    {config.analytics.category.map(select => (<option key={select.name} className="dropdown-item" value={select.name}>{select.name}</option>))}
                                </select>
                                <DatePicker
                                    className="dateRange"
                                    selectsRange={true}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onChange={(update) => { this.setDateRange(update); }}
                                    isClearable={true}
                                    monthsShown={2} />
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '5%', marginLeft: '20%' }}>
                        {this.props.AdvertisementList.data && <BarChart width={1000} height={900} data={this.props.AdvertisementList.data}
                            margin={{ top: 0, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {this.props.AdvertisementList.options.map(option => <Bar dataKey={option.name} stackId="a" fill={option.color} barSize={30} />)}
                        </BarChart>}
                        <br />
                        <br />
                        <div className="table-list padding-lr-80" style={{ width: '1000px' }}>
                            <table>
                                <thead>
                                    <tr style={{ height: '51px' }}>
                                        <th>NAME</th>
                                        <th>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.AdvertisementList.data && this.props.AdvertisementList.data.map(x => {
                                        const total = this.state.entity === config.analytics.qrScans ? x.iOS + x.Android + x.web + x.Windows + x.Mac : x.Morning + x.Noon + x.Evening + x.Night;

                                        return (
                                            <tr>
                                                <td>{x.name}</td>
                                                <td>{total}</td>
                                            </tr>
                                        )
                                    }
                                    )}
                                </tbody>
                            </table>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>)
    }

}


const mapStateToProps = (state) => {

    return {
        AdvertisementList: state.AnalyticsReducer.Advertisements,
        role: state.Login.role,
        user: state.Login.user
    }

}

const actionCreators = {
    getAnalytics: AnalyticsAction.getAnalyticsLinkLogs
};

const connectedAnalytics = connect(mapStateToProps, actionCreators)(Analytics);
export { connectedAnalytics as default };
