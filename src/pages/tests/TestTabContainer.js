import React from 'react';

import {
    Card,
    CardBody
} from 'reactstrap';
import { useState, useEffect } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../../assets/scss/custom/components/_card.scss'
import UILoader from '../../@core/components/ui-loader';
import {
    assignTest,
    unassignTest,
    getPastStudent,
    getUpcomingStudent,
} from '@store/actions'
import PastAndUpcomingTestStudentList from './PastAndUpcomingTestStudentList';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'


const TestsTabContainer = (props) => {

    const MySwal = withReactContent(Swal)
    const [active, setActive] = useState('1')
    const [isLoading, setIsLoading] = useState(false)
    const { test, pastStudents, upcomingStudents,
        assignTestLoading,
        pastStudentsLoading,
        upcomingStudentsLoading,
        unassignTestLoading } = props

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const fetchStudents = () => {
        props.getPastStudent(test.testId);
        props.getUpcomingStudent(test.testId);
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        setIsLoading(assignTestLoading)
    }, [assignTestLoading]);

    useEffect(() => {
        setIsLoading(unassignTestLoading)
    }, [unassignTestLoading]);

    useEffect(() => {
        if (props.assignTestError) ApiResponseAlert(props.assignTestError, 'error');
        if (props.assignTestSuccess) ApiResponseAlert('Test has been assigned successfully', 'success');
        fetchStudents()
    }, [props.assignTestError, props.assignTestSuccess]);

    useEffect(() => {
        if (props.unassignTestError) ApiResponseAlert(props.unassignTestError, 'error');
        if (props.unassignTestSuccess) ApiResponseAlert('Test has been unassigned successfully', 'success');
        fetchStudents()
    }, [props.unassignTestError, props.unassignTestSuccess]);

    const ApiResponseAlert = (msg, icon) => {
        return MySwal.fire({
            title: msg,
            icon: icon,
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
        })
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

    const unAssignTest = (studentTestId) => {
        let data = {
            studentId: studentTestId,
            testId: test.testId
        }
        props.unassignTest(data)
    }

    return (
        <>
            <UILoader blocking={isLoading}>
                <Card>
                    <CardBody >
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
                                <PastAndUpcomingTestStudentList
                                    studentTests={pastStudents}
                                    isUpcoming={false}
                                    fetchStudents={fetchStudents}
                                    isReloading={pastStudentsLoading}
                                />
                            </TabPane>

                            <TabPane tabId='2'>
                                <PastAndUpcomingTestStudentList
                                    studentTests={upcomingStudents}
                                    isUpcoming={true}
                                    fetchStudents={fetchStudents}
                                    onAssignTest={assignTest}
                                    onUnassignTest={unAssignTest}
                                    isReloading={upcomingStudentsLoading}
                                />
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </UILoader>
        </>
    )

};



const mapStateToProps = (state) => {
    const {

        assignTest, assignTestLoading,
        assignTestError, assignTestSuccess,
        pastStudents, pastStudentsLoading, pastStudentsError,
        upcomingStudents, upcomingStudentsLoading, upcomingStudentsError,
        unassignTestLoading, unassignTestError, unassignTestSuccess,
    } = state.Tests
    return {
        assignTest, assignTestLoading,
        assignTestError, assignTestSuccess,
        pastStudents, pastStudentsLoading, pastStudentsError,
        upcomingStudents, upcomingStudentsLoading, upcomingStudentsError,
    }

}

const mapDispatchToProps = {
    unassignTest,
    assignTest,
    getPastStudent,
    getUpcomingStudent
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TestsTabContainer)
)