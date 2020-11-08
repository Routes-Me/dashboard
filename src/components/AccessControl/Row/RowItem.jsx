import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import * as accessControlAction from '../../../Redux/Action/accessControlAction';
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
        if (props.Object !== undefined) {
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
        if(this.props.Save != prevProps.Save)
        {
            this.handleSubmit(this.state.objectType)
        }
    }

    onChange(e) {

		this.setState({ [e.target.name]: e.target.value });
    }
    

    handleSubmit = (objectType) => {

        let object = { Name: this.state.name}
        if(objectType===1)
        {
            this.props.SavePrivileges(object);
        }
        else
        {
            this.props.SaveApplication(object);
        }
		
	}


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
				<input placeholder={`${this.state.object==='' && (this.state.objectType===1?'Privilege name' : 'Application name')}`} className="rowItem" type="string" value={this.state.text} onChange={this.onChange} name="text"/>
				<span className="form-error is-visible">{this.state.error}</span>
			</Form>
        )
	}


}


const actionCreators = {
    SaveApplication: accessControlAction.saveApplications,
    SavePrivileges: accessControlAction.savePrivileges
};

const connectedAccessControl = connect(actionCreators)(RowItem);
export { connectedAccessControl as RowItem };

export default RowItem;
