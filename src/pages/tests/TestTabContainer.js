import React from 'react';

import {
    Row,
    Col,
    Card,
    CardBody
} from 'reactstrap';
import { useState, useEffect } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../../assets/scss/custom/components/_card.scss'

import {
    assignTest,
    getPastStudent,
    getUpcomingStudent
} from '@store/actions'
import StudentList from '../students/StudentList';

const TestsTabContainer = (props) => {

    const [active, setActive] = useState('1')
    const { test, pastStudents, upcomingStudents } = props

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const assignTest = (testData) => {
        let data = {
            studentId: testData.student.user.userId,
            startTime: testData.startTime,
            endTime: testData.endTime,
            testId: test.testId
        }
        props.assignTest(data)
    }

    return (
        <>
            <Card>
                <CardBody>
                    <Nav tabs fill>
                        <NavItem>
                            <NavLink
                                active={active === '1'}
                                onClick={() => {
                                    toggle('1')
                                }}
                            >
                                Past Test
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === '2'}
                                onClick={() => {
                                    toggle('2')
                                }}
                            >
                                Upcoming Test
                            </NavLink>
                        </NavItem>

                    </Nav>

                    <TabContent className='py-50' activeTab={active}>
                        <TabPane tabId='1'>
                            <StudentList students={pastStudents} isAssignTest={false} onAssignTest={assignTest} />
                        </TabPane>

                        <TabPane tabId='2'>
                            <StudentList students={upcomingStudents} isAssignTest={true} onAssignTest={assignTest} />
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        </>
    )

};



const mapStateToProps = (state) => {
    const { assignTest, assignTestLoading,
        assignTestError, assignTestSuccessMessage,
        pastStudents, pastStudentsLoading, pastStudentsError,
        upcomingStudents, upcomingStudentsLoading, upcomingStudentsError,
    } = state.Tests
    return {
        assignTest, assignTestLoading,
        assignTestError, assignTestSuccessMessage,
        pastStudents, pastStudentsLoading, pastStudentsError,
        upcomingStudents, upcomingStudentsLoading, upcomingStudentsError,
    }

}

const mapDispatchToProps = {
    assignTest,
    getPastStudent,
    getUpcomingStudent,
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TestsTabContainer)
)