import { io } from "socket.io-client";
 
export const handleConnect = (name, id) => {
    const socket = io("http://localhost:5000", { transports : ['websocket'] });
    socket.on('connect', () => {
      console.log("connected to the server via Socket.io!");
      socket.emit('joinroom',
            {
                userName: name,
                chatRoom : id, 
            });
            socket.on('user-joined',function(data)
            {
                console.log('a user joined Here',data);
            })
            socket.on('receive_message', function(data){
                console.log("receive_message", data)
            })
           
    })
}

export const handleSendMessage = (msg,id,name) => {
    const socket = io("http://localhost:5000", { transports : ['websocket'] });
    console.log("message", msg);
    console.log("idddddd", id);
    socket.emit('send_message', {
        message: msg,
        name: name,
        chatRoom: id,
    });
}