import React, { Component } from 'react';

class DetailHeader extends Component {

    render() {

        const action = this.props.object ? "Add" : "Save";
        const objectType = this.props.objectType;
        const title = action +" "+ objectType;

        return (
            <div className="col-md-12">
                <div className="row">
                    <button className="backBtn" onClick />
                    <p className="detail-Title"><b>{title}</b></p>
                </div>
                {/*<h5>{this.props.navChildHistory.map(childObj => { childObj })}</h5>*/}
                <p className="detail-Subtitle">{this.props.objectType} / {title} </p> 
            </div>
            )
    }

}

export default DetailHeader;