import React from 'react';

import {
    CardBody,
    CardTitle,
    Table,
    Badge,
} from 'reactstrap';

import CardReload from '../../@core/components/card-reload';

import Avatar from '@components/avatar'
import { titleCase } from '@utils';
import { DateTime } from '../../components/date-time';
import { useState, useEffect } from 'react';
import { getAllStudents, getStudentById } from '@store/actions';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileImageUrl } from '../../helpers/url_helper'

const StudentList = (props) => {
    const fetchStudents = () => {
        props.getAllStudents();
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    const onStudentSelect = (student) => {
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

    return (

        <CardReload
            title='Students'
            onReload={fetchStudents}
            isReloading={props.studentsLoading}
        >
            <CardBody>
                <Table responsive hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.students && props.students.map((s, i) =>
                            <tr key={s.userId} onClick={() => onStudentSelect(s)}>
                                <td>{i + 1}</td>
                                <td>
                                    <Avatar
                                        className='cursor-pointer'
                                        img={getProfileImageUrl(s.user.profilePicture)}
                                    />
                                    <span className='align-middle font-weight-bold ml-1'>
                                        {s.user.name}
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
                            </tr>
                        )}
                    </tbody>
                </Table>
            </CardBody>
        </CardReload>
    );
};


const mapStateToProps = (state) => {
    const { students, studentsError, studentsLoading } = state.Students;
    return { students, studentsError, studentsLoading };
};

export default withRouter(
    connect(mapStateToProps, { getAllStudents, getStudentById })(StudentList)
)

