import React, { Component } from 'react';

class DetailHeader extends Component {

    render() {

        const action = this.props.object ? "Add" : "Save";
        const objectType = this.props.objectType;
        const title = action + objectType;

        return (
            <div className="col-md-12">
                <h3>{title}</h3>
                {/*<h5>{this.props.navChildHistory.map(childObj => { childObj })}</h5>*/}
                <h5>Add Vehicle / </h5> <ol className="breadcrumb"><li class="breadcrumb-item"><a href="#">Add Vehicle</a></li></ol>
            </div>
            )
    }

}

export default DetailHeader;