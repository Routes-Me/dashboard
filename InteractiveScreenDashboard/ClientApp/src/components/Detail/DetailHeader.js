import React, { Component } from 'react';

class DetailHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detailTitle: "",
            navChildHistory: []
        }
    }

    render() {

        return (
            <div className="col-md-12">
                <h3>{this.props.detailTitle}</h3>
                {/*<h5>{this.props.navChildHistory.map(childObj => { childObj })}</h5>*/}
                <h5>Add Vehicle / </h5> <ol className="breadcrumb"><li class="breadcrumb-item"><a href="#">Add New Vehicle</a></li></ol>
            </div>
            )
    }

}

export default DetailHeader;