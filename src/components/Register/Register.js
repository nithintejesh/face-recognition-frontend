import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Updated submit function to simulate success
    submit = (e) => {
        e.preventDefault();
        
        // Simulating a successful response from the backend
        const mockResponse = {
            data: {
                success: true,
                msg: 'Registration successful'
            }
        };

        // Handling the mock response
        if (mockResponse.data.success) {
            this.props.onRouteChange('signin'); // Assuming this will redirect to the Sign In page
            console.log('Registration successful:', mockResponse);
        } else {
            var msg = document.getElementById('msg');
            msg.style.visibility = "visible";
            msg.innerHTML = mockResponse.data.msg;
        }
        // If you want to test the actual API call, uncomment the code below:
        axios.post('https://face-recognition-backend-nine.vercel.app/api/user/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if (res.data.success) {
                this.props.onRouteChange('signin');
                console.log(res);
            } else {
                var msg = document.getElementById('msg');
                msg.style.visibility = "visible";
                msg.innerHTML = res.data.msg;
            }
        }).catch(err => {
            console.log(err);
        });
        
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5" style={{boxShadow: "2px 2px 5px #888888"}}>
                <div className="center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <label className="db fw6 lh-copy red f5" style={{visibility:"hidden"}} id="msg"></label>
                                <legend className="f1 fw6 ph0 white mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy white f5" htmlFor="name">Name</label>
                                    <input className="b pa2 input-reset ba b--white bg-black white hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name"
                                    required
                                    onChange={e => this.change(e)} />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy white f5" htmlFor="email-address">Email</label>
                                    <input className="b pa2 input-reset ba b--white bg-black white hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email"  
                                    id="email"    
                                    required
                                    onChange={e => this.change(e)} />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy white f5" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset ba b--white bg-black white hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    required
                                    onChange={e => this.change(e)} />
                                </div>
                            </fieldset>
                            <div className="lh-copy mt3">
                                <a href="#0" onClick={(e) => this.submit(e)} className="f5 link dim white db">Register</a>
                            </div>
                        </div>
                    </main>
                </div>
            </article>
        )
    }
}

export default Register;
