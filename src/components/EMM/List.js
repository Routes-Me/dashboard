import React, { Component } from 'react';
import * as GApiAction from '../../Redux/Action';
import { connect } from 'react-redux';
import { isSuperUser } from '../../util/basic';

class List extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    async componentDidMount() {
        // await this.props.getUsersList();
    }

    showList(list) {
        return (
            <div>
                <div className="table-list padding-lr-80">
                    <table>
                        <thead>
                            <tr>
                                <th>Version</th>
                                <th>Name</th>
                                <th>Package Name</th>
                                <th>Install Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list?.map(policy => (
                                    <tr key={policy.name}>
                                    <td>{policy.version}</td>
                                    <td>{policy.name}</td>
                                    <td>{policy.applications[0].packageName}</td>
                                    <td>{policy.applications[0].installType}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            </div>
            </div>
        )
    }


    render() {
        let content = this.showList(this.props.List)
        return (
            
            <div>
                <div className="top-part-vehicles-search padding-lr-80">
                            <div className="header-add-butt">
                                <h3>Users</h3>
                                {/* <button className='filter-btn'><image className='filter-icon'/> AUthorize</button> */}
                                <a className="vehicle-add-butt" onClick={e => this.props.getUsersList(e)}><image className='filter-icon'/> AUthorize</a>
                            </div>

                            <div className="search-part">
                                    <input type="text" name="search" placeholder="Search" className="search" />
                                    <i className="fa fa-search" aria-hidden="true" />
                                    <span className="cross-icon"><img src="../cross-image.png" /></span>
                            </div>
                        </div>
                
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        List: state.UserStore.Users
    }
}

const actionCreators = {
    getUsersList: GApiAction.authenticate
};

const connectedEMM = connect(mapStateToProps, actionCreators)(List);
export { connectedEMM as default };

