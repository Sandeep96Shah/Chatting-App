import React from 'react';
import { useHistory, Link } from 'react-router-dom';

 const HomePage = () => {
     const history = useHistory();
    return (
        <>
            <Link to="/login"><div className="register"><p>Register/SignIn</p></div></Link>
            <div className="navbar">
                <div><p>WelCome To The World Of Love</p></div>
            </div>
            <div className="homepage_container">
                <div className="homepage_title">
                    <p>
                        The Internet: transforming society and shaping the future through Chat!
                    </p>
                </div>
            </div>
        </>
    )
}

export default HomePage;
