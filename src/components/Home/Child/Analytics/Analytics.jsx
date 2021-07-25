import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getCurrentDate } from '../../../../util/basic';
import * as AnalyticsAction from '../../../../Redux/Action/AnalyticsAction';
import { analyticsConstant } from '../../../../constants/analyticsConstants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class Analytics extends Component {


    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: ""
        }
    }

    componentDidMount() {
        // let strtDate = new Date("2020-12-20");
        let endDate = new Date();
        let strtDate = new Date();
        strtDate.setDate(endDate.getDate() - 21);
        this.setState({ startDate: strtDate, endDate: endDate });
        this.props.getAddAnalytics(strtDate, endDate)
    }

    componentDidUpdate() {
        if (this.props.ApplicationState === analyticsConstant.getAdvertisement_SUCCESS) {

        }
    }

    setDateRange = (update) => {
        this.setState({ startDate: update[0], endDate: update[1] });
        if (update[1] !== null)
            this.props.getAddAnalytics(update[0], update[1]);
    }


    render() {

        this.props.AdvertisementList.data && this.props.AdvertisementList.data.sort(function (a, b) {
            const aTotal = a.iOS + a.Android + a.web + a.Windows + a.Mac;
            const bTotal = b.iOS + b.Android + b.web + b.Windows + b.Mac;
            return bTotal - aTotal;
        })

        this.props.AdvertisementList.data && console.log('Render bar chart ', JSON.stringify(this.props.AdvertisementList.data));

        return (
            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>
                <div>
                    <div className="top-part-vehicles-search padding-lr-80">
                        <div className="header-add-butt">
                            <h3>Analytics</h3>
                            {/* <label style={{ float: 'right', fontSize: '14px', fontFamily: 'Roboto' }}>20-dec-2020 - {getCurrentDate()}</label> */}
                            <div style={{ float: 'right' }}>
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
                            <Bar dataKey="Android" stackId="a" fill="#a4c639" barSize={30} />
                            <Bar dataKey="iOS" stackId="a" fill="#a2aaad" barSize={30} />
                            <Bar dataKey='web' stackId='a' fill='#375a9b' barSize={30} />
                            <Bar dataKey='Windows' stackId='a' fill='#9b7837' barSize={30} />
                            <Bar dataKey='Mac' stackId='a' fill='#90a3c4' barSize={30} />
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
                                        const total = x.iOS + x.Android + x.web + x.Windows + x.Mac;

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
    getAddAnalytics: AnalyticsAction.getAnalyticsLinkLogs
};

const connectedAnalytics = connect(mapStateToProps, actionCreators)(Analytics);
export { connectedAnalytics as default };
