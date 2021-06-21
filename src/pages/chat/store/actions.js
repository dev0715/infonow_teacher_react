import {
  SET_USER,
  GET_CHAT_CONTACTS,
  GET_CHAT_CONTACTS_SUCCESS,
  GET_CHAT_CONTACTS_FAILURE,
  AUTHORIZED_SUCCESS,
  AUTHORIZED_FAILURE,
  API_ERROR,
  SET_ROOM_JOINED,
  SELECT_CHAT,
  UPDATE_SELECT_CHAT,
  GET_PREVIOUS_MESSAGES,
  GET_PREVIOUS_MESSAGES_SUCCESS,
  GET_PREVIOUS_MESSAGES_FAILURE,
  NEW_MESSAGE,
  SAVE_NEW_MESSAGE,
  UPDATE_CHAT_HEAD_MESSAGE,
  UPDATE_CHAT_PARTICIPANTS,
  DELETE_MESSAGES
} from './actionTypes'


export const setLoggedUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}

export const getChatContacts = (userId) => {
  return {
    type: GET_CHAT_CONTACTS,
    payload: { userId }
  }
}

export const getChatContactsSuccess = (headList) => {
  return {
    type: GET_CHAT_CONTACTS_SUCCESS,
    payload: headList
  }
}

export const getChatContactsFailure = () => {
  return {
    type: GET_CHAT_CONTACTS_FAILURE
  }
}

export const authorizedSuccess = () => {
  return {
    type: AUTHORIZED_SUCCESS
  }
}

export const authorizedFailure = (error) => {
  return {
    type: AUTHORIZED_FAILURE,
    payload: error
  }
}

export const setRoomJoined = () => {
  return {
    type: SET_ROOM_JOINED,
  }
}

export const selectChat = (chat) => {
  return {
    type: SELECT_CHAT,
    payload: chat
  }
}

export const updateSelectChat = (data) => {
  return {
    type: UPDATE_SELECT_CHAT,
    payload: data
  }
}

export const getPreviousMessages = (chatId, timeStamp) => {
  return {
    type: GET_PREVIOUS_MESSAGES,
    payload: { chatId, timeStamp }
  }
}

export const getPreviousMessagesSuccess = (messages) => {
  return {
    type: GET_PREVIOUS_MESSAGES_SUCCESS,
    payload: messages
  }
}

export const getPreviousMessagesFailure = (error) => {
  return {
    type: GET_PREVIOUS_MESSAGES_FAILURE,
    payload: error
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const newMessage = (msg) => {
  return {
    type: NEW_MESSAGE,
    payload: msg
  }
}

export const saveNewMessage = (res) => {
  return {
    type: SAVE_NEW_MESSAGE,
    payload: res
  }
}


export const updateChatHeadMessage = ({ success, chatId, data }) => {
  return {
    type: UPDATE_CHAT_HEAD_MESSAGE,
    payload: { success, chatId, data }
  }
}

export const updateChatParticipants = (data) => {
  return {
    type: UPDATE_CHAT_PARTICIPANTS,
    payload: data
  }
}

export const deleteMessages = (data) => {
  return {
    type: DELETE_MESSAGES,
    payload: data
  }
}

