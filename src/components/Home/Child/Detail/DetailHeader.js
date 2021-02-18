import React, { Component } from 'react';

class DetailHeader extends Component {

    constructor(props) {
        super(props)

    }

    //returnBackToPreviousComponent = () => {
    //    this.props.
    //}

    render() {

        const action = this.props.object ? "Update" : "Add";
        const objectType = this.props.objectType;
        const title = action +" "+ objectType;

        return (
            <div className="row">
            <div className="col-md-6">
                <div className="row">
                    <button className="backBtn" onClick={this.props.show} />
                    <p className="detail-Title"><b>{title}</b></p>
                </div>
                {/*<h5>{this.props.navChildHistory.map(childObj => { childObj })}</h5>*/}
                <p className="detail-Subtitle">{this.props.objectType} / {title} </p> 
            </div>
            <div className="col-md-6">
                <button type="submit" className="btn btn-primary"> Save </button>
            </div>
            </div>
            )
    }

}

export default DetailHeader;