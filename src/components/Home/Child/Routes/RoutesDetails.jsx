import { event } from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Label } from 'reactstrap';
import * as RoutesAction from '../../../../Redux/Action/RoutesAction';

export class RoutesDetails extends Component {

    constructor(props){
        super(props)
        this.state = {
            route:'',
            destination:'',
            objectToDisplay :'',
            route :'',
            destination :'',
            price:'',
            currency:'',
            validity:''
        }
    }

    componentDidMount() {
        
    }


    static getDerivedStateFromProps(props, state) {
        if(props.entity.objectToDisplay !== undefined){
            if(props.entity !== state.objectToDisplay){
                if(props.entity.tabIndex === 1)
                return {
                    objectToDisplay : props.entity.objectToDisplay,
                    route : props.entity.objectToDisplay.route,
                    destination : props.entity.objectToDisplay.destination
                }
                if(props.entity.tabIndex === 2)
                return {
                    objectToDisplay : props.entity.objectToDisplay,
                    price : props.entity.objectToDisplay.price,
                    currency : props.entity.objectToDisplay.currency,
                    validity : props.entity.objectToDisplay.validity
                }
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let route = '';
        let ticket = '';

        // {this.state.}
    }

render() {

    const tabIndex = this.props.entity.tabIndex;

        return (
    <>
            {tabIndex === 1 &&
            <div className="col-md-12" style={{padding:'0px'}}>
                <label>You can add/update route and manage price ticket easliy here</label>
            <Form className='form-detail' onSubmit={e => this.handleSubmit(e)}>
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Route</Label><br />
                    <input type="text" name="route"
                    value={this.state.route}
                    onChange={this.onChange}
                    placeholder='eg 999'
                    className="form-control"/>
                </div>
            </div>
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Destination</Label><br />
                    <input type="text" name="plateNumber"
                    value={this.state.destination}
                    onChange={this.onChange}
                    placeholder='e.g Malyia to Salmiya'
                    className="form-control"/>
                </div>
            </div>
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
            <Form className='form-detail' onSubmit={e => this.handleSubmit(e)}>
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Price</Label><br />
                    <input type="text" name="price"
                    value={this.state.route}
                    onChange={this.onChange}
                    placeholder='e.g 0.250'
                    className="form-control"/>
                </div>
            </div>
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Currency</Label><br />
                    <select defaultValue={this.state.dayInterval} className="custom-select my-1 mr-sm-2" name="currency" onChange={this.onChange}>
                        <option className="dropdown-item" value='kwd'>Kuwaiti Dinar (KWD)</option>
                    </select>
                </div>
            </div>
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Validity</Label><br />
                    <select defaultValue={this.state.dayInterval} className="custom-select my-1 mr-sm-2" name="validity" onChange={this.onChange}>
                        <option className="dropdown-item" value={1}>1 Day</option>
                    </select>
                </div>
            </div>
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
    CurrencyList : state.RoutesStore.currency
})

const actionCreators = {
    saveRoute : RoutesAction.saveRoute,
    saveTicket : RoutesAction.saveTicket,
    getCurrency : RoutesAction.getCurrency
}

export default connect(mapStateToProps, actionCreators)(RoutesDetails)
