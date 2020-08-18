import React, { Component } from 'react';
import Detail from '../Detail/Detail';
import { connect } from 'react-redux';
import { userConstants } from '../../constants/userConstants';
import * as UserAction from '../../Redux/Action';
import '../Detail/Detail.css';

class Users extends Component {

    constructor(props) {
        super(props)

        this.state = {
            usersList: [],
            loading: true,
            failed: false,
            error: '',
            activePage: 1,
            showDetails: false,
            user: '',
            optionsIndex: 0
        }
    }


    //Load Data
    componentDidMount() {
        // get Institutions
        this.props.getUsersList();
    }

    //Handle Page selection
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

    //Handle SubMenu Toggle for the Table
    openSubMenuForUserId = (e, userId) => {
        e.preventDefault();
        this.setState({ optionsIndex: this.state.optionsIndex === userId ? 0 : userId });
    }


    //Show Detail Screen
    showDetailScreen = (e, user) => {
        e.preventDefault();
        this.setState({
            showDetails: !this.state.showDetails,
            user: user,
            optionsIndex: 0
        })
    }

    //Delete Institution



    //Load Institution in a table 
    showUsersList(usersList) {
        return (
            <div className="table-list-vehicles">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>ROLE</th>
                                <th className="width44" />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usersList.map(user => (
                                    <tr key={user.userId}>
                                        <td>{user.userId}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.description}</td>
                                        <td className="width44" >
                                            <div className="edit-popup">
                                                <div className="edit-delet-butt" onClick={e => this.openSubMenuForUserId(e, user.userId)}>
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                                <ul className="edit-delet-link" style={{ display: this.state.optionsIndex === user.userId ? 'inline-block' : 'none' }}>
                                                    <li><a onClick={e => this.showDetailScreen(e, user)}>Edit</a></li>
                                                    <li><a>Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>
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

        let content = this.showUsersList(this.props.UsersList);
        return (

            
            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>
                {this.state.showDetails ?
                    <Detail className={this.props.showDetails ? "child-in" : "child"}
                        show={this.showDetailScreen}
                        objectType={userConstants.NavItem_Users}
                        object={this.state.user} /> :
                    <div>
                        <div className="top-part-vehicles-search padding-lr-80">
                            <div className="hehading-add-butt">
                                <h3>Users</h3>
                                <a className="vehicle-add-butt" onClick={e => this.showDetailScreen(e)}><i className="fa fa-plus-circle" aria-hidden="true" /> Invite User</a>
                            </div>

                            <div className="search-part">
                                <div className="search-relative">
                                    <input type="text" name="search" placeholder="Search" className="search" />
                                    <i className="fa fa-search" aria-hidden="true" />
                                    <span className="cross-icon"><img src="../cross-image.png" /></span>
                                </div>
                            </div>
                        </div>
                        {content}
                    </div>}
            </div>
        );

    }





}

const mapStateToProps = (state) => {

    const Users = state.UserStore.Users;
    //console.log('Mapped State User Array returned :', Users);

    return {
        UsersList: Users
    }

}


//Create Redux for Users
const actionCreators = {
    getUsersList: UserAction.getUsers
};

const connectedUsers = connect(mapStateToProps, actionCreators)(Users);
export { connectedUsers as Users };