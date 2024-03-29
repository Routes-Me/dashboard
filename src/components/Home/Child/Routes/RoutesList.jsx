import React, { Component } from 'react'
import { connect } from 'react-redux'
import { config } from '../../../../constants/config';
import { routesConstants } from '../../../../constants/routesConstants';
import { userConstants } from '../../../../constants/userConstants';
import * as RoutesAction from '../../../../Redux/Action/RoutesAction';
import Detail from '../Detail/Detail';
import PageHandler from '../PageHandler';

export class RoutesList extends Component {

    constructor(props){
        super(props)
        this.state = {
            lsit : [],
            tabIndex: 1,
            showDetails:false,
            objectToDisplay:'',
            optionsIndex:0
        }
    }

    componentDidMount() {
        this.fetchList(this.state.tabIndex)
    }

    fetchList(index){
        if(index === 1)
        this.props.getRoutes(1,config.Pagelimit);
        if(index === 2)
        this.props.getTickets(1,config.Pagelimit);
    }

    static getDerivedStateFromProps(props, state) {
        if(props.ApplicationState === routesConstants.updateList)
        {
            if(state.showDetails){
                return { showDetails: false };
            }
        }
    }

    componentDidUpdate(){
        if(this.props.ApplicationState === routesConstants.updateList)
        {
            this.fetchList(this.state.tabIndex);
        }
    }

    onTabClick = (index) => {
        this.fetchList(index);
        this.setState({ tabIndex: index, optionsIndex:0 });
    }

    //Handle submenu for the table row
    openSubMenu = (e, index) => {
        e.preventDefault();
        this.setState({ optionsIndex: this.state.optionsIndex === index ? 0 :index });
    }

    //Show Detail Screen
    showDetailScreen = (e, entity) => {
        e.preventDefault();
        this.setState({
            showDetails: !this.state.showDetails,
            objectToDisplay: entity,
            optionsIndex: 0
        })
    }

    returnFormatedtextForTickets = (tickets) =>{
        return tickets.count > 0 ? tickets.count > 1 ? tickets.join(',') : tickets[0] : '--';
    }


    renderList(list) {

        return (
            <div className="table-list padding-lr-80-top-0">
                {this.state.tabIndex === 1 &&
                    <div>
                        <div className="header-add-butt">
                            <div className='col-md-6' style={{padding:'0px'}}>
                            <div className="search-part" style={{maxWidth:'338px', padding:'0px'}}>
                                <input type="text" name="search" placeholder="Search" className="search" />
                                <i className="fa fa-search" aria-hidden="true" />
                            </div>
                            </div>
                            <div className='col-md-6'>
                            <PageHandler page = {list.page} getList={this.props.getRoutes} style='header' institutionId='1580030173'/>
                            </div>
                        </div>
                        
                    <table>
                        <thead>
                            <tr style={{height:'51px'}}>
                                <th>Routes</th>
                                <th>Destination</th>
                                <th>Tickets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.data?.map((item, index) =>(
                                    <tr  key={item.RouteId}>
                                        <td>{item.Title}</td>
                                        <td>{item.Subtitle}</td>
                                        <td>{this.returnFormatedtextForTickets(item.Tarrifs)}</td>
                                        <td className="width20" onClick={e => this.openSubMenu(e, index+1)}>
                                            <div className="edit-popup">
                                                <div className="edit-delet-butt" onClick={e => this.openSubMenu(e, index+1)}>
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                                <ul className="edit-delet-link" style={{ display: this.state.optionsIndex === index+1 ? 'inline-block' : 'none' }}>
                                                    <li><a onClick={e => this.showDetailScreen(e, item)}>Edit</a></li>
                                                    <li><a onClick={e => this.props.deleteRoute(e, item.RouteId)}>Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>}
                {this.state.tabIndex === 2 &&
                    <div>
                <div className="header-add-butt">
                        <div className='col-md-6' style={{padding:'0px'}}>
                        <div className="search-part" style={{maxWidth:'338px', padding:'0px'}}>
                                <input type="text" name="search" placeholder="Search" className="search" />
                                <i className="fa fa-search" aria-hidden="true" />
                        </div>
                        </div>
                        <div className='col-md-6'>
                        {/* <PageHandler page = {list.page} getList={this.props.getTickets} style='header'/> */}
                        </div>
                </div>
                <table>
                        <thead>
                            <tr style={{height:'51px'}}>
                                <th>Price</th>
                                <th>Validity</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.data?.map((item, index) => (
                                    <tr key={item.TicketId}>
                                        <td>{item.Price}</td>
                                        <td>{item.Validity}</td>
                                        <td>{item.CreatedAt}</td>
                                        <td className="width20" onClick={e => this.openSubMenu(e, index+1)}>
                                            <div className="edit-popup">
                                                <div className="edit-delet-butt" onClick={e => this.openSubMenu(e, index+1)}>
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                                <ul className="edit-delet-link" style={{ display: this.state.optionsIndex === index+1 ? 'inline-block' : 'none' }}>
                                                    <li><a onClick={e => this.showDetailScreen(e, item)}>Edit</a></li>
                                                    <li><a onClick={e => this.props.deleteTickets(e, item.TicketId)}>Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                </table>
            </div>}
            </div>
        );
    }




    render() {

        const tabIndex = this.state.tabIndex; 
        const updatedList = tabIndex === 1 ? this.props.Routes : this.props.Tickets
        let content = this.renderList(updatedList);

        return (
            <div className="vehicles-page" >
                {this.state.showDetails ?
                <Detail className={this.props.showDetails ? "child-in" : "child"}
                    show={this.showDetailScreen}
                    objectType={userConstants.NavItem_Bus}
                    object={{...this.state.objectToDisplay, tabIndex : this.state.tabIndex}} /> :
                <>
                <div className="top-part-vehicles-search padding-lr-80">
                    <div className="header-add-butt">
                        <div className='flex-row'>
                        <img className='logo' src={require('../../../../images/Bus Routes.svg')} alt=""/>
                        <div className="flex-collumn">
                        <h3>Bus Routes</h3>
                        <div className="headerTabStyle" style={{maxWidth:'100%',marginTop:'13px'}}>
                            <nav>
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className={`nav-item nav-link ${tabIndex === 1 && "active"}`} id="nav-1" data-toggle="tab" onClick={(e) => this.onTabClick(1)} role="tab" aria-controls="nav-1" aria-selected="true">Routes</a>
                                    <a className={`nav-item nav-link ${tabIndex === 2 && "active"}`} id="nav-2" data-toggle="tab" onClick={(e) => this.onTabClick(2)} role="tab" aria-controls="nav-2" aria-selected="false">Ticktes</a>
                                </div>
                            </nav>
                        </div>
                        </div>
                        </div>
                        {tabIndex === 1 ? <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Routes</a>
                        : <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add Ticket</a>}
                    </div>
                </div>
                {content}
                </>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    Routes : state.RoutesStore.routes,
    Tickets : state.RoutesStore.tickets,
    ApplicationState: state.RoutesStore.actionState
})

const actionCreators = {
    getRoutes : RoutesAction.getRoutes,
    deleteRoute : RoutesAction.deleteRoute,
    getTickets : RoutesAction.getTickets,
    deleteTickets : RoutesAction.deleteTicket
}

export default connect(mapStateToProps, actionCreators)(RoutesList)
