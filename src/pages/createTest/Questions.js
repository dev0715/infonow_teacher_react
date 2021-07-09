import React from 'react';
import { useState, useEffect } from 'react';
import NewObjective from './NewObjective'
import NewSubjective from './NewSubjective'
import {
    Col, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle
} from 'reactstrap';
import Swal from 'sweetalert2';

const Questions = (props) => {
    const { type } = props

    const [questions, setQuestions] = useState([])
    const [questionFiles, setQuestionFiles] = useState(null);

    const objectiveQuestion = {
        "text": "",
        "marks": 10,
        "type": 1,
        "options": [
            {
                "optionText": "",
                "isRight": false
            },
            {
                "optionText": "",
                "isRight": false
            }]
    }

    const subjectiveQuestion = {
        "text": "",
        "marks": 10,
        "type": 2
    }

    useEffect(() => {

    }, [questions])

    const updateQuestions = (index, deleteCount, newItem = undefined) => {
        let updatedQuestionArray = JSON.parse(JSON.stringify(questions));
        if (newItem) {
            updatedQuestionArray.splice(index + 1, deleteCount, newItem)
        }
        else {
            updatedQuestionArray.splice(index, deleteCount)
        }
        setQuestions(updatedQuestionArray)
        updateMarks()
    }

    const addQuestion = (type, index) => {
        const newQuestion = type == 1 ? objectiveQuestion : subjectiveQuestion
        updateQuestions(index, 0, JSON.parse(JSON.stringify(newQuestion)))
    }

    const onRemoveQuestion = (questionIndex) => {
        if (questions.length > 1) {
            updateQuestions(questionIndex, 1)
            updateMarks()
        }
    }

    const onChangeQuestionText = (e, questionIndex) => {
        let text = e.target.value;
        let question = questions[questionIndex];
        question.text = text;
        updateQuestions(questionIndex - 1, 1, question);
    }
    const updateMarks = () => {
        props.onUpdate(questions)
    }

    const onMarksChange = (e, questionIndex) => {
        let text = e.target.value;
        let question = questions[questionIndex];
        question.marks = text;
        updateQuestions(questionIndex - 1, 1, question);
        updateMarks()
    }

    const onFileChanged = (event, index) => {
        let file = event.target.files[0];
        if (file.size > 2097152) {
            Swal.fire({
                icon: "error",
                title: "Error",
                html: `Image file is too big. Please upload an image of upto 2MB`
            })
            event.target.value = "";
            return;
        };

        let option = {
            ...questionFiles,
            [index + ""]: event.target.files[0]
        }

        setQuestionFiles(option)
    }

    const onNewOption = (questionIndex) => {
        let question = questions[questionIndex];
        question.options.push({ optionText: "", isRight: 0 });
        updateQuestions(questionIndex - 1, 1, question);
    }

    const onChangeOptionRadio = (questionIndex, optionIndex) => {
        let question = questions[questionIndex];
        question.options.forEach(e => e.isRight = false)
        question.options[optionIndex].isRight = true;
        updateQuestions(questionIndex - 1, 1, question);
    }


    const onChangeOptionText = (e, questionIndex, optionIndex) => {
        let text = e.target.value;
        let question = questions[questionIndex];
        question.options[optionIndex].optionText = text;
        updateQuestions(questionIndex - 1, 1, question);
    }

    const onRemoveOption = (questionIndex, optionIndex) => {
        let question = questions[questionIndex];
        if (question.options.length > 2) {
            question.options.splice(optionIndex, 1);
            updateQuestions(questionIndex - 1, 1, question);
        }
    }

    return (
        <>
            {
                (!questions || questions.length <= 0) &&
                <Col lg={12}>
                    <div className='demo-inline-spacing'>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle className='btn-icon float-right mr-1' color='success' outline caret>
                                Add New Question															</DropdownToggle>
                            <DropdownMenu >
                                <DropdownItem onClick={() => { addQuestion(1, 0) }}>Objective Question</DropdownItem>
                                <DropdownItem onClick={() => { addQuestion(2, 0) }}>Subjective Question</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                </Col>
            }

            {

                questions && questions.length > 0 &&
                questions.map((question, index) =>
                    <Col lg={12}>
                        {
                            question.type == 1
                                ? <NewObjective
                                    question={question}
                                    index={index}
                                    onAddQuestion={addQuestion}
                                    onRemoveQuestion={onRemoveQuestion}
                                    onChangeQuestionText={onChangeQuestionText}
                                    onMarksChange={onMarksChange}
                                    onFileChanged={onFileChanged}
                                    onNewOption={onNewOption}
                                    onChangeOptionRadio={onChangeOptionRadio}
                                    onChangeOptionText={onChangeOptionText}
                                    onRemoveOption={onRemoveOption}
                                />
                                : <NewSubjective
                                    question={question}
                                    index={index}
                                    onAddQuestion={addQuestion}
                                    onRemoveQuestion={onRemoveQuestion}
                                    onChangeQuestionText={onChangeQuestionText}
                                    onMarksChange={onMarksChange}
                                    onFileChanged={onFileChanged}
                                />
                        }
                    </Col>

                )
            }
        </>
    )
}

export default Questions