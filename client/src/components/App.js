import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import Navbar from './Navbar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import { connect } from 'react-redux';
import  jwt_decode from 'jwt-decode';



// ES6 import or TypeScript
import { io } from "socket.io-client";
import Extra from './Extra';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       endPoint : "http://localhost:5000",
       self:"",
    }
  }
  componentDidMount() {
    //persisting the user do the action and reducers part
    const token = localStorage.getItem('token');
    if(token){
      const user = jwt_decode(token);
      this.props.history.push({pathname:'/dashboard', state:{user,},});
      console.log("token user", user);
    }
  }
  
  
  render() {
    console.log("props store",this.props);
    return (
      <div>
          <div>   
              <Switch>
                <Route exact path="/" render={ () => <HomePage /> }/> 
                <Route exact path="/login" render={ () => <RegisterPage /> }/> 
                <Route exact path="/dashboard" render={ (props) => <Extra {...props}/> }/>                       
              </Switch>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(withRouter(App));

