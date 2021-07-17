import React from 'react';
import {
    Card, CardBody, Row, Col, Button,
    UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle,
    FormGroup, Label, CustomInput, InputGroup, InputGroupAddon, Input, InputGroupText,
} from 'reactstrap';
import { Plus, Trash, X } from 'react-feather'
import { AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { useRef } from 'react';
import QuestionFooter from './QuestionFooter';
import QuestionImageFile from './QuestionImageFile';

const NewObjective = (props) => {
    const { question, index, isEdit } = props

    const fileInputRef = useRef(null)

    const updateQuestions = (index, deleteCount, newItem = undefined) => {
        props.onChangeQuestion(index, deleteCount, newItem)
    }

    const addNewQuestion = (type) => {
        props.onAddQuestion(type, index)
    }

    const onRemoveQuestion = () => {
        props.onRemoveQuestion(index)
    }

    const onFileChanged = file => {
        props.onFileChanged(file, index)
    }


    const onChangeQuestionText = e => {
        let text = e.target.value;
        question.text = text;
        updateQuestions(index - 1, 1, question);
    }

    const onMarksChange = val => {
        question.marks = val;
        updateQuestions(index - 1, 1, question);
    }

    const onNewOption = () => {
        question.options.push({ optionText: "", isRight: 0 });
        updateQuestions(index - 1, 1, question);
    }

    const onChangeOptionRadio = (optionIndex) => {
        question.options.forEach(e => e.isRight = false)
        question.options[optionIndex].isRight = true;
        updateQuestions(index - 1, 1, question);
    }

    const onChangeOptionText = (e, optionIndex) => {
        let text = e.target.value;
        question.options[optionIndex].optionText = text;
        updateQuestions(index - 1, 1, question);
    }

    const onRemoveOption = (optionIndex) => {
        if (question.options.length > 2) {
            question.options.splice(optionIndex, 1);
            updateQuestions(index - 1, 1, question);
        }
    }

    const onRemoveFile = () => {
        fileInputRef.current.value = "";
        delete question.file
        updateQuestions(index - 1, 1, question);
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
                                onChange={e => onChangeQuestionText(e)}
                                type='text'
                                required
                            />

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <AvRadioGroup name={`question${index}radio`} label="" required errorMessage="Atleast one must be selected">
                            {question.options.map((option, optionIndex) =>
                                <div className='mb-2 single-option'>
                                    <Row>
                                        <Col sm={1}>
                                            <AvRadio
                                                customInput
                                                checked={option.isRight === true}
                                                onClick={() => onChangeOptionRadio(optionIndex)}
                                                className="option-radio" label="" value={optionIndex} />
                                        </Col>
                                        <Col sm={8}>
                                            <input
                                                name={`question${index}option${optionIndex}`}
                                                value={`${option.optionText}`}
                                                onChange={e => onChangeOptionText(e, optionIndex)}
                                                className='form-control option-text'
                                                placeholder={
                                                    `Enter Option ${optionIndex + 1}`
                                                }
                                                type='text'
                                                required
                                            />
                                        </Col>
                                        <Col sm={3}>
                                            <Button.Ripple
                                                onClick={() => onNewOption()}
                                                className='btn-icon float-right' size="sm" color='success' outline >
                                                <Plus size={14} />
                                            </Button.Ripple>
                                            <Button.Ripple
                                                onClick={() => onRemoveOption(optionIndex)}
                                                className='btn-icon float-right mr-1' size="sm" color='danger' outline >
                                                <Trash size={14} />
                                            </Button.Ripple>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                        </AvRadioGroup>
                        <div>
                            <Row>
                                <Col sm={12}>

                                    <QuestionImageFile
                                        htmlId={`file-${index}`}
                                        htmlName={`question-${index}`}
                                        label={`Image`}
                                        onFileChanged={onFileChanged}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <hr />
                <QuestionFooter
                    index={index}
                    question={question}
                    onMarksChange={onMarksChange}
                    onNewQuestion={addNewQuestion}
                    onRemoveQuestion={onRemoveQuestion} />
            </CardBody>
        </Card >
    )
}

export default NewObjective