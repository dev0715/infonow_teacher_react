import React from 'react';

import {
    Row,
    Col,
} from 'reactstrap';

import { connect } from 'react-redux'
import { useEffect } from 'react';
import { getAttemptDetail, getTestDetail } from '@store/actions';
import { withRouter } from 'react-router-dom';
import TestDetail from './TestDetail';
import Questions from '../questions/questions';
import '../../assets/scss/custom/components/_card.scss'

const AttemptDetail = (props) => {

    const attemptId = props.match.params.attemptId;
    //  const testId = props.testId || props.location.state.testId;
    const { attemptDetail } = props;
    const test = attemptDetail.test

    const getAttemptAndTestDetail = () => {
        props.getAttemptDetail(attemptId)
        //props.getTestDetail(testId)
    }

    useEffect(getAttemptAndTestDetail, []);

    return (
        <>
            {
                attemptDetail &&
                attemptDetail.objectiveAttempt &&
                attemptDetail.subjectiveAttempt && (
                    <Row>
                        <Col lg={12}>
                            <TestDetail attempts={props.attemptDetail} />
                        </Col>
                        {
                            attemptDetail.objectiveAttempt.map(
                                (answer, index) => (
                                    <Col
                                        lg={12}
                                        key={`objective-question-${index + 1}`}>
                                        <Questions
                                            question={test.questions.find(q => q._questionId === answer.questionId)}
                                            answer={answer}
                                            number={index + 1}
                                        />

                                    </Col>
                                )
                            )
                        }
                        {
                            attemptDetail.subjectiveAttempt.map(
                                (answer, index) => (
                                    <Col
                                        lg={12}
                                        key={`subjective-question-${index + 1}`}>
                                        <Questions
                                            question={test.questions.find(q => q._questionId === answer.questionId)}
                                            answer={answer}
                                            number={index + 1}
                                        />
                                    </Col>
                                )
                            )

                        }

                    </Row>
                )
            }
        </>);
};

const mapStateToProps = (state) => {
    const { testDetail,
        attemptDetail,
        attemptDetailLoading,
        attemptDetailError } = state.Attempts;
    return {
        testDetail,
        attemptDetail,
        attemptDetailLoading,
        attemptDetailError
    };
}

const mapDispatchToProps = {
    getAttemptDetail, getTestDetail
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AttemptDetail))


