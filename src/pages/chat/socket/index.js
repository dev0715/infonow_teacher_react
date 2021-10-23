import io from 'socket.io-client';
import { CHAT_SOCKET_API_URL } from '../../../helpers/url_helper';

export default io(CHAT_SOCKET_API_URL, {
<<<<<<< HEAD
    // transports: ['websocket', 'polling', 'flashsocket'],
=======
    transports: ['websocket', 'polling', 'flashsocket'],
>>>>>>> 1f54d5c40f993ef8c8cb920904f8b1d46a33d952
    path: '/socket.io',
    "reconnection": true,
    "reconnectionDelay": 100, //Make the xhr connections as fast as possible
    "timeout": 1000 * 60 * 20 // Timeout after 20 minutes
})
