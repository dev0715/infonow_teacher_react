// ** React Imports
import React, { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { Row, Col } from 'reactstrap'

// ** Calendar App Component Imports
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'


// ** Store & Actions
import { connect } from 'react-redux'

import { withRouter } from 'react-router';


// ** Styles
import '@styles/react/apps/app-calendar.scss'


const CalendarComponent = () => {



  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)



  // ** LeftSidebar Toggle Function
  const toggleSidebar = val => setLeftSidebarOpen(val)



  return (
    <Fragment>
      <div className='app-calendar overflow-hidden border'>
        <Row noGutters>
          <Col
            id='app-calendar-sidebar'
            className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
              show: leftSidebarOpen
            })}
          >
            <SidebarLeft />
          </Col>
          <Col className='position-relative'>
            <Calendar />
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
    </Fragment>
  )
}


const mapStateToProps = (state) => {


  const {

  } = state.Meetings;
  return {

  }
}

export default withRouter(
  connect(mapStateToProps, {

  })(CalendarComponent)
)
