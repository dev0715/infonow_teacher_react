import io from 'socket.io-client';
import { CHAT_SOCKET_API_URL } from '../../../helpers/url_helper';

export default io(CHAT_SOCKET_API_URL, { transports: ['websocket', 'polling', 'flashsocket'] })