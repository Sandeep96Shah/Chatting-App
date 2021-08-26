import React from 'react';
import '../index.css';

const SignUp = () => {
    return (
        <div className="sign_container">
            <div className="sign_header">
                <h1>{"Sign Up"}</h1>
            </div>
            <div className="form_container">
                <form>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text"
                        name="name"
                    />
                    <label htmlFor="phone">Phone</label>
                    <input 
                        type="number"
                        name="phone"
                    />
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
                    <label htmlFor="confirm_password" >Confirm Password</label>
                    <input 
                        type="password"
                        name="confirm_password"
                    />
                    <div className="submit_btn">
                    <input 
                        type="submit"
                        value="Sign Up"
                        className="submit_btn_input"
                    />
                    <p>Google SignUp</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default  SignUp;