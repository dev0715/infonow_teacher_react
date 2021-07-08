import React from 'react';

import {
    Row,
    Col
} from 'reactstrap';


import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentProfile from './StudentProfile';
import StudentTests from '../tests/StudentTests';

const StudentHome = (props) => {

    const studentId = props.match.params.studentId;

    const onSelectTest = (test) => {
        props.history.push({
            pathname: `/attempts/${test.testId}`,
            state: { studentId: studentId }
        })
    }

    return (
        <Row>
            <Col lg={12}>
                <StudentProfile studentId={studentId} />
            </Col>
            <Col lg={12}>
                <StudentTests studentId={studentId} onSelect={onSelectTest} />
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

