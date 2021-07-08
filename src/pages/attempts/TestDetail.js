import React from 'react';
import {
    CardBody,
    Card,
    CardHeader,
    Button,
    Row,
    Col,
    CardText
} from 'reactstrap';
import { DateTime } from '../../components/date-time';
import PropTypes from 'prop-types';
import { ArrowLeft } from 'react-feather'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const TestDetail = (props) => {

    const { attempts } = props;

    const test = Array.isArray(attempts) && attempts.length > 0 ? attempts[0].test : attempts.test

    console.log("CHECK TEST DETAIL ==>", test)

    return (
        <>
            {Object.keys(attempts).length > 0 && (
                <div>
                    <Card>
                        <CardHeader>
                            <div>
                                <Button.Ripple className="btn-icon" size="sm" onClick={() => props.history.goBack()}><ArrowLeft size={16} /></Button.Ripple>
                                <h4 className='ml-2 d-inline'>Test</h4>
                            </div>

                        </CardHeader>
                        <CardBody>
                            <Row >
                                <Col>
                                    <div className='user-avatar-section'>
                                        <div className='d-flex justify-content-start'>

                                            <div className='d-flex flex-column ml-2 '>
                                                <div className='user-info '>
                                                    <h4 className='mb-0'>{test.title}</h4>
                                                    <Row>
                                                        <CardText tag='span' className='ml-1'>
                                                            Created At: {<DateTime dateTime={test.createdAt} type="datetime" />}
                                                        </CardText>
                                                    </Row>
                                                    <Row>
                                                        <CardText tag='span' className='ml-1'>
                                                            Duration: {test.timeLimit / 60 / 60} mins
                                                        </CardText>
                                                    </Row>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>

            )}
        </>
    );
};


TestDetail.propTypes = {
    onSelect: PropTypes.func,
    attempts: PropTypes.array.isRequired,
    onBack: PropTypes.func
}


export default withRouter(connect()(TestDetail))




