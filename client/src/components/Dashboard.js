import React, { Component } from 'react';
import Fuse from 'fuse.js';
import { io } from "socket.io-client";
import { Link, withRouter } from 'react-router-dom';
import '../index.css';
import { handleConnect } from '../socket/Chat_socket';
//
import { APIUrls } from '../helpers/apis';
import { getAuthTokenFromLocalStorage,getFormBody } from '../helpers/utils';
import Friends from './Friends';
import { connect } from 'react-redux';
import Searched from './Searched';

import { makeFriend, show_users, show_friends } from '../actions/index';




 class Dashboard extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              name:this.props.location.state.user.name,
              searched:[],
              result:false,
              id:this.props.location.state.user._id,
              search:"",
         }
     }
     

    // fuzzy = (search ,friends) => {
    //     let fuse;
    //    if(friends){
    //     fuse = new Fuse(friends, {
    //         keys: [
    //           'name',
    //         ],
    //         includeScore:true,
    //     });
    //    }
    //     const results = fuse.search(search);
    //     console.log("Resulttttt", results);
    // }
    
    componentDidMount() {

        this.props.dispatch(show_users());
        this.props.dispatch(show_friends());
    }

     clickHandle = (name, id) => {
        // const socket = io("http://localhost:5000", { transports : ['websocket'] });
        // console.log("this",this);
        // let self = this;
        // socket.on('connect', () => {
        //   console.log("connected to the server via Socket.io!");
        //   socket.emit('joinroom',
        //         {
        //             userName: name,
        //             chatRoom : id, 
        //         });
        //         socket.on('user-joined',function(data)
        //         {
        //             console.log('a user joined',data);
        //         })
        // })
        handleConnect(name,id);
    }

    handleSignOut= () => {
        localStorage.removeItem('token');
    }

    handleName = (e) => {
        this.setState({
            search:e.target.value,
        })
    }

    handleSearch = (e) => {
        e.preventDefault();
        // const name = this.state.name;
        // const url = APIUrls.search(this.state.name);
        // fetch(url, {
        //   method: 'POST',
        //   mode : 'cors',
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
        //   },
        //   body: getFormBody({ name }),
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log('data', data);
        //     // dispatch action to save user
        //     // dispatch(signIn_progress(data.isVerified));
        //     console.log("Searched Data Receuved", data);
        //     this.setState({
        //         searched:data.friends,
        //         result:true,
        //     })
        //   })
        //   .catch((err)=>{
        //       console.log("error Receuved",err);
        //   })
    }

    handleSearched = () => {
        this.setState({
            result:false,
            searched:[],
        })
    }

    handleAddFriend = (id) => {
        this.props.dispatch(makeFriend(this.state.id, id));
        //searching for the user id in the current friends list and based on that do the reducer part
        const index = this.state.friends.findIndex(friend => friend.id === id);
        console.log("index", index);
        if(index!=-1){
            this.state.friends.push(id);
        }
        console.log("friendship done");
    }

    render() {
        console.log("new props", this.props);
        console.log("State Info", this.state);
        const { friends, allusers } = this.props.friends;
        const { name } = this.props.location.state.user;

        return (
            <>
            <div className="dashboard">
            <Link to="/login"><div className="logout" onClick={ () => this.handleSignOut() }>LogOut</div></Link>
                <div className="friendsList" >
                    <div className="friends_header" >
                        <input type="text" name="search" onChange={ (e) => this.handleName(e) } placeholder="Search Friend" />
                        <button onClick={ (e) => this.handleSearch(e) }>Search</button>
                    </div>
                    {
                        this.state.result && 
                        <div className="close" onClick={ () => this.handleSearched() }>Close</div>
                    }
                    
                    { 
                        this.state.result && 
                        <div className="searched">{
                        this.state.searched.map((search) => <Searched key={search._id} handleAddFriend={this.handleAddFriend} name={search.name} id={search._id} clickHandle={this.clickHandle}/>)
                        }</div>
                    }
                    <div className="friends">
                        {
                            friends.map((friend) => <Friends clickHandle={this.clickHandle}  key={friend._id} name={friend.name} id={friend._id}/>)
                        }
                    </div>
                </div>
                <div className="message_container">
                    <p>{name}</p>
                    <div>
                        <div className="message"></div>
                        <div className="type_message">
                            <input 
                            type="text"
                            name="message"
                            placeholder="Type Your Message"
                            />
                            <button>Send</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

function mapStateToprops(state){
    return{
       auth:state.auth, 
       friends:state.friends
    }
}

export default connect(mapStateToprops)(withRouter(Dashboard));
