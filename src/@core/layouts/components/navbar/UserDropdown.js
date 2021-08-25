import React from 'react';
// ** React Imports
import { useEffect, useState } from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserAuthenticated, getLoggedInUser } from '@helpers/backend-helpers'


// ** Store & Actions
import { connect, useDispatch } from 'react-redux'
import { logoutUser } from '@store/actions'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-default.jpg'
import { GET_IMAGE_URL } from '../../../../helpers/url_helper';

const UserDropdown = (props) => {



  const history = useHistory()

  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserAuthenticated() !== null) {
      setUserData(getLoggedInUser())
    }
  }, [])

  //** Vars
  const userAvatar = (userData && GET_IMAGE_URL(userData.profilePicture)) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold'>
            {
              (userData && (userData.name || "").split(" ")[0]) || ''
            }
          </span>
          <span className='user-status'>{(userData && userData.role && userData.role.roleName) || ''}</span>
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to='#' onClick={e => {
          e.preventDefault()
          history.push("/profile")
        }}
        >
          <User size={14} className='mr-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='#' onClick={e => e.preventDefault()}>
          <Mail size={14} className='mr-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='#' onClick={e => e.preventDefault()}>
          <CheckSquare size={14} className='mr-75' />
          <span className='align-middle'>Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='#' onClick={e => e.preventDefault()}>
          <MessageSquare size={14} className='mr-75' />
          <span className='align-middle'>Chats</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='#' onClick={() => props.logoutUser(history)}>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}


const mapStateToProps = (state) => {
  const { } = state.Login;
  return {}
}

export default withRouter(connect(mapStateToProps, { logoutUser })(UserDropdown));


