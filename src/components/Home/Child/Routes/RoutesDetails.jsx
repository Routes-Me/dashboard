import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Label } from 'reactstrap';
import * as RoutesAction from '../../../../Redux/Action/RoutesAction';

class RoutesDetails extends Component {

    constructor(props){
        super(props)
        this.state = {
            title:'',
            subtitle:'',
            objectToDisplay :'',
            price:'',
            currency:'',
            validity:''
        }
    }

    componentDidMount() {
        
    }


    static getDerivedStateFromProps(props, state) {
        if(props.entity !== undefined){
            if(props.entity !== state.objectToDisplay){
                if(props.entity.tabIndex === 1)
                return {
                    objectToDisplay : props.entity,
                    title : props.entity.Title,
                    subtitle : props.entity.Subtitle
                }
                if(props.entity.tabIndex === 2)
                return {
                    objectToDisplay : props.entity,
                    price : props.entity.price,
                    currency : props.entity.currency,
                    validity : props.entity.validity
                }
            }
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {

        event.preventDefault();
        let route = '';
        let ticket = '';

        let action ='';

        {action =  this.state.objectToDisplay.RouteId? "save": "add"}

        if(action === 'add')
        {
            route = {
                Title       : this.state.title,
                Subtitle    : this.state.subtitle                                                                                                                                                                                                                                                                                                         
            }
        }
        else
        {
            route = {
                RouteId   : this.state.objectToDisplay.RouteId,
                Title     : this.state.title,
                Subtitle  : this.state.subtitle                                                                                                                                                                                                                                                                                                  
            }
        }

        console.log('Save Route ',route);
        this.props.saveRoute(route,action);
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
                    <input type="text" name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    placeholder='eg 999'
                    className="form-control"/>
                </div>
            </div>
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Destination</Label><br />
                    <input type="text" name="subtitle"
                    value={this.state.subtitle}
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
                    value={this.state.title}
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

const mapStateToProps = (state) => {
    return{
        CurrencyList : state.RoutesStore.currency
    }
}

const actionCreators = {
    saveRoute : RoutesAction.saveRoute,
    saveTicket : RoutesAction.saveTicket,
    getCurrency : RoutesAction.getCurrency
};

const connectRoutesDetail = connect(mapStateToProps, actionCreators)(RoutesDetails);
export { connectRoutesDetail as RoutesDetails };