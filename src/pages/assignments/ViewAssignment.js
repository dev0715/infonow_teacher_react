import React from 'react';

import {
    Row,
    Col,
    Card, CardBody, CardTitle, CardHeader
} from 'reactstrap';
import { useState, useEffect } from 'react'
import { getAttemptDetail, getTestDetail } from '@store/actions';
import ViewQuestions from '../questions/view/Question'
import Questions from "../testQuestions/Questions"
import TestDetail from '../tests/TestDetail'
import '../../assets/scss/custom/components/_card.scss'
import AssignmentDetail from './AssignmentDetail';
import { Editor } from 'draft-js';
import ReactMarkdown from 'react-markdown';


const ViewAssignment = (props) => {

    const { assignment, onChangeView } = props
    return (
        <>
            {
                assignment && (
                    <Row>
                        <Col lg={12}>
                            <AssignmentDetail
                                assignment={assignment}
                                isEdit={true}
                                onChangeView={onChangeView} />
                        </Col>
                        <Col lg={12}>

                            <Card>
                                <CardHeader>
                                    <CardTitle tag='h4'>Assignment Content</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <ReactMarkdown >{assignment.content}</ReactMarkdown>
                                </CardBody>
                            </Card>
                        </Col>


                    </Row>
                )
            }
        </>);
};

export default ViewAssignment


