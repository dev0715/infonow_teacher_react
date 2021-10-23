import io from 'socket.io-client';
import { CHAT_SOCKET_API_URL } from '../../../helpers/url_helper';

export default io(CHAT_SOCKET_API_URL, {
    // transports: ['websocket', 'polling', 'flashsocket'],
    path: '/socket.io',
    "reconnection": true,
    "reconnectionDelay": 100, //Make the xhr connections as fast as possible
    "timeout": 1000 * 60 * 20 // Timeout after 20 minutes
})
