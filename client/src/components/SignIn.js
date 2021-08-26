import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const SignIn = () => {
    return (
        <div className="sign_container sign_top">
            <div className="sign_header">
                <h1>{"Sign Up"}</h1>
            </div>
            <div className="form_container">
                <form>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        name="email"
                    />
                    <label htmlFor="password" >Password</label>
                    <input 
                        type="password"
                        name="password"
                    />
                    <div className="submit_btn">
                    <Link to="dashboard">
                        <input 
                            type="submit"
                            value="Sign In"
                            className="submit_btn_input"
                        />
                    </Link>
                    <p>Google SignIn</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default  SignIn;