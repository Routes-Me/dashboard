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

    showList(list) {
        return (
            <div>
                <div className="table-list padding-lr-80">
                    <table>
                        <thead>
                            <tr>
                                <th>version</th>
                                <th>name</th>
                                <th>package name</th>
                                <th>install type</th>
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

