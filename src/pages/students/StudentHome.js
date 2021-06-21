import React from 'react';

import {
    CardBody,
    CardTitle,
    Table,
    Badge,
    Row,
    Col
} from 'reactstrap';

import CardReload from '../../@core/components/card-reload';

import Avatar from '@components/avatar'
import { getAllStudents } from '@store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import StudentProfile from './StudentProfile';
import StudentTests from '../tests/StudentTests';

const StudentHome = (props) => {

    const studentId = props.match.params.studentId;

    return (
        <Row>
            <Col lg={12}>
                <StudentProfile studentId={studentId} />
            </Col>
            <Col lg={12}>
                <StudentTests studentId={studentId} />
            </Col>
        </Row>
    );
};


const mapStateToProps = (state) => {
    const { students, studentsError, studentsLoading } = state.Students;
    return { students, studentsError, studentsLoading };
};

export default withRouter(
    connect(mapStateToProps, {})(StudentHome)
)

