import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import { BASE_URL } from '../../helpers/url_helper';
import { CheckCircle, XCircle } from 'react-feather';
export const Objective = (props) => {
    const question = props.question;
    const number = props.number || '';
    return (
        <Card className="question-test-detail">
            <CardBody>
                <p className="text-muted">Marks: {question.marks}</p>
                {question.image && <img src={`${BASE_URL}/${question.image}`} />}
                <h6 className={question.options.filter(x => x.isRight).map(x => x._optionId).indexOf(props.answer.optionId) >= 0 ? 'right-answer' : 'wrong-answer'}>
                    <i className="times-icon text-danger"><XCircle />&nbsp;&nbsp;&nbsp;</i>
                    <i className="check-icon text-success"><CheckCircle />&nbsp;&nbsp;&nbsp;</i>
                    {`${number}. ${question.text}`}
                </h6>
                {/*--  Options for each question--*/}
                <ul>
                    {question.options.map((option, index) => (
                        <li
                            key={`${question}-${option.optionId}`}
                            className={`card m-0 ${(option._optionId === (props.answer.optionId || "")) ? 'bg-gradient-primary' : ''}`}
                        >
                            {option.optionText}
                        </li>
                    ))}
                </ul>
            </CardBody>
        </Card>
    );
};

Objective.propTypes = {
    question: PropTypes.any.isRequired,
    answer: PropTypes.any.isRequired,
};

export default Objective