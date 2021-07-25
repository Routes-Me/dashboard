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
        this.data =
            [
                { name: 'Routes', iOS: 125, Android: 50, web: 13, Windows: 61, Mac: 20 },
                { name: 'Center Point', iOS: 32, Android: 32, web: 0, Windows: 20, Mac: 0 },
                { name: 'McDonalds', iOS: 38, Android: 24, web: 2, Windows: 18, Mac: 0 },
                { name: 'ooredoo', iOS: 30, Android: 13, web: 3, Windows: 10, Mac: 11 },
                { name: 'Zain', iOS: 27, Android: 19, web: 0, Windows: 12, Mac: 0 },
                { name: 'City Center', iOS: 28, Android: 9, web: 0, Windows: 14, Mac: 4 },
                { name: 'Dominos', iOS: 22, Android: 2, web: 2, Windows: 15, Mac: 0 },
                { name: 'Xcite', iOS: 14, Android: 8, web: 0, Windows: 10, Mac: 0 },
                { name: 'Best', iOS: 10, Android: 5, web: 0, Windows: 5, Mac: 0 },
                { name: 'Huawei', iOS: 9, Android: 2, web: 0, Windows: 5, Mac: 0 },
                { name: 'Turkish Grill', iOS: 19, Android: 5, web: 0, Windows: 5, Mac: 0 },
                { name: 'STC', iOS: 3, Android: 5, web: 0, Windows: 2, Mac: 0 },
                { name: 'Turkish Grill', iOS: 5, Android: 2, web: 0, Windows: 2, Mac: 0 },
                { name: 'Vaccination', iOS: 8, Android: 1, web: 0, Windows: 4, Mac: 0 },
                { name: 'I save', iOS: 3, Android: 0, web: 0, Windows: 0, Mac: 0 },
                { name: 'KFC', iOS: 1, Android: 0, web: 0, Windows: 0, Mac: 0 }
            ];
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
