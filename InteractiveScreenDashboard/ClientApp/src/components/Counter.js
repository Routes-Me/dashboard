import React, { Component } from 'react';

export class Counter extends Component {
    static displayName = Counter.name;

    constructor(props) {
        super(props);
        this.state = { currentCount: 0 };
        this.incrementCounter = this.incrementCounter.bind(this);
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

    render() {
        return (
            <div className="container">
        <div className="forgot">
            <h2>Having trouble signing in?</h2>

            <p>Enter your email and we will send instuctions to rest the password</p>
                        <form>
                                <div className="form-group group">
                                    <input type="email" className="forgotemail" id="email" placeholder="Email" name="email"/>
                                </div>
                         </form>

            <button className="btn btn-primary send" onClick={this.incrementCounter}>Send</button>
        </div>
        </div>
        );
    }
}