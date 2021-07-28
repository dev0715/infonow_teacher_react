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
    const { test, pastStudents, upcomingStudents,
        assignTestLoading,
        pastStudentsLoading,
        upcomingStudentsLoading } = props

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
        if (props.assignTestError) assignTestAlert(props.assignTestError, 'error');
        if (props.assignTestSuccess) assignTestAlert('Test has been assigned successfully', 'success');
    }, [props.assignTestError, props.assignTestSuccess]);

    const assignTest = (testData) => {
        let data = {
            studentId: testData.student.user.userId,
            startTime: testData.startTime,
            endTime: testData.endTime,
            testId: test.testId
        }
        props.assignTest(data)
    }

    const assignTestAlert = (msg, icon) => {
        return MySwal.fire({
            title: msg,
            icon: icon,
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
        })
    }

    return (
        <>
            <UILoader blocking={assignTestLoading}>
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
                                    onAssignTest={assignTest}
                                    isReloading={pastStudentsLoading}
                                />
                            </TabPane>

                            <TabPane tabId='2'>
                                <PastAndUpcomingTestStudentList
                                    studentTests={upcomingStudents}
                                    isUpcoming={true}
                                    fetchStudents={fetchStudents}
                                    onAssignTest={assignTest}
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
    } = state.Tests
    return {
        assignTest, assignTestLoading,
        assignTestError, assignTestSuccess,
        pastStudents, pastStudentsLoading, pastStudentsError,
        upcomingStudents, upcomingStudentsLoading, upcomingStudentsError,
    }

}

const mapDispatchToProps = {
    assignTest,
    getPastStudent,
    getUpcomingStudent
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TestsTabContainer)
)