import React, { Component } from 'react'
import { connect } from 'react-redux'
import bg from '../../images/register-bg.svg';

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
        this.email = this.props.location.search;
        const queryString = require('query-string');
        let searchParams = queryString.parse(this.props.location.search);
        console.log('Params ',searchParams);
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

            <div className="container-fluid h-100" style={{padding:'52px'}}>
                <div class="row align-items-center h-100">
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    <form className='col-lg-8 col-md-12 my-auto mx-auto' onSubmit={this.handleSubmit}>
                        <h1 className='mb-5' style={{fontSize:'35px'}}>Welcome to {this.props.match.params.inv}</h1>
                        <div className="form-group mb-5">
                        <label htmlFor="">Email</label><br/>
                            <input type="email" className="form-control" id="Newpwd" placeholder="Email" value={this.state.password} onChange={this.onChange} name="password" />
                        </div>
                        <div className="form-group mb-5">
                            <label htmlFor="">Name</label><br/>
                            <input type="text" className="form-control" id="Confirmpwd" placeholder="Name" value={this.state.confirmPassword} onChange={this.onChange} name="confirmPassword" />
                        </div>
                        <div className="form-group mb-5">
                            <label htmlFor="">Password</label><br/>
                            <input type="password" className="form-control" id="Newpwd" placeholder="New Password" value={this.state.password} onChange={this.onChange} name="password" />
                        </div>
                        <div className="form-group mb-5">
                            <label htmlFor="">Confirm Password</label><br/>
                            <input type="password" className="form-control" id="Confirmpwd" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChange} name="confirmPassword" />
                        </div>
                        <button className="send" onClick={this.handleSubmit} disabled={!this.validateResetForm()}>
                        {/* {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                        {loading && <span>  Sending...</span>}
                        {!loading && <span>Send</span>} */}
                        <span>Send</span>
                        </button>
                    </form>
                </div>
                <div className="col-sm-6 d-none d-lg-block">
                <img className="img-fluid mx-auto d-block" alt="Responsive image" src={bg} />
                </div>
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
