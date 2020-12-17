import React, { Component } from 'react';
import Detail from '../Detail/Detail';
import { connect } from 'react-redux';
import { userConstants } from '../../constants/userConstants';
import * as UserAction from '../../Redux/Action';
import PageHandler from '../PageHandler';
import '../Detail/Detail.css';
import { config } from '../../constants/config';

class Users extends Component {

    constructor(props) {
        super(props)

        this.state = {
            usersList: [],
            error: '',
            activePage: 1,
            showDetails: false,
            user: '',
            optionsIndex: 0
        }
    }


    //Load Data
    componentDidMount() {
        this.props.getUsersList(1, config.Pagelimit,this.props.user.InstitutionId);
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

    //Delete user
    deleteUser = (e, userId) => {
        e.preventDefault();
        this.props.deleteUser(userId);
    }

    static getDerivedStateFromProps (props, state){
        if(state.showDetails){
            if(props.ApplicationState === userConstants.saveUsers_SUCCESS)
            {
                props.getUsersList(1,config.Pagelimit);
                return {showDetails : false}
            }
        }
        return null;
    }

    //Load Institution in a table 
    showUsersList(usersList) {
        return (
            <div>
            <PageHandler page = {usersList.page} getList={this.props.getUsersList} style='header'/>
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


    return {
        UsersList: state.UserStore.Users,
        user: state.Login.user,
        ApplicationState: state.UserStore.ActionState
    }

}


//Create Redux for Users
const actionCreators = {
    getUsersList: UserAction.getUsers,
    deleteUser: UserAction.deleteUser
};

const connectedUsers = connect(mapStateToProps, actionCreators)(Users);
export { connectedUsers as Users };