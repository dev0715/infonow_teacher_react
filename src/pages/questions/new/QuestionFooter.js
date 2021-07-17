import React from 'react'

import {
    Row, Col, Button,
    UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle
} from 'reactstrap';
import { Trash } from 'react-feather'
import { AvField } from 'availity-reactstrap-validation';

export default function QuestionFooter(props) {

    const { onNewQuestion, onRemoveQuestion, index, question, onMarksChange } = props;

    return (
        <Row className="question-control-footer">
            <Col md={6}>
                <AvField
                    name={`question${index}Marks`}
                    label={`Marks`}
                    value={`${question.marks}`}
                    className='question-marks'
                    placeholder={'Enter marks'}
                    min={1}
                    onChange={e => onMarksChange(e.target.value)}
                    type='number'
                    required />
            </Col>
            <Col md={6} className="dropdown-option mt-2">
                <Button.Ripple
                    onClick={() => onRemoveQuestion()}
                    className='btn-icon mr-1' color='danger' outline>
                    <Trash size={16} />
                </Button.Ripple>

                <UncontrolledButtonDropdown size="md">
                    <DropdownToggle color='success' outline caret>
                        New Question
                    </DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem onClick={() => { onNewQuestion(1, index) }}>Objective Question</DropdownItem>
                        <DropdownItem onClick={() => { onNewQuestion(2, index) }}>Subjective Question</DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
            </Col>
        </Row>
    )
}
