import React, { Component } from 'react';

export default class RowItem extends Component {

    onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		// this.validateAll();
    }
    

    handleSubmit = (text) => {

			this.props.login(text);
		
	}


    render(text,submit) {
        return (
            <Form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<Input placeholder="Email" className="form-control email" type="string" value={text} onChange={this.onChange} name="role" validations={[email]} />
							<span className="form-error is-visible">{this.state.usernameError}</span>
						</div>		
			</Form>
        )
    }
}
