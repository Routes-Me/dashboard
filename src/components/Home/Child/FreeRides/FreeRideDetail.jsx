import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-validation/build/form';
import { Label } from 'reactstrap';
import { QRCode } from "react-qr-svg";

class FreeRideDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            start: "",
            end: "",
            limit: "",
            fare: 0
        }
    }

    setDateRange = (update) => {
        this.setState({ start: update[0], end: update[1] });
    }

    render() {
        return (
            <div className="container-fluid">
                <Form>
                    <div className="row col-md-12 detail-form">
                        <div className="col-md-6">
                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Title</Label><br />
                                    <input type="text" name="title"
                                        value={this.state.title}
                                        onChange={this.onChange}
                                        className="form-control" />
                                </div>
                            </div><br />
                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Date Range</Label><br />
                                    <DatePicker
                                        className="dateRange"
                                        selectsRange={true}
                                        startDate={this.state.start}
                                        endDate={this.state.end}
                                        onChange={(update) => { this.setDateRange(update); }}
                                        isClearable={true}
                                        monthsShown={2} />
                                </div>
                            </div><br />
                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Limit</Label><br />
                                    <input type="text" name="limit"
                                        value={this.state.limit}
                                        onChange={this.onChange}
                                        className="form-control" />
                                </div>
                            </div><br />
                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Fare</Label><br />
                                    <input type="text" name="fare"
                                        value={this.state.fare}
                                        onChange={this.onChange}
                                        className="form-control" />
                                </div>
                            </div><br />
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <QRCode
                                bgColor="#FFFFFF"
                                fgColor="#000000"
                                level="Q"
                                style={{ width: 150, height: 150 }}
                                value="some text" />
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="footerStyle">
                            <button type="submit" style={{ float: 'left' }}> Save </button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default FreeRideDetail;