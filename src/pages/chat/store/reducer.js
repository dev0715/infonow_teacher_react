
import {
  SET_USER,
  GET_CHAT_CONTACTS_SUCCESS,
  GET_CHAT_CONTACTS_FAILURE,
  AUTHORIZED_SUCCESS,
  AUTHORIZED_FAILURE,
  SET_ROOM_JOINED,
  SELECT_CHAT,
  UPDATE_SELECT_CHAT,
  GET_PREVIOUS_MESSAGES_SUCCESS,
  GET_PREVIOUS_MESSAGES_FAILURE,
  NEW_MESSAGE,
  SAVE_NEW_MESSAGE,
  UPDATE_CHAT_HEAD_MESSAGE,
  UPDATE_CHAT_PARTICIPANTS,
  DELETE_MESSAGES
} from './actionTypes'

const initialState = {
  chats: [],
  chatError: "",
  authError: "",
  isAuthorized: false,
  isRoomsJoined: false,
  messages: [],
  userProfile: {},
  selectedChat: {},
  selectedUser: {},
  error: "",
  loading: false,
  user: {}
}


const saveNewMessage = (state, { success, chatId, data, messageId }) => {

  console.log("SAVE MESSAGE REs", { success, chatId, data, messageId })

  state = updateChatHeadMessage(state, { success, chatId, data })

  //Sent message fail
  if (!success && messageId && chatId == state.selectedChat.chatId) {
    let msg = state.messages.find(m => m.messageId == messageId)
    if (msg) {
      msg.error = true;
      console.log("MESSAGE ERROR", state.messages)
    }
  }
  else if (success && messageId && chatId == state.selectedChat.chatId) {
    let msg = state.messages.find(m => m.messageId == messageId)
    if (msg) {
      msg = data;
      console.log("MESSAGE REPLACED", state.messages)
    }
  }
  else if (success && !messageId && chatId == state.selectedChat.chatId) {
    state.messages.push(data)
    console.log("MESSAGE PUSHED", state.messages)
  }

  return state
}


const updateChatHeadMessage = (state, { success, chatId, data }) => {

  if (success) {
    let chat = state.chats.find(c => c.chatId === chatId);
    if (chat)
      chat.messages[0] = data
  }
  return state;
}

const updateChatParticipants = (state, action) => {
  let chatHead = state.chats.find(c => c.chatId === action.payload.chatId);
  if (chatHead) {
    chatHead.chatParticipants = action.payload.data
  }
  return state.chats
}

const updateSelectChat = (state, action) => {
  state.selectedChat.chatParticipants = action.payload
  return state.selectedChat
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_USER:
      return { ...state, user: action.payload }

    case GET_CHAT_CONTACTS_SUCCESS:
      return { ...state, chats: action.payload, chatsError: {} }

    case GET_CHAT_CONTACTS_FAILURE:
      return { ...state, chats: [], chatsError: action.payload }

    case AUTHORIZED_SUCCESS:
      return { ...state, isAuthorized: true, authError: "" }

    case AUTHORIZED_FAILURE:
      return { ...state, isAuthorized: false, authError: action.payload }

    case SET_ROOM_JOINED:
      return { ...state, isRoomsJoined: true }

    case SELECT_CHAT:
      return { ...state, selectedChat: action.payload, messages: [] }

    case UPDATE_SELECT_CHAT:
      return { ...state, selectedChat: updateSelectChat(state, action) }

    case GET_PREVIOUS_MESSAGES_SUCCESS:
      return { ...state, messages: [...action.payload, ...state.messages] }

    case GET_PREVIOUS_MESSAGES_FAILURE:
      return { ...state, messagesError: action.payload }

    case NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] }

    case SAVE_NEW_MESSAGE:
      return saveNewMessage(state, action.payload)

    case UPDATE_CHAT_HEAD_MESSAGE:
      return updateChatHeadMessage(state, action.payload)

    case UPDATE_CHAT_PARTICIPANTS:

      return { ...state, chats: updateChatParticipants(state, action) }

    case DELETE_MESSAGES:
      return { ...state, messages: action.payload }

    default:
      return state
  }
}

export default chatReducer
