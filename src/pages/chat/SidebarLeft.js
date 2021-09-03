import React from 'react';
// ** React Imports
import { useState, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { formatDateToMonthShort } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { X, Search, Bell, Plus } from 'react-feather'
import {
  CardText, InputGroup, InputGroupAddon,
  Input, InputGroupText, CustomInput,
  Modal, ModalBody, Row, Col,
  Button, UncontrolledDropdown,
  DropdownItem, DropdownMenu, DropdownToggle,
  FormGroup, Label
} from 'reactstrap'


import UILoader from '../../@core/components/ui-loader';


import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';

import { notifyError, notifySuccess, notifyWarning } from '../../utility/toast'

import { GET_IMAGE_URL } from './../../helpers/url_helper';

import { getPreviousMessages } from './socket/events'


const SidebarLeft = props => {
  // ** Props & Store
  const { sidebar, handleUserSidebarLeft, handleSidebar, userSidebarLeft, socket, store } = props

  const {
    setNotificationEnabled,
    isNotificationEnabled,
    selectChat,
    selectedChat,
    user,
    chats,
    chatLoading,
    updateAbout,
    newChatLoading,
    newChatError,
    createChat,
    getAllTeacherStudents,
    teacherStudents,
    teacherStudentsLoading,
    teacherStudentsError,
  } = store

  // ** State
  const [about, setAbout] = useState('')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState({})
  const [status, setStatus] = useState('online')
  const [filteredChat, setFilteredChat] = useState([])

  const [isNewChat, setIsNewChat] = useState(false)
  const [isNewChatGroup, setIsNewChatGroup] = useState(false)

  const [groupName, setGroupName] = useState('')
  const [participants, setParticipants] = useState([])

  // ** Handles User Chat Click
  const handleUserClick = (chat, socket) => {
    selectChat(chat)
    getPreviousMessages(socket, chat.chatId)
  }


  useEffect(() => {
    if (isNewChat && !newChatLoading && newChatError) {
      notifyError("New Chat", newChatError)
    }
    else if (isNewChat && !newChatLoading && !newChatError) {
      notifySuccess("New Chat", 'Chat started Successfully')
    }
  }, [newChatLoading])

  useEffect(() => {
    if (isNewChatGroup && !newChatLoading && newChatError) {
      notifyError("New Group Chat", newChatError)
    }
    else if (isNewChatGroup && !newChatLoading && !newChatError) {
      closeNewChat()
      notifySuccess("New Group Chat", 'Chat started Successfully')
    }
  }, [newChatLoading])

  // ** Renders Chat
  const renderChats = () => {

    if (chats && chats.length) {
      if (query.length && !filteredChat.length) {
        return (
          <li className='no-results show'>
            <h6 className='mb-0'>No Chats Found</h6>
          </li>
        )
      } else {
        const arrToMap = query.length && filteredChat.length ? filteredChat : chats

        return arrToMap.map(item => {
          const time = formatDateToMonthShort(item.messages.length > 0 ? item.messages[0].createdAt : new Date())

          return (
            <li
              className={item.chatId == selectedChat.chatId ? "active" : ""}
              key={item.chatId}
              onClick={() => handleUserClick(item, socket)}
            >
              <Avatar
                img={GET_IMAGE_URL(item.type == 'group'
                  ? item.groupPicture || null
                  : item.chatParticipants.find(u => u.user.userId != user.userId).user.profilePicture)
                }
                imgHeight='42' imgWidth='42' status={item.status} />
              <div className='chat-info flex-grow-1'>
                <h5 className='mb-0'>
                  {item.type == 'group'
                    ? item.groupName
                    : item.chatParticipants.find(u => u.user.userId != user.userId).user.name}
                </h5>
                <CardText className='text-truncate'>
                  {
                    item.chatParticipants.find(u => u.user.userId == user.userId && !u.blockedAt) ?
                      <>
                        {item.messages.length > 0 ? item.messages[0].content : ''}
                      </>
                      :
                      '...'
                  }
                </CardText>
              </div>
              <div className='chat-meta text-nowrap'>
                <small className='float-right mb-25 chat-time ml-25'>{time}</small>
                {/* {item.chat.unseenMsgs >= 1 ? (
                  <Badge className='float-right' color='danger' pill>
                    {item.chat.unseenMsgs}
                  </Badge>
                ) : null} */}
              </div>
            </li>
          )
        })
      }
    } else {
      return null
    }
  }

  // ** Handles Filter
  const handleFilter = e => {
    setQuery(e.target.value)
    let val = e.target.value || "";
    const searchFilterFunction = chat => chat.chatParticipants.find(p => p.user.name.toLowerCase().includes(val.toLowerCase())) ||
      (chat.groupName || "").toLowerCase().includes(val.toLowerCase())

    const filteredChatsArr = chats.filter(searchFilterFunction)
    setFilteredChat([...filteredChatsArr])
  }

  const onNotificationChange = (e) => {
    console.log(e.target.checked)
    setNotificationEnabled(e.target.checked)
  }

  const saveAbout = (e) => {
    e.preventDefault()
    console.log("ABOUT___", e.target.value)
    updateAbout({ about: e.target.value })
  }

  const getChatByUserId = (id) => {
    return chats
      .filter(ct => ct.type == "chat")
      .find(c => c.chatParticipants.find(p => p.user.userId == id))
  }
  const openNewChatModel = (e, group = false) => {
    e.preventDefault()
    group ? setIsNewChatGroup(true) : setIsNewChat(true)
    getAllTeacherStudents();
  }

  const closeNewChat = () => {
    setIsNewChat(false)
    setIsNewChatGroup(false)
    setGroupName('')
    setParticipants([])
  }

  const startNewChat = (id) => {
    createChat({
      participants: [id],
      type: "chat"
    })
  }

  const toggleUserFromGroup = (userId) => {
    if (participants.find(id => id == userId)) return setParticipants(participants.filter(id => id != userId))
    setParticipants([...participants, userId])
  }

  const startNewGroupChat = () => {
    if (!groupName) return notifyWarning("New Group Chat", "Group name is required")
    if (participants.length == 0) return notifyWarning("New Group Chat", "Participants are required for group creation")
    createChat({
      participants,
      type: "group",
      groupName
    })
  }


  return (
    <div className='sidebar-left'>
      <div className='sidebar'>
        <div
          className={classnames('chat-profile-sidebar', {
            show: userSidebarLeft
          })}
        >
          <header className='chat-profile-header'>
            <div className='close-icon' onClick={handleUserSidebarLeft}>
              <X size={14} />
            </div>
            <div className='header-profile-sidebar'>
              <Avatar className='box-shadow-1 avatar-border'
                img={GET_IMAGE_URL(user.profilePicture)}
                status={status}
                size='xl' />
              <h4 className='chat-user-name'>{user.name}</h4>
              {/* <span className='user-post'>{user.role}</span> */}
            </div>
          </header>
          <PerfectScrollbar className='profile-sidebar-area' options={{ wheelPropagation: false }}>
            <h6 className='section-label mb-1'>About</h6>
            <div className='about-user'>
              <Input
                rows='5'
                defaultValue={user.about}
                type='textarea'
                onBlur={e => saveAbout(e)}
                onChange={e => setAbout(e.target.value)}
                className={classnames('char-textarea', {
                  'text-danger': about && about.length > 120
                })}
              />
              <small className='counter-value float-right'>
                <span className='char-count'>{user.about ? user.about.length : 0}</span>/ 120
              </small>
            </div>
            <h6 className='section-label mb-1 mt-3'>Status</h6>
            <ul className='list-unstyled user-status'>
              <li className='pb-1'>
                <CustomInput
                  type='radio'
                  className='custom-control-primary'
                  id='online'
                  label='Online'
                  onChange={e => setStatus('online')}
                  checked={status === 'online'}
                />
              </li>
              <li className='pb-1'>
                <CustomInput
                  type='radio'
                  className='custom-control-danger'
                  id='busy'
                  label='Do Not Disturb'
                  onChange={e => setStatus('busy')}
                  checked={status === 'busy'}
                />
              </li>
              <li className='pb-1'>
                <CustomInput
                  type='radio'
                  className='custom-control-warning'
                  id='away'
                  label='Away'
                  onChange={e => setStatus('away')}
                  checked={status === 'away'}
                />
              </li>
              <li className='pb-1'>
                <CustomInput
                  type='radio'
                  className='custom-control-secondary'
                  id='offline'
                  label='Offline'
                  onChange={e => setStatus('offline')}
                  checked={status === 'offline'}
                />
              </li>
            </ul>
            <h6 className='section-label mb-1 mt-2'>Settings</h6>
            <ul className='list-unstyled'>
              <li className='d-flex justify-content-between align-items-center mb-1'>
                <div className='d-flex align-items-center'>
                  <Bell className='mr-75' size='18' />
                  <span className='align-middle'>Notification</span>
                </div>
                <CustomInput
                  type='switch'
                  defaultChecked={isNotificationEnabled}
                  id='notifications'
                  name='notifications'
                  label=''
                  onChange={onNotificationChange} />
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
        <div
          className={classnames('sidebar-content', {
            show: sidebar === true
          })}
        >
          <div className='sidebar-close-icon' onClick={handleSidebar}>
            <X size={14} />
          </div>
          <div className='chat-fixed-search'>
            <div className='d-flex align-items-center w-100'>
              <div className='sidebar-profile-toggle' onClick={handleUserSidebarLeft}>
                {Object.keys(user).length ? (
                  <Avatar
                    className='avatar-border'
                    img={GET_IMAGE_URL(user.profilePicture || null)}
                    status={status}
                    imgHeight='42'
                    imgWidth='42'
                  />
                ) : null}
              </div>
              <InputGroup className='input-group-merge ml-1 w-100'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText className='round'>
                    <Search className='text-muted' size={14} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  value={query}
                  className='round'
                  placeholder='Search or start a new chat'
                  onChange={handleFilter}
                />
              </InputGroup>
              <div className="d-flex  justify-content-center align-items-center pl-1">
                <UncontrolledDropdown>
                  <DropdownToggle tag='span'>
                    <Plus size={15} />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      tag='a' href='/' className='w-100'
                      onClick={e => openNewChatModel(e)}
                    >
                      <span className='align-middle ml-50'>New Personal Chat</span>
                    </DropdownItem>
                    <DropdownItem
                      tag='a' href='/' className='w-100'
                      onClick={e => openNewChatModel(e, true)}
                    >
                      <span className='align-middle ml-50'>New Group Chat</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          </div>
          <PerfectScrollbar className='chat-user-list-wrapper list-group' options={{ wheelPropagation: false }}>
            <h4 className='chat-list-title'>Chats</h4>
            <ul className='chat-users-list chat-list media-list'>
              <UILoader blocking={chatLoading}>
                {renderChats()}
              </UILoader>
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
      <Modal isOpen={isNewChat} className="pt-5">
        <UILoader blocking={newChatLoading || teacherStudentsLoading}>
          <ModalBody className="p-2">
            <div className="d-flex justify-content-lg-between align-items-center">
              <h3 className="m-0">New Chat</h3>
              <X
                size={16}
                onClick={() => closeNewChat()}
              />
            </div>
            <div className="mt-2">
              <div className="text-center">
                {
                  teacherStudents.length == 0 ? <NotFound message="No user Available for new chat" /> :
                    teacherStudents.map((s, index) =>
                      <Row key={'non-connected' + index}>
                        <Col sm='12'>
                          <div className="d-flex justify-content-lg-between align-items-center mb-1">
                            <h5 className="m-0">
                              {
                                s.name
                              }
                            </h5>
                            {
                              getChatByUserId(s.userId) ? <Button.Ripple
                                color='primary'
                                className="btn btn-sm"
                                disabled={true}
                              >
                                Chatting
                              </Button.Ripple>
                                :
                                <Button.Ripple
                                  color='primary'
                                  className="btn btn-sm"
                                  onClick={() => startNewChat(s.userId)}
                                >
                                  Start Conversation
                                </Button.Ripple>
                            }
                          </div>
                        </Col>
                      </Row>)
                }
              </div>
            </div>
          </ModalBody>
        </UILoader>
      </Modal>

      <Modal isOpen={isNewChatGroup} className="pt-5">
        <UILoader blocking={newChatLoading || teacherStudentsLoading}>
          <ModalBody className="p-2">
            <div className="d-flex justify-content-lg-between align-items-center">
              <h3 className="m-0">New Group Chat</h3>
              <X
                size={16}
                onClick={() => closeNewChat()}
              />
            </div>
            <div className="mt-2">
              <div >
                {
                  teacherStudents.length == 0 ? <NotFound message="No user Available for new chat" /> :
                    <>
                      <FormGroup>
                        <Label className="ml-25">
                          Group Name
                        </Label>
                        <InputGroup className='input-group-merge'>
                          <Input
                            type="text"
                            placeholder='Enter group name'
                            value={groupName}
                            onChange={e => setGroupName(e.target.value)}
                          />
                        </InputGroup>
                      </FormGroup>
                      <Label className="ml-25 mb-1">
                        Select Participants
                      </Label>
                      {teacherStudents.map((s, index) =>
                        <Row key={'non-connected' + index}>
                          <Col sm='12'>
                            <div className="d-flex justify-content-lg-between align-items-center mb-1">
                              <h6 className="m-0">
                                {
                                  s.name
                                }
                              </h6>
                              <CustomInput
                                type='checkbox'
                                className='custom-control-Primary'
                                id={"group-user-" + index}
                                inline
                                onClick={() => toggleUserFromGroup(s.userId)}
                              />
                            </div>
                          </Col>
                        </Row>)
                      }
                      <div className="text-right mt-2">
                        <Button.Ripple
                          color="primary"
                          onClick={() => startNewGroupChat()}
                        >
                          Create Group
                        </Button.Ripple>
                      </div>
                    </>
                }
              </div>
            </div>
          </ModalBody>
        </UILoader>
      </Modal>

    </div>
  )
}

export default SidebarLeft
