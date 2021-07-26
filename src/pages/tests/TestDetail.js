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
import { ArrowLeft, Edit } from 'react-feather'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const TestDetail = (props) => {

    const { test, isEdit, onChangeView } = props;

    const onAssignTest = () => {

        props.history.push({
            pathname: `/assign-test/${test.testId}`,
            state: { test: test }
        })
    }

    return (
        <>
            {
                Object.keys(test).length > 0 && (
                    <div>
                        <Card>
                            <CardHeader>
                                <div>
                                    <Button.Ripple className="btn-icon" size="sm" onClick={() => props.history.goBack()}><ArrowLeft size={16} /></Button.Ripple>
                                    <h4 className='ml-2 d-inline'>Test</h4>
                                </div>
                                {
                                    isEdit &&
                                    <div className='mr-2 text-right'>

                                        <Button.Ripple className="mr-1" outline color='primary' onClick={onAssignTest}  >
                                            {/* <Edit size={14} /> */}
                                            <span className='align-middle ml-25'>Assign</span>
                                        </Button.Ripple>

                                        <Button.Ripple outline color='primary' onClick={onChangeView} >
                                            <Edit size={14} />
                                            <span className='align-middle ml-25'>Edit</span>
                                        </Button.Ripple>

                                    </div>

                                }

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
                                                                Duration: {test.timeLimit / 60} mins
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
    test: PropTypes.object.isRequired,
    onBack: PropTypes.func
}


export default withRouter(connect()(TestDetail))




