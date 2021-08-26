import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Register = () => {
    return (
        <div className="sign_container sign_top">
            <div className="sign_header">
                <h1>{"Register/SignIn"}</h1>
            </div>
            <div className="form_container">
                <form>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        name="email"
                    />
                    <div className="submit_btn">
                    <Link to="dashboard">
                        <input 
                            type="submit"
                            value="Request For OTP"
                            className="submit_btn_input"
                        />
                    </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default  Register;