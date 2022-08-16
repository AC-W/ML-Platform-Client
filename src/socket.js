import socketio from "socket.io-client";
const socket = socketio.connect("https://ml-platform-server.herokuapp.com");
export default socket