import React, { Component } from 'react';

export default class RegisterCompo extends Component {
    constructor(props) {
        super(props);
        this.handlesubmit = this.handlesubmit.bind(this);
        this.EmailRegister = this.EmailRegister.bind(this);
        this.UsernameRegister = this.UsernameRegister.bind(this);
        this.PasswordRegister = this.PasswordRegister.bind(this);
        this.state = {
            email: "",
            username: "",
            password: ""
        }
    }
    EmailRegister(event) {
        this.setState({email: event.target.value});
    }
    UsernameRegister(event) {
        this.setState({username: event.target.value});
    }
    PasswordRegister(event) {
        this.setState({password: event.target.value});
    }
    handlesubmit() {
        var data = this.state;
        var url = 'http://localhost:8000/shit';
       fetch( 'http://localhost:8000/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'crossDomain': true,
                'cache-control': 'no-cache'
            },
            async: true,
            body: JSON.stringify(data)
        }).then((response) => {
           response.text().then((data) => {
               console.log(data);
           });
       })
    }
    render() {
        return (
            <div>
                <h1>Register</h1>
                <div>
                    <form onSubmit={this.handlesubmit}>
                        Email: <br></br>
                        <input type="text" name="registeremail" onChange={this.EmailRegister}/>
                        <br></br>
                        Username: <br></br>
                        <input type="text" name="registerusername" onChange={this.UsernameRegister}/>
                        <br></br>
                        Password: <br></br>
                        <input type="password" name="registerpassword" onChange={this.PasswordRegister}/>
                        <br></br>
                        <input type="submit" value="Register" />
                    </form> 
                </div>
            </div>
        );
    }
}