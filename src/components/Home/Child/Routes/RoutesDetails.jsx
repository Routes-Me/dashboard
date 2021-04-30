import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Label } from 'reactstrap';
import * as RoutesAction from '../../../../Redux/Action/RoutesAction';

export class RoutesDetails extends Component {

    constructor(props){
        super(props)
        this.state = {
            route:'',
            destination:''
        }
    }

    render() {

        const tabIndex = this.props.entity.tabIndex;

        return (
<>
            {tabIndex === 1 &&
            <div className="col-md-12" style={{padding:'0px'}}>
                <label>You can add/update route and manage price ticket easliy here</label>
                <br />
            <Form onSubmit={e => this.handleSubmit(e)}>
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Route</Label><br />
                    <input type="text" name="route"
                    value={this.state.route}
                    onChange={this.onChange}
                    className="form-control"/>
                </div>
            </div><br />
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Destination</Label><br />
                    <input type="text" name="plateNumber"
                    value={this.state.destination}
                    onChange={this.onChange}
                    className="form-control"/>
                </div>
            </div><br />
            <div className="container-fluid">
            <div className="footerStyle">
                <button type="submit" style={{ float: 'left' }}> Save </button>
            </div>
            </div>
            </Form>
            </div>}
            {tabIndex ===2 &&
            <div className="col-md-12" style={{padding:'0px'}}>
            <label>You can add/update price ticket easliy here</label>
            <br />
            <Form onSubmit={e => this.handleSubmit(e)}>
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Price</Label><br />
                    <input type="text" name="route"
                    value={this.state.route}
                    onChange={this.onChange}
                    className="form-control"/>
                </div>
            </div><br />
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Currency</Label><br />
                    <select defaultValue={this.state.dayInterval} className="custom-select my-1 mr-sm-2" name="policyName" onChange={this.onChange}>
                        <option className="dropdown-item" value='kwd'>Kuwaiti Dinar (KWD)</option>
                    </select>
                </div>
            </div><br />
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Validity</Label><br />
                    <select defaultValue={this.state.dayInterval} className="custom-select my-1 mr-sm-2" name="policyName" onChange={this.onChange}>
                        <option className="dropdown-item" value={1}>1 Day</option>
                    </select>
                </div>
            </div><br />
            <div className="container-fluid">
            <div className="footerStyle">
                <button type="submit" style={{ float: 'left' }}> Save </button>
            </div>
            </div>
            </Form>
            </div>
            }
  </>      )
    }
}

const mapStateToProps = (state) => ({
    
})

const actionCreators = {
    saveRoute : RoutesAction.saveRoute,
    saveTicket : RoutesAction.saveTicket
}

export default connect(mapStateToProps, actionCreators)(RoutesDetails)
