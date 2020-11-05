import React, { Component } from 'react';

export default class RowItem extends Component {

	constructor(props) {
        super(props)
        this.state = {
            text:""
        }
	}

	static getDerivedStateFromProps(props, state) {
        if (props.Text !== undefined) {
            if (props.Text !== state.text) {
                return {
                    text   : props.Text,
                }
            }
        }
        return null;
    }

    onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
    }
    

    handleSubmit = () => {
		this.props.login(this.state.text);
	}


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<Input placeholder="" className="form-control email" type="string" value={this.state.Text} onChange={this.onChange} name="text"/>
							<span className="form-error is-visible">{this.state.usernameError}</span>
						</div>		
			</Form>
        )
	}


}
