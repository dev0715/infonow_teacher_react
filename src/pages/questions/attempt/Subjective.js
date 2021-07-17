import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import { BASE_URL } from '../../../helpers/url_helper';

export const Subjective = (props) => {

    const question = props.question;
    const number = props.number || '';
    const answer = props.answer || '';

    return (
        <Card className="question-test-detail">
            <CardBody>
                <p className="text-muted">Marks: {question.marks}</p>
                {question.image && <img src={`${BASE_URL}/${question.image}`} />}
                <h6 >
                    {`${number}. ${question.text}`}
                </h6>
                {/*--  Options for each question--*/}
                <h7 >
                    {answer.answerText}
                </h7>

            </CardBody>
        </Card>
    );
};

Subjective.propTypes = {
    question: PropTypes.any.isRequired,
    answer: PropTypes.any.isRequired,
    answerText: PropTypes.any.isRequired,
};

export default Subjective