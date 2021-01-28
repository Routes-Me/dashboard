import React, { Component } from 'react';

class List extends Component {



    componentDidMount() {
        this.props.getUsersList(1, config.Pagelimit,this.props.user.InstitutionId);
    }

    showList(usersList) {
        return (
            <div>
            <PageHandler page = {usersList.page} getList={this.props.getUsersList} institutionId={this.props.user.InstitutionId} style='header'/>
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

export default List;