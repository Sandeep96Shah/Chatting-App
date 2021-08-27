import React from 'react';
import { connect } from 'react-redux';
import '../index.css';
import { getChatroom, add_message } from '../actions';
import { useEffect, useState } from 'react';
import { handleSendMessage } from '../socket/Chat_socket';

//chatroom id todo later
 const Friends = (props) => {
    const {to, name, clickHandle, dispatch, from} = props;
    const [ chatroom, setChatroom] = useState();
     useEffect(() => {
        dispatch(getChatroom(to, setChatroom));
        console.log("dispatch friend");
     },[]);
     console.log("chatroooom", chatroom);
    //  const handleMessage = () => {
    //      console.log("chatroooom", chatroom);
    //     //  console.log("idddd", id);
    //     // dispatch(add_message(send, id));
    //     // handleSendMessage(send, chatroom, name);
        //do the reducer part later
    //}
    return (
        <>
            <div><p onClick={ () => clickHandle(name, chatroom, to, from) }>{name}</p></div>
            {/* <input type="text" value={send} onChange={ (e) => setSend(e.target.value) }/>
            <button onClick={ () => handleMessage() } >Send</button> */}
        </>
    )
}

function mapStateToprops(state){
    return{
       auth:state.auth,
       friends:state.friends,
       messages:state.messages,
    }
}

export default connect(mapStateToprops)(Friends);
