import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: "",
            password: "",
            confirmPassword: ""
        };
    }

    componentDidMount() {
        this.email = this.props.match.params.name;
    }
    validateResetForm() {
        const { password, confirmPassword } = this.state;
        if (!password || !confirmPassword) {
            return false;
        }
        return password === confirmPassword;
    }


    handleSubmit = (event) => {

        this.setState({ loading: true });
        event.preventDefault();
        console.log("States:", this.state);

        let ResetPasswordObject = {
            Email: this.email,
            Password: this.state.password,
            ConfirmPassword: this.state.confirmPassword
        };

        //if (this.form.validateAll()) {
        this.props.Reset_Password(ResetPasswordObject);
        //}
    }
    

    render() {
        return (

            <div className="container">
                <br/>
                <br/>
                <div className="forgot">

                    <h2>Register with us to access your dashboard</h2>

                    <p>Enter your new password</p>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="password" className="forgotpassword" id="Newpwd" placeholder="New Password" value={this.state.password} onChange={this.onChange} name="password" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="forgotpassword" id="Confirmpwd" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChange} name="confirmPassword" />
                        </div>
                    </form>
                    <button className="send" onClick={this.handleSubmit} disabled={!this.validateResetForm()}>
                        {/* {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                        {loading && <span>  Sending...</span>}
                        {!loading && <span>Send</span>} */}
                        <span>Send</span>
                    </button>
                    
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
