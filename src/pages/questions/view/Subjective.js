import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { IMAGES_BASE_URL } from '../../../helpers/url_helper';

export const Subjective = (props) => {

    const question = props.question;
    const number = props.number || '';

    return (
        <Card className="question-test-detail">
            <CardBody>
                <Row>
                    <Col md={8}>
                        <h4 >
                            {`${number}. ${question.text}`}
                        </h4>

                    </Col>
                    <Col md={4}>
                        <p className="text-muted">Marks: {question.marks}</p>
                        {question.image &&
                            <div className="text-right">
                                <img src={`${IMAGES_BASE_URL}/${question.image}`} />
                            </div>}

                    </Col>
                </Row>



            </CardBody>
        </Card>
    );
};

Subjective.propTypes = {
    question: PropTypes.any.isRequired,
};

export default Subjective