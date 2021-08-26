import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
    return (
        <>
        <Link className="link" to="/"><div className="home">Home</div></Link>
        <div className="navbar">
            <div>
                <div className="sign"><Link className="sign_p link" to="/signup"><p>Sign Up</p></Link></div>
                <div className="sign"><Link className="sign_p link" to="/signin"><p>Sign In</p></Link></div>
            </div>
        </div>
        </>
    )
}

export default Navbar;
