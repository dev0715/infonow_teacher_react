import React from 'react';
import { useState, useEffect } from 'react';
import {
	Card, CardBody, CardTitle, Row, Col, Container, Button
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Swal from 'sweetalert2';
import Questions from "../testQuestions/Questions"
import { postTest } from '@store/actions'
import { ArrowLeft } from 'react-feather'
import '../../assets/scss/custom/components/_question.scss'

const NewTest = (props) => {

	const loading = false;
	const [newTest, setNewTest] = useState({
		"title": "",
		"totalMarks": 0,
		"timeLimit": 60,
		questions: []
	});

	const updateQuestions = (index, deleteCount, newItem = undefined) => {

		let updatedQuestionArray = newTest.questions;
		if (newItem) {
			updatedQuestionArray.splice(index + 1, deleteCount, newItem)
		}
		else {
			updatedQuestionArray.splice(index, deleteCount)
		}

		setNewTest({
			...newTest,
			questions: updatedQuestionArray,
			totalMarks: updatedQuestionArray.reduce((acc, q) => acc + Number(q.marks), 0)
		})
	}

	const onFileChanged = (file, index) => {

		setNewTest(newTest => {
			file ? newTest.questions[index].file = file
				: delete newTest.questions[index].file;
			let test = {
				...newTest,
				questions: [...newTest.questions]
			}
			return test
		})
	}

	const handleValidSubmit = (events, values) => {
		// Converting minutes to seconds
		let timeLimit = newTest.timeLimit * 60;
		let completeTest = { ...newTest, timeLimit };

		const fd = new FormData();

		completeTest.questions.forEach((q, i) => {
			if (q.file) fd.append(`question-file-${i}`, q.file, q.file.name);
			delete q.file
		})

		fd.append('test', JSON.stringify(completeTest));

		props.postTest(fd);
	}



	const onTitleChange = (e) => {
		setNewTest({ ...newTest, title: e.target.value })
	}

	const onTimeLimitChange = (e) => {
		setNewTest({ ...newTest, timeLimit: e.target.value })
	}


	const onBack = () => {
		//	props.postTestFailed(null)
		props.history.push('/tests')
	}

	useEffect(() => {
		if (props.newTestError && typeof props.newTestError === 'string') {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				html: props.newTestError
			}).then((result) => {
				//props.postTestFailed(null)
			})
		}
	}, [props.newTestError])

	useEffect(() => {
		if (props.newTestSuccess && typeof props.newTestSuccess === 'string') {
			Swal.fire({
				icon: 'success',
				title: 'Success',
				html: props.newTestSuccess
			}).then((result) => {
				//	props.postTestFailed(null)
				props.history.push('/tests')
			})
		}
	}, [props.newTestSuccess])


	return (
		<React.Fragment>
			{!loading && (
				<div className='page-content'>
					<Container fluid>
						<h3 className="mb-2">Create a New Test</h3>
						<Row>
							<Col lg={12}>
								<Card>
									<CardBody>
										<CardTitle className='h4'>
											<Button.Ripple className="btn-icon" size="sm" onClick={() => props.history.goBack()}><ArrowLeft size={16} /></Button.Ripple>
											New Test
										</CardTitle>
										<AvForm
											className='form-horizontal mt-3'
											onValidSubmit={(e, v) => {
												handleValidSubmit(e, v);
											}}
										>
											<Row>
												<Col lg={4}>
													<div className='mb-3'>
														<AvField
															name='title'
															label={'Test Title *'}
															value={newTest.title}
															onChange={onTitleChange}
															className='form-control'
															placeholder={'Enter test title'}
															type='text'
															required
														/>
													</div>
												</Col>

												<Col lg={4}>
													<div className='mb-3'>
														<AvField
															name='timeLimit'
															label={'Time Limit *'}
															value={newTest.timeLimit}
															onChange={onTimeLimitChange}
															className='form-control'
															placeholder={
																'Time limit in Minutes'
															}
															type='number'
															min={10}
															max={600}
															required
														/>
													</div>
												</Col>
												<Col lg={4}>
													<div className='mb-3'>
														<AvField
															name='totalMarks'
															label={'Total Marks *'}
															value={`${newTest.totalMarks}`}
															className='form-control'
															placeholder={
																'Total Marks'
															}
															type='number'
															disabled
														/>
													</div>
												</Col>

												<>
													{
														<Questions
															questions={newTest.questions}
															onChangeQuestion={updateQuestions}
															onFileChanged={onFileChanged}
														/>
													}
												</>

												<Col lg={12}>
													<div className='mt-3'>
														<button
															className='btn btn-primary waves-effect waves-light'
															type='submit'>
															{/* disabled={props.newTestLoading}> */}
															{props.newTestLoading && <><i className="fa fa-spinner fa-spin" />&nbsp;&nbsp;</>}
															Create Test
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
	);
};

const mapStateToProps = (state) => {
	const {
		newTest,
		newTestLoading,
		newTestError,
	} = state.Tests;

	return {
		newTest,
		newTestLoading,
		newTestError,
	}
}

const mapDispatchToProps = {
	postTest,
	//postTestFailed,
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewTest)
)

