
import React from 'react';
import { useState, useEffect } from 'react';
import {
    Card, CardBody, CardTitle, Row, Col, Container, CustomInput, Button,
    UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle
} from 'reactstrap';
import { Plus, Trash } from 'react-feather'
import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Swal from 'sweetalert2';

const NewSubjective = (props) => {
    const { question, index } = props

    const addNewQuestion = (type, index) => {
        props.onAddQuestion(type, index)
    }

    const onRemoveQuestion = (index) => {
        props.onRemoveQuestion(index)
    }

    const onChangeQuestionText = (e, index) => {
        props.onChangeQuestionText(e, index)
    }

    const onMarksChange = (e, index) => {
        props.onMarksChange(e, index)
    }

    const onFileChanged = (e, index) => {
        props.onFileChanged(e, index)
    }

    return (
        <Card className="question-control">
            <CardBody>
                <Row>
                    <Col sm={12}>
                        <div className='mb-3'>
                            <AvField
                                name={`question${index}`}
                                label={`${index + 1}. Question`}
                                value={`${question.text}`}
                                className='form-control'
                                placeholder={
                                    'Enter question statement'
                                }
                                onChange={e => onChangeQuestionText(e, index)}
                                type='text'
                                required
                            />
                        </div>
                    </Col>

                </Row>
                <Row>
                    <Col lg={6}>
                        <div className='mb-3'>
                            <input id={`file-${index}`}
                                type="file"
                                name={`question${index}`}
                                accept="image/x-png,image/gif,image/jpeg"
                                label={`Question ${index + 1} Image`}
                                onChange={event => onFileChanged(event, index)}
                                className='form-control'
                            />
                        </div>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col lg={6}>
                        <AvField
                            name={`question${index}Marks`}
                            label={`Marks`}
                            value={`${question.marks}`}
                            className='question-marks'
                            placeholder={'Enter marks'}
                            min={1}
                            max={10}
                            onChange={e => onMarksChange(e, index)}
                            type='number'
                            required />
                    </Col>
                    <Col className="dropdown-option mt-2">
                        <Button.Ripple
                            onClick={() => onRemoveQuestion(index)}
                            className='btn-icon float-end mr-1' size="sm" color='danger' outline>
                            <Trash size={14} />
                        </Button.Ripple>

                        <UncontrolledButtonDropdown>
                            <DropdownToggle className='btn-icon float-right mr-1' color='success' outline caret>
                                Add New Question
                            </DropdownToggle>
                            <DropdownMenu >
                                <DropdownItem onClick={() => { addNewQuestion(1, index) }}>Objective Question</DropdownItem>
                                <DropdownItem onClick={() => { addNewQuestion(2, index) }}>Subjective Question</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </Col>
                </Row>

            </CardBody>
        </Card>
    )
}

export default NewSubjective