import io from 'socket.io-client';
export default io('http://192.168.10.104:3701', { transports: ['websocket', 'polling', 'flashsocket'] })