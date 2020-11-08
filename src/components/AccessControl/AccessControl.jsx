import React, { Component } from 'react';
import { accessControlConstant } from '../../constants/accessControlConstant';
import * as accessControlAction from '../../Redux/Action/accessControlAction';
import { connect } from 'react-redux';
import './AccessControl.css';
import RowItem from './Row/RowItem';

class AccessControl extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            name : '',
            tabIndex : 1,
            rowIndex : 0,
            save     : false
        }

        this.rowSelect = this.rowSelect.bind(this);
    }
    
    componentDidMount(){
        this.updateTheList(this.state.tabIndex);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.Text !== undefined) {
            if (props.Text !== state.text) {
                return {
                    text   : props.Text
                }
            }
        }
        return null;
    }
    
    onTabClick = (index) => {
        this.setState({ tabIndex: index });
        this.updateTheList(index);
    }

    saveChanges = () =>{
        this.setState({ save: true})
    }

    renderList= (list) => {
        return(
            <div className="list">
                    <table className='align-l-p40'>
                            <tr>
                                <th>Name</th>
                                <th>Created at</th>
                            </tr>
                            {list.map((Role, index) => 
                                    <tr className={`${this.state.rowIndex === index && 'selected'}`} key={index} onClick={e => this.rowSelect(e, index)}>
                                        <td className={`${this.state.rowIndex === index? 'selected' : 'align-l-p40'}`}>{this.state.rowIndex === index? <RowItem Object={Role} ObjectType={this.state.tabIndex} Save={this.state.save}/> : Role.name}</td>
                                        {/*<td className='align-l-p40'>{Role.name}</td>*/}
                                        <td className='align-l-p40'>--</td>
                                    </tr>
                                )}
                    </table>
            </div>
        )
    }

    updateTheList = (tabIndex) => {
        tabIndex === 1 ? this.props.getPrivileges() : this.props.getApplications()
    }

    //rowIndex = {tabIndex === 1 ? this.props.getPrivileges().length : this.props.getApplications().length}

     rowSelect(e, index) { 
        this.setState({rowIndex: index}); 
    }

    render() {

        let list = this.state.tabIndex === 1 ? this.props.PrivilegesList : this.props.ApplicationsList
        let content = this.renderList(list);
        const tabIndex = this.state.tabIndex; 
        {this.props.ApplicationState === accessControlConstant.saveApplications_SUCCESS && this.props.getApplications()}
        {this.props.ApplicationState === accessControlConstant.savePrivilidges_SUCCESS && this.props.getPrivileges()}

        return (
            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>

                <div className="margin-l-40">

                    <div className="header">
                        <h3>Access Control</h3>
                    </div>

                    <div className="headerTab">
                        <nav>
                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a className={`nav-item nav-link ${tabIndex === 1 && "active"}`}  data-toggle="tab" onClick={(e) => this.onTabClick(1)} role="tab" aria-controls="nav-home" aria-selected="true"> Privileges</a>
                                <a className={`nav-item nav-link ${tabIndex === 2 && "active"}`}  data-toggle="tab" onClick={(e) => this.onTabClick(2)} role="tab" aria-controls="nav-profile" aria-selected="false"> Applications</a>
                            </div>
                        </nav>
                    </div>

                    <div className="saveDiv">
                            <i className='btnSave' onClick={(e) => this.saveChanges()}> Save </i>
                    </div>

                </div>
                
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ApplicationsList : [...state.AccessControlStore.Applications, {id:'', name:'Application Name'}],
        PrivilegesList  : [...state.AccessControlStore.Privileges,  {id:'', name:'Priviledge Name'}]
    }
}

const actionCreators = {
    getApplications: accessControlAction.getApplications,
    getPrivileges: accessControlAction.getPrivileges
};

const connectedAccessControl = connect(mapStateToProps, actionCreators)(AccessControl);
export { connectedAccessControl as AccessControl };

export default AccessControl;