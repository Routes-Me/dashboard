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

    componentDidMount() {
        this.props.getUsersList();
    }

    showList(usersList) {
        return (
            <div>
                <div className="table-list padding-lr-80">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>CREATED AT</th>
                                <th className="width20"/>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usersList.data?.map(user => (
                                    <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.createdAt}</td>
                                    {isSuperUser(this.props.user.InstitutionId) &&
                                    <td className="width20" >
                                        <div className="edit-popup">
                                            <div className="edit-delet-butt" onClick={e => this.openSubMenuForUserId(e, user.userId)}>
                                                <span />
                                                <span />
                                                <span />
                                            </div>
                                                <ul className="edit-delet-link" style={{ display: this.state.optionsIndex === user.userId ? 'inline-block' : 'none' }}>
                                                    <li><a onClick={e => this.showDetailScreen(e, user)}>Edit</a></li>
                                                    <li><a onClick={e=> this.deleteUser(e, user.userId)}>Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>}
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
        return (
            <div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        UsersList: state.UserStore.Users
    }
}

const actionCreators = {
    getUsersList: GApiAction.authenticate
};

const connectedEMM = connect(mapStateToProps, actionCreators)(List);
export { connectedEMM as default };

