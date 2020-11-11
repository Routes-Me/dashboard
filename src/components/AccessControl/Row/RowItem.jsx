import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import * as UserAction from '../../../Redux/Action/UserAction';
import { connect } from 'react-redux';

class RowItem extends Component {

	constructor(props) {
        super(props)
        this.state = {
            object:'',
            objectType:'',
            text:'',
            error:''
        }
	}

	static getDerivedStateFromProps(props, state) {
        if (props.Object.name !== undefined) {
            if (props.Object.id !== state.object.id) {
                return {
                    object   : props.Object,
                    text     : props.Object.name,
                    objectType :  props.ObjectType
                }
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState)
    {
        if(this.props.Save !== prevProps.Save)
        {
            this.handleSubmit(this.state.objectType)
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    

    handleSubmit = (objectType) => {

        let object = '', action = '';
        
        { action = this.state.object.id? 'save' : 'add' } 
        if(objectType===1)
        {
            if(action === 'save')
            {
                object ={
                    privilegeId : this.state.object.id,
                    name        : this.state.text
                }
            }
            else
            {
                object ={
                    name : this.state.text
                }
            }
            this.props.savePrivilege(object,action);
            
        }
        else
        {
            if(action === 'save')
            {
                object ={
                    applicationId : this.state.object.id,
                    name          : this.state.text
                }
            }
            else
            {
                object ={
                    name : this.state.text
                }
            }
            this.props.saveApplication(object,action);
        }
		
	}


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
				<input placeholder={this.state.objectType === 1 ? 'Privilege name' : 'Application name'} className="rowItem" type="string" value={this.state.text} onChange={this.onChange} name="text"/>
				<span className="form-error is-visible">{this.state.error}</span>
			</Form>
        )
	}


}


// const mapStateToProps = (state) => {
//     return {

//     }
// }

const actionCreators = {
    saveApplication :  UserAction.saveApplications,
    savePrivilege   :  UserAction.savePrivileges
}

const connectedRowItem = connect(null, actionCreators)(RowItem);
export { connectedRowItem as RowItem };

