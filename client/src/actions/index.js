import { SHOW_FRIENDS, SHOW_USERS, ADD_FRIEND, PRIVATE_MESSAGE, USER, ADD_MESSAGE, SIGNIN_PROGRESS, SIGNIN_SUCCESS, FRIENDSHIP } from "./actionTypes";
import { APIUrls } from '../helpers/apis';
import { getFormBody } from '../helpers/utils';
import {getAuthTokenFromLocalStorage} from '../helpers/utils';

//related to the users
export function allUsers(data){
    return {
        type:SHOW_USERS,
        payload:data,
    }
}

export function usersFriends(data){
    return {
        type:SHOW_FRIENDS,
        payload:data
    }
}

export function show_friends(){
    return (dispatch) => {
        const url = APIUrls.friends();
        console.log("friendsss", url);
        fetch(url, {
            method:'GET',
            mode:"cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
        })
        .then((response) => response.json())
        .then(data => {
            console.log("userss friendsss", data.friends.friends)
            dispatch(usersFriends(data.friends.friends));
        })
        .catch(error => console.log("error", error));
    }
}

export function show_users(){
    return (dispatch) => {
        const url = APIUrls.users();
        console.log("friendsss", url);
        fetch(url, {
            method:'GET',
            mode:"cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
        })
        .then((response) => response.json())
        .then(data => {
            console.log("alllll", data.users);
            dispatch(allUsers(data.users));
        })
        .catch(error => console.log("error", error));
    }
}

export function add_friends(data){
    return {
        type:ADD_FRIEND,
        payload:data,
    }
}

//related to messages
export function private_message(msg){
    return {
        type:PRIVATE_MESSAGE,
        payload:msg,
    }
}

export function addMessage(data){
    return {
        type:ADD_MESSAGE,
        payload:data,
    }
}
//to do the reducer part 
export function add_message(message, to){
    return (dispatch)=>{
        const url = APIUrls.addMessage(to);
        fetch(url, {
            method:'POST',
            mode:"cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            body : getFormBody({ message  })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('data add message', data.message);
            //dispatch(addMessage(data.message))
            return;
        })
        .catch((err)=>{
            console.log("error",err);
        })
    }
}

//related to user register/signin
export function user(email){
    return (dispatch) => {
        const url = APIUrls.signIn();
        fetch(url, {
          method: 'POST',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: getFormBody({ email }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('data', data);
            if (data.success) {
                // dispatch action to save user
                dispatch(signIn_progress(data.isVerified));
                return;
              }
          })
          .catch((err)=>{
              console.log("error",err);
          })
      };
}

export function user_validate(token, email, history, name){
    return (dispatch)=>{
        const url = APIUrls.validate();
        fetch(url, {
            method:'POST',
            mode:"cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : getFormBody({ token, email, name })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('data', data);
            // console.log("user data", data.user._id);
            // console.log("user data", typeof(data.user._id));
            // console.log("user data", typeof(data.user.name));
            if (data.success) {
                // dispatch action to save user
                //console.log("yahoo");
                localStorage.setItem('token', data.data.token);
                console.log("data.user", data);
                dispatch(signIn_success(data.user));
                history.push({pathname:'/dashboard', state:{user:data.user}});
                return;
              }
        })
        .catch((err)=>{
            console.log("error",err);
        })
    }
}

export function signIn_progress(isVerified){
    return {
        type: SIGNIN_PROGRESS,
        isVerified,
    }
}

export function signIn_success(user){
    return {
        type:SIGNIN_SUCCESS,
        payload:user,
    }
}

export function friendship(data){
    return{
        type:FRIENDSHIP,
        payload:data
    }
}

export function makeFriend(from,to){
    //console.log("Friendshpppppppp");
    return (dispatch) => {
        const url = APIUrls.makeFriend(from, to);
        fetch(url, {
          method: 'POST',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
          },
          body: getFormBody({ from, to }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('data', data);
            if (data.success) {
                // dispatch action to save user
                // dispatch(signIn_progress(data.isVerified));
                dispatch(friendship(data.users));
               // console.log("Searched Data Receuved", data);
                return;
              }
          })
          .catch((err)=>{
              console.log("error Receuved",err);
          })
      };
}



export function getChatroom(to, setChatroom){
    console.log("Friendshpppppppp");
    return (dispatch) => {
        const url = APIUrls.privateMessage(to);
        fetch(url, {
          method: 'GET',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
             console.log('data chatroom', data.pm[0]);
             setChatroom(data.pm[0]._id);
            // console.log('data chatroom', data.pm[0]._id);
            //dispatch(private_message(data.pm[0]._id, data.pm[0].messages));

            if (data.success) {
                
                console.log("chatroommmmmmm", data);
                return;
              }
          })
          .catch((err)=>{
              console.log("chatrommmmmm error Receuved",err);
          })
      };
}



export function privateMessage(to){
    console.log("Friendshpppppppp");
    return (dispatch) => {
        const url = APIUrls.privateMessage(to);
        fetch(url, {
          method: 'GET',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
             console.log('data chatroom', data.pm[0]);
            // console.log('data chatroom', data.pm[0]._id);
            dispatch(private_message(data.pm[0].messages));

            if (data.success) {
                
                console.log("chatroommmmmmm", data);
                return;
              }
          })
          .catch((err)=>{
              console.log("chatrommmmmm error Receuved",err);
          })
      };
}

