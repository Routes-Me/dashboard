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
        this.props.entity.tabIndex === 2 && this.props.getCurrency();
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
                    price : props.entity.Price,
                    currency : props.entity.CurrencyId,
                    validity : props.entity.Validity
                }
            }
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {

        event.preventDefault();

            let action ='';

            if(this.props.entity.tabIndex === 1)
            {
                let route = '';
                action =  this.state.objectToDisplay.RouteId? "save": "add";
            
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
                this.props.saveRoute(route,action);
            }
            if( this.props.entity.tabIndex === 2)
            {
                let ticket = '';
                action = this.state.objectToDisplay.TicketId? 'save':'add';
                if(action === 'add')
                {
                    ticket = {
                        Price: this.state.price,
                        CurrencyId: this.state.currency,
                        Validity: this.state.validity
                    }
                }
                else 
                {
                    ticket = {
                        TicketId : this.state.objectToDisplay.TicketId,
                        Price: this.state.price,
                        CurrencyId: this.state.currency,
                        Validity: this.state.validity
                    }
                }
                console.log(`tkt to add ${ticket}`,ticket)
                this.props.saveTicket(ticket,action);
            }
        
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
                    value={this.state.price}
                    onChange={this.onChange}
                    placeholder='e.g 0.250'
                    className="form-control"/>
                </div>
            </div>
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Currency</Label><br />
                    <select defaultValue={this.state.currency} className="custom-select my-1 mr-sm-2" name="currency" onChange={this.onChange}>
                        <option key='select'>Select</option>
                        {this.props.CurrencyList.map(currency => (<option key={currency.CurrencyId} className="dropdown-item" value={currency.CurrencyId}>{currency.Name} ({currency.Code})</option>))}
                    </select>
                </div>
            </div>
            <div className="row form-group">
                <div className="col-md-6">
                    <Label>Validity</Label><br />
                    <select defaultValue={this.state.validity} className="custom-select my-1 mr-sm-2" name="validity" onChange={this.onChange}>
                        <option key='select'>Select</option>
                        <option className="dropdown-item" value="1">1 Day</option>
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