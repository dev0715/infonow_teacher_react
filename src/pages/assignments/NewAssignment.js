import React from 'react';
import { useState, useEffect } from 'react';
import {
	Card, CardBody, CardTitle, Row, Col, Container, Button, CardHeader, FormGroup,
	CustomInput,
	Label,
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { postAssignment } from '@store/actions'
import { ArrowLeft } from 'react-feather'
import { Editor, EditorState } from 'draft-js'
import UILoader from '../../@core/components/ui-loader';
import { errorAlertDialog, successAlertDialog } from '../../helpers/HelperFunctions';
import { stateToMarkdown } from "draft-js-export-markdown";

import '../../assets/scss/custom/components/_card.scss'
import '../../assets/scss/custom/components/_question.scss'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import '@styles/react/libs/editor/editor.scss'
const NewAssignment = (props) => {

	const { newAssignmentLoading, newAssignmentError, newAssignmentSuccess } = props
	const loading = false;
	const [editorVal, setEditorVal] = useState(EditorState.createEmpty())

	const [newAssignment, setNewAssignment] = useState({
		"title": "",
		"totalMarks": 0,
		"content": "",
		"type": "coding"
	});

	const handleValidSubmit = (events, values) => {
		let content = stateToMarkdown(editorVal.getCurrentContent())
		setNewAssignment(newAssignment => {
			let assignment = { ...newAssignment, content: content }
			props.postAssignment(assignment);
			return assignment
		})
	}


	useEffect(() => {
		if (newAssignmentError) errorAlertDialog(newAssignmentError);
		if (newAssignmentSuccess) successAlertDialog('Assignment has been created successfully');
	}, [newAssignmentError, newAssignmentSuccess]);


	const onTitleChange = e => {
		setNewAssignment({ ...newAssignment, title: e.target.value })
	}

	const onContentChange = v => {
		setEditorVal(v)
	}

	const onMarksChange = e => {
		setNewAssignment({ ...newAssignment, totalMarks: e.target.value })
	}

	const changeAssignmentType = e => {
		setNewAssignment({ ...newAssignment, type: e.target.value })
	}


	return (
		<UILoader blocking={newAssignmentLoading}>
			<React.Fragment>
				{!loading && (
					<div className='page-content'>
						<Container fluid>
							<Row>
								<Col lg={12}>
									<Card>
										<CardHeader>
											<CardTitle><Button.Ripple className="btn-icon mr-2" size="sm" onClick={() => props.history.goBack()}><ArrowLeft size={16} /></Button.Ripple>Create a New Assignment</CardTitle>
										</CardHeader>
										<CardBody>
											<AvForm
												className='form-horizontal mt-3'
												onValidSubmit={(e, v) => {
													handleValidSubmit(e, v);
												}}
											>
												<Row>
													<Col md={4}>
														<div className='mb-3'>
															<AvField
																name='title'
																label={'Assignment Title *'}
																value={newAssignment.title}
																onChange={onTitleChange}
																className='form-control'
																placeholder={'Enter Assignment title'}
																type='text'
																required
															/>
														</div>
													</Col>


													<Col md={4}>
														<div className='mb-3'>
															<AvField
																name='totalMarks'
																label={'Total Marks *'}
																onChange={onMarksChange}
																value={`${newAssignment.totalMarks}`}
																className='form-control'
																placeholder={
																	'Total Marks'
																}
																type='number'
															/>
														</div>
													</Col>
													<Col md={4}>
														<FormGroup>
															<Label for='select-custom'>Assignment Type</Label>
															<CustomInput type='select' name='select' id='select-custom' onChange={changeAssignmentType}>
																<option value="coding">Coding</option>
																<option value="theoretical">Theoretical</option>
															</CustomInput>
														</FormGroup>
													</Col>

													<Card>
														<CardHeader>
															<CardTitle tag='h4'>Assignment Content</CardTitle>
														</CardHeader>
														<CardBody>
															<Editor editorState={editorVal} onEditorStateChange={onContentChange} />
														</CardBody>
													</Card>

													<Col lg={12}>
														<div className='mt-3'>
															<button
																className='btn btn-primary waves-effect waves-light'
																type='submit'>
																{/* disabled={props.newTestLoading}> */}
																{newAssignmentLoading && <><i className="fa fa-spinner fa-spin" />&nbsp;&nbsp;</>}
																Create Assignment
															</button>
														</div>
													</Col>
												</Row>
											</AvForm>
										</CardBody>
									</Card>
								</Col>
							</Row>
						</Container>
					</div>
				)}
			</React.Fragment>
		</UILoader>
	);
};

const mapStateToProps = (state) => {
	const {
		newAssignment,
		newAssignmentLoading,
		newAssignmentSuccess,
		newAssignmentError,
	} = state.Assignments;

	return {
		newAssignment,
		newAssignmentLoading,
		newAssignmentSuccess,
		newAssignmentError,
	}
}

const mapDispatchToProps = {
	postAssignment
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewAssignment)
)

