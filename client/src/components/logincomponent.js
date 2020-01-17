import React, { Component } from 'react';

export default class LoginCompo extends Component {
    constructor(props) {
        super(props);
        this.EmailOnchange = this.EmailOnchange.bind(this);
        this.PasswordOnchange = this.PasswordOnchange.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }

    EmailOnchange(event) {
        this.setState({email: event.target.value});
    }
    PasswordOnchange(event) {
        this.setState({password: event.target.value});
    }
    handlesubmit() {
        let data = this.state;
        fetch( 'http://localhost:8000/login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Response promise reached");
            console.log(res.status);
            if (res.status === 200) {
                this.props.history.push('/memeboard');
            }
        }).catch(err => {
                console.error(err);
            });
    }


    render() {

        return(
            <div>
                <h1>Login</h1>
                <div>
                    <form onSubmit={this.handlesubmit}>
                        email: <br></br>
                        <input type="text" name="email" onChange={this.EmailOnchange}/>
                        <br></br>
                        password: <br></br>
                        <input type="password" name="password" onChange={this.PasswordOnchange}/>
                        <br></br>
                        <input type="submit" value="Login"/>
                    </form>
                </div>
                <h2>Don't have an account? Register by clicking the button below</h2>
                <button type="button">Register</button>
            </div>
        );
    }
}