import React from 'react';
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Socket Imports
import socket from './socket'

// ** Chat App Component Imports
import Chat from './Chat'
import Sidebar from './SidebarLeft'
import UserProfileSidebar from './UserProfileSidebar'

// ** Third Party Components
import classnames from 'classnames'

// ** Store & Actions
import { connect, useSelector } from 'react-redux'
import {
  setLoggedUser,
  getChatContacts, authorizedSuccess, authorizedFailure,
  setRoomJoined, selectChat, updateSelectChat,
  getPreviousMessagesSuccess, getPreviousMessagesFailure,
  newMessage, saveNewMessage,
  updateChatHeadMessage, updateChatParticipants,
  deleteMessages
} from './store/actions'

import '@styles/base/pages/app-chat.scss'
import '@styles/base/pages/app-chat-list.scss'
import { withRouter } from 'react-router';
import { IOEvents } from './socket/eventTypes.js';
import { attachEvents } from './socket/events';
import { getLoggedInUser } from '../../helpers/backend-helpers'

const AppChat = (props) => {
  // ** Store Vars
  const store = useSelector(state => state.Chat)


  // ** States
  const [user, setUser] = useState({})
  const [sidebar, setSidebar] = useState(false)
  const [userSidebarRight, setUserSidebarRight] = useState(false)
  const [userSidebarLeft, setUserSidebarLeft] = useState(false)

  // ** Sidebar & overlay toggle functions
  const handleSidebar = () => setSidebar(!sidebar)
  const handleUserSidebarLeft = () => setUserSidebarLeft(!userSidebarLeft)
  const handleUserSidebarRight = () => setUserSidebarRight(!userSidebarRight)
  const handleOverlayClick = () => {
    setSidebar(false)
    setUserSidebarRight(false)
    setUserSidebarLeft(false)
  }

  // ** Set user function for Right Sidebar
  const handleUser = obj => setUser(obj)

  // ** Get data on Mount



  useEffect(() => {
    props.setLoggedUser(getLoggedInUser() || {})
    attachEvents(socket, props)
  }, [])

  useEffect(() => {
    if (!props.isRoomJoined) {
      for (var chat of props.chats) {
        socket.emit(IOEvents.JOIN_ROOM, { chatId: chat.chatId })
      }
      props.setRoomJoined()
    }
  }, [props.chats])


  return (
    <Fragment>
      <Sidebar
        socket={socket}
        user={props.user}
        chats={props.chats}
        selectedChat={props.selectedChat}
        selectChat={props.selectChat}
        sidebar={sidebar}
        handleSidebar={handleSidebar}
        userSidebarLeft={userSidebarLeft}
        handleUserSidebarLeft={handleUserSidebarLeft}
      />
      <div className='content-right'>
        <div className='content-wrapper'>
          <div className='content-body'>
            <div
              className={classnames('body-content-overlay', {
                show: userSidebarRight === true || sidebar === true || userSidebarLeft === true
              })}
              onClick={handleOverlayClick}
            ></div>
            <Chat
              socket={socket}
              messages={props.messages}
              selectedChat={props.selectedChat}
              selectedUser={props.selectedUser}
              user={props.user}
              newMessage={props.newMessage}
              handleUser={handleUser}
              handleSidebar={handleSidebar}
              userSidebarLeft={userSidebarLeft}
              handleUserSidebarRight={handleUserSidebarRight}
            />
            <UserProfileSidebar
              user={user}
              userSidebarRight={userSidebarRight}
              handleUserSidebarRight={handleUserSidebarRight}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {

  const {
    error,
    user,
    chats,
    chatError,
    authError,
    isAuthorized,
    isRoomJoined,
    selectedChat,
    selectedUser,
    messages
  } = state.Chat;
  return {
    error,
    user,
    chats,
    chatError,
    authError,
    isAuthorized,
    isRoomJoined,
    selectedChat,
    selectedUser,
    messages
  }
}

export default withRouter(
  connect(mapStateToProps, {
    setLoggedUser,
    getChatContacts, authorizedSuccess, authorizedFailure, saveNewMessage,
    setRoomJoined, selectChat, updateSelectChat,
    getPreviousMessagesSuccess, getPreviousMessagesFailure,
    newMessage,
    updateChatHeadMessage, updateChatParticipants,
    deleteMessages
  })(AppChat)
)
