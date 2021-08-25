import React from 'react'


import { useHistory } from 'react-router-dom'

import { Nav, NavItem, NavLink } from 'reactstrap'
import { User, Lock, Info, Calendar } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  const history = useHistory()
  return (
    <Nav className='nav-left' pills vertical>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <User size={18} className='mr-1' />
          <span className='font-weight-bold'>General</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Lock size={18} className='mr-1' />
          <span className='font-weight-bold'>Change Password</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '3'} onClick={() => history.push('/calender')}>
          <Calendar size={18} className='mr-1' />
          <span className='font-weight-bold'>Calender</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
