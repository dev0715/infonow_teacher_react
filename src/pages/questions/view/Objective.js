import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import { IMAGES_BASE_URL } from '../../../helpers/url_helper';
import { CheckCircle, XCircle } from 'react-feather';
export const Objective = (props) => {
    const {
        question,
        number } = props;

    return (
        <Card className="question-test-detail">
            <CardBody>
                <p className="text-muted">Marks: {question.marks}</p>
                {question.image && <img src={`${IMAGES_BASE_URL}/${question.image}`} />}
                <h6 >
                    {`${number}. ${question.text}`}
                </h6>
                {/*--  Options for each question--*/}
                <ul>
                    {question.options.map((option, index) => (
                        <li
                            key={`${question}-${option.optionId}`}
                            className={`card m-0 ${option.isRight ? 'bg-gradient-primary' : ''}`}
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
    question: PropTypes.any.isRequired
};

export default Objective