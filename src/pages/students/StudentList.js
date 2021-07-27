import React from 'react';

import {
    CardBody,
    CardTitle,
    Table,
    Badge,
    Button
} from 'reactstrap';
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import CardReload from '../../@core/components/card-reload';

import Avatar from '@components/avatar'
import { titleCase } from '@utils';
import { DateTime } from '../../components/date-time';
import { useState, useEffect } from 'react';
import { getAllStudents, getStudentById } from '@store/actions';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileImageUrl } from '../../helpers/url_helper'
import StudentListModal from '../tests/StudentListModal';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ThumbsUp, ThumbsDown } from 'react-feather'
import TestDurationModal from '../tests/TestDurationModal';
import { mergeDateTime } from '../../helpers/HelperFunctions';

const StudentList = (props) => {
    const { isAssignTest,
        onAssignTest } = props

    const { students } = props
    const [studentModalState, setStudentModalState] = useState(false)
    const [testModalState, setTestModalState] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)


    const fetchStudents = () => {
        props.getAllStudents();
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    const onStudentSelect = (student) => {
        if (!isAssignTest)
            props.history.push(`/students/${student.user.userId}`)
    }

    const getStudentStatusColor = (studentStatus) => {
        switch (studentStatus) {
            case 'active': return 'light-success';
            case 'blocked': return 'light-danger';
            case 'waiting-for-teacher': return 'light-warning';
            case 'new': return 'light-warning';
            default: return 'light-warning'
        }
    }

    const setTestDuration = (data) => {
        setTestModalState(!testModalState)
        let testData = {
            startTime: mergeDateTime(data.startDate, data.startTime),
            endTime: mergeDateTime(data.endDate, data.endTime),
            student: selectedStudent
        }
        onAssignTest(testData)
    }

    const selectedStudentAssign = (student) => {
        setSelectedStudent(student)
        setStudentModalState(!studentModalState)
        setTestModalState(!testModalState)
    }

    const UnassignTest = (e, student) => {
        e.preventDefault()
        // if (student)
        //   onAssignTest(student.studentId)
    }

    const toggleStudentModalState = () => {
        setStudentModalState(!studentModalState)
    }

    const toggleTestModalState = () => {
        setTestModalState(!testModalState)
    }


    return (

        <CardReload
            title='Students'
            onReload={fetchStudents}
            isReloading={props.studentsLoading}
        >
            {
                isAssignTest &&
                <div className='mr-35 text-right'>
                    <Button.Ripple outline color='primary' onClick={() => toggleStudentModalState()} >
                        <span className='align-middle ml-25'>Assign Test</span>
                    </Button.Ripple>
                </div>
            }
            < CardBody >

                <Table responsive hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Status</th>
                            {
                                isAssignTest &&
                                <th>Status</th>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {props.students && props.students.map((s, i) =>
                            <tr key={s.userId} >
                                <td>{i + 1}</td>
                                <td onClick={() => onStudentSelect(s)}>
                                    <Avatar
                                        className='cursor-pointer'
                                        img={getProfileImageUrl(s.user.profilePicture)}
                                    />
                                    <span className='align-middle font-weight-bold ml-1'>
                                        <u> {s.user.name}</u>
                                    </span>
                                </td>
                                <td>{s.user.email}</td>
                                <td><DateTime dateTime={s.user.createdAt} type="date" /></td>
                                <td>
                                    <Badge
                                        pill
                                        color={getStudentStatusColor(s.status)}
                                        className='mr-1'
                                    >
                                        {titleCase(s.status)}
                                    </Badge>
                                </td>
                                {
                                    isAssignTest &&
                                    <td>
                                        <div className='d-flex'>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className='pr-1' tag='span'>
                                                    <MoreVertical size={15} />
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem tag='a' href='/' className='w-100' onClick={e => UnassignTest(e, s)}>
                                                        <FileText size={15} />
                                                        <span className='align-middle ml-50'>Unassign</span>
                                                    </DropdownItem>

                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            <Edit size={15} />
                                        </div>
                                    </td>
                                }
                            </tr>
                        )}
                    </tbody>
                </Table>
                {
                    studentModalState &&
                    <StudentListModal
                        students={students}
                        isOpen={studentModalState}
                        onSelectedStudent={selectedStudentAssign}
                        toggleModalState={toggleStudentModalState} />
                }

                {
                    testModalState &&
                    <TestDurationModal
                        isOpen={testModalState}
                        setTestDuration={setTestDuration}
                        toggleModalState={toggleTestModalState} />
                }
            </CardBody >
        </CardReload >
    );
};


const mapStateToProps = (state) => {
    const { students,
        studentsError,
        studentsLoading } = state.Students;
    return {
        students,
        studentsError,
        studentsLoading
    };
};

export default withRouter(
    connect(mapStateToProps, { getAllStudents, getStudentById })(StudentList)
)

