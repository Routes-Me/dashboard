import React, { Component } from 'react';
import DetailHeader from '../Detail/DetailHeader';
import DetailBody from '../Detail/DetailBody';
import '../Detail/Detail.css';

export default class Detail extends Component {

    closeDetails = () => null;


    render() {

        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            this.closeDetails(this.props.show);
        }

        const action = this.props.object ? "Generate" : "Add";
        const objectType = this.props.objectType;
        const title = action + " " + objectType;

        return(
            <div className="row margin-40">
                <div className="col-md-12">
                    <div className="col-md-6">

                    <div className="row">
                        <p className="detail-Subtitle">{this.props.objectType} / {title} </p>
                    </div>
                    <div className="row">
                        {/*<button className="backBtn" onClick={this.props.show} />*/}
                        <p className="detail-Title"><b>{title}</b></p>
                    </div>
                    </div>
                    <div className="col-md-6">
                        {/*< DetailHeader objectType={this.props.objectType} object={this.props.object} show={this.props.show} />*/}
                        <button className="closeCrudBtn" onClick={e => this.props.show(e)}/>
                    </div>
                 </div>
                {/*< DetailHeader objectType={this.props.objectType} object={this.props.object} show={this.props.show} />*/}
                <DetailBody objectType={this.props.objectType} object={this.props.object} onClose={this.closeDetails}/>
            </div>
            )
    }
}