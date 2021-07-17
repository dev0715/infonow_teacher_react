import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import { IMAGES_BASE_URL } from '../../../helpers/url_helper';

export const Subjective = (props) => {

    const question = props.question;
    const number = props.number || '';

    return (
        <Card className="question-test-detail">
            <CardBody>
                <p className="text-muted">Marks: {question.marks}</p>
                {question.image && <img src={`${IMAGES_BASE_URL}/${question.image}`} />}
                <h6 >
                    {`${number}. ${question.text}`}
                </h6>
            </CardBody>
        </Card>
    );
};

Subjective.propTypes = {
    question: PropTypes.any.isRequired,
};

export default Subjective