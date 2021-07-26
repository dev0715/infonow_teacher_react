import React from 'react';

import {
    Row,
    Col,
} from 'reactstrap';

import { connect } from 'react-redux'
import { getTestAttempts } from '@store/actions';
import { withRouter } from 'react-router-dom';
import TestDetail from '../tests/TestDetail';
import StudentList from '../students/StudentList';

const AssignTestHome = (props) => {

    const { test } = props.location.state;

    const assignTest = () => {

    }

    return (
        <>
            {Object.keys(test).length > 0 && (
                <Row>
                    <Col lg={12}>
                        <TestDetail test={test} />
                    </Col>
                    <Col lg={12}>
                        <StudentList isAssignTest={true} onAssignTest={assignTest} />
                    </Col>
                </Row>
            )

            }
        </>
    );
};


export default AssignTestHome


