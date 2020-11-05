import React, { Component } from 'react';
import { Button } from 'reactstrap';
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
            rowIndex : 0
        }
    }
    
    componentDidMount(){
        this.updateTheList(this.state.tabIndex);
    }
    
    onTabClick = (index) => {
        this.setState({ tabIndex: index });
        this.updateTheList(index);
    }

    renderList= (list) => {
        return(
            <div className="table-list-vehicles">
                <div className="table">
                    <table>
                            <tr>
                                <th className=''>Name</th>
                                <th className=''>Created at</th>
                            </tr>
                            {list.map((Role, index) => 
                                    {<tr  key={Role.id} onClick={e => this.rowSelect(e, index)}>
                                        <td>{this.state.rowIndex === index? <RowItem Text={index}/> : Role.name}</td>
                                        <td>--</td>
                                    </tr>}
                                )}
                    </table>
                </div>
            </div>
        )
    }


    updateTheList = (tabIndex) => {
        tabIndex === 1 ? this.props.getPrivileges() : this.props.getApplications();
    }

    rowSelect = (e, index) =>({ rowIndex: index })


    


    render() {

        let list = this.state.tabIndex === 1 ? this.props.PrivilegesList : this.props.ApplicationsList
        let content = this.renderList(list);
        const tabIndex = this.state.tabIndex; 
        {this.props.ApplicationState === accessControlConstant.saveApplications_SUCCESS && this.props.getApplications()}
        {this.props.ApplicationState === accessControlConstant.savePrivilidges_SUCCESS && this.props.getPrivileges()}

        return (
            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>

                <div className="top-part-vehicles-search padding-lr-80">
                    <div className="hehading-add-butt">
                        <h3>Access Control</h3>
                    </div>
                </div>
                <div className='row' style={{marginTop:'4%', marginLeft:'40px'}}>
                    <div className='col-md-4'>
                        <div className="row headerTabStyle">
                            <nav>
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className={`nav-item nav-link ${tabIndex === 1 && "active"}`}  data-toggle="tab" onClick={(e) => this.onTabClick(1)} role="tab" aria-controls="nav-home" aria-selected="true"> Privileges</a>
                                    <a className={`nav-item nav-link ${tabIndex === 2 && "active"}`}  data-toggle="tab" onClick={(e) => this.onTabClick(2)} role="tab" aria-controls="nav-profile" aria-selected="false"> Applications</a>
                                </div>
                            </nav>
                        </div>
                    </div>
                <div className="row col-md-12">
                        <i className='btnSave'> Save </i>
                </div>
                </div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        ApplicationsList : state.AccessControlStore.Applications,
        PrivilegesList  : state.AccessControlStore.Privileges
    }

}

const actionCreators = {
    getApplications: accessControlAction.getApplications,
    getPrivileges: accessControlAction.getPrivileges
};

const connectedAccessControl = connect(mapStateToProps, actionCreators)(AccessControl);
export { connectedAccessControl as AccessControl };

export default AccessControl;