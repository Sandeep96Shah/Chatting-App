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

import { makeFriend, show_users, show_friends, add_message, privateMessage } from '../actions/index';
import { useState, useEffect } from 'react';
import PrivateMessage from './PrivateMessage';

const Extra = (props) => {

    const [message, setMessage] =useState("");
    const [search, setSearch] = useState("");
    const [chatroom, setChatroom] = useState(null);
    const [ to, setTo] = useState(null);
     
    
   useEffect(() => {
        props.dispatch(show_users());
        props.dispatch(show_friends());
   },[search])

   const fuse = new Fuse(props.friends.users, {
    keys: [
      'name',
    ],
    includeScore: true
  });
  const results = fuse.search(search);
    const characterResults = results.map(character => character.item);

     const clickHandle = (name, id, to) => {
         console.log("toooo", to);
         console.log("frommmm", props.location.state.user._id );
         setChatroom(id);
         setTo(to);
        console.log("fetching the messages from the DB!", id, to);
        props.dispatch(privateMessage(to));
        handleConnect(name,id);
    }

    const sendMessage = (from) => {
        if(message == ""){
            alert("please type something!");
        }
        if(chatroom == null){
            alert("please select your friend to send message!");
            setMessage("");
        }
        props.dispatch(add_message(message, to))
        setMessage("");
        console.log("messageeeee", chatroom, from);
    }

    const handleSignOut= () => {
        localStorage.removeItem('token');
    }

    const handleName = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if(characterResults.length==0){
            alert("No User Found");
        }
    }

    const handleSearched = () => {
        setSearch("");
    }

    const handleAddFriend = (id) => {
        //searching for the user id in the current friends list and based on that do the reducer part
        const index = props.friends.friends.findIndex(friend => friend._id === id);
        //console.log("index", index);
        if(index == -1){
            props.dispatch(makeFriend(props.location.state.user._id, id));
            //do it later reducers part
        }else{
            alert("Friendship Already Exists!");
        }
    }

        console.log("new props", props);
        //console.log("State Info", this.state);
        const { friends, allusers } = props.friends;
        const { name, _id } = props.location.state.user;
        console.log("_id_id", _id);

        return (
            <>
            <div className="dashboard">
            <Link to="/login"><div className="logout" onClick={ () => handleSignOut() }>LogOut</div></Link>
                <div className="friendsList" >
                    <div className="friends_header" >
                        <input type="text" value={search} onChange={ (e) => handleName(e) } placeholder="Search Friend" />
                        <button onClick={ (e) => handleSearch(e) }>Search</button>
                    </div>
                    {
                        characterResults.length>0 && 
                        <div className="close" onClick={ () => handleSearched() }>Close</div>
                    }
                    
                    { 
                        characterResults.length>0 &&  
                        <div className="searched">{
                            characterResults.map((search) => <Searched key={search._id} handleAddFriend={handleAddFriend} name={search.name} id={search._id} clickHandle={clickHandle}/>)
                        }</div>
                    }
                    <div className="friends">
                        {
                            friends.map((friend,index) => <Friends dispatch={props.dispatch} clickHandle={clickHandle}  key={friend._id} name={friend.name} to={friend._id}/>)
                        }
                    </div>
                </div>
                <div className="message_container">
                    <p className="message_container_p">{name}</p>
                    <div>
                        <div className="message">
                            { 
                                props.messages.messages.map((pm) => (
                                    pm._id == _id ? <p className="self_message">{pm.msg}</p> :
                                    <p className="other_message">{pm.msg}</p>
                                ) )
                            }
                        </div>
                        <div className="type_message">
                            <input 
                            type="text"
                            name="message"
                            placeholder="Type Your Message"
                            onChange={ (e) => setMessage(e.target.value) }
                            value={message}
                            />
                            <button  onClick={ () => sendMessage(_id) }>Send</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
}

function mapStateToprops(state){
    return{
       auth:state.auth, 
       friends:state.friends,
       messages:state.messages
    }
}

export default connect(mapStateToprops)(Extra);
