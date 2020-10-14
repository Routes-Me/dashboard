import React, { Component } from 'react';
import DetailHeader from '../Detail/DetailHeader';
import DetailBody from '../Detail/DetailBody';
import '../Detail/Detail.css';

export default class Detail extends Component {

    render() {

        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        const action = this.props.object ? "Update" : "Add";
        const objectType = this.props.objectType;
        const title = action + " " + objectType;

        return(
            <div className="row margin-80">
                <div className="col-md-12">
                    <div className="col-md-6">
                        <p className="detail-Subtitle">{this.props.objectType} / {title} </p>
                        <div className="row">
                        {/*<button className="backBtn" onClick={this.props.show} />*/}
                        <p className="detail-Title"><b>{title}</b></p>
                    </div>
                    </div>
                    <div className="col-md-6">
                        {/*< DetailHeader objectType={this.props.objectType} object={this.props.object} show={this.props.show} />*/}
                        <button className="closeCrudBtn" onClick={this.props.show}/>
                    </div>
                 </div>
                {/*< DetailHeader objectType={this.props.objectType} object={this.props.object} show={this.props.show} />*/}
                < DetailBody objectType={this.props.objectType} object={this.props.object} />
            </div>
            )
    }
}