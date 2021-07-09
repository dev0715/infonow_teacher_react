import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Row, Col, Container, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
// import { postTest, postTestFailed } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
// import BackButton from '../../components/Common/BackButton';
import Swal from 'sweetalert2';
import { Plus, Minus, Trash } from 'react-feather'
import '../../assets/scss/custom/components/_question.scss'
const NewTest = (props) => {

	const loading = false;
	const [questionFiles, setQuestionFiles] = useState(null);
	const [newTest, setNewTest] = useState({
		"title": "",
		"totalMarks": 10,
		"timeLimit": 60,
		questions: [{
			"text": "",
			"marks": 10,
			"options": [
				{
					"optionText": "",
					"isRight": false
				},
				{
					"optionText": "",
					"isRight": false
				}]
		}]
	});


	const handleValidSubmit = (events, values) => {
		// Converting minutes to seconds
		let timeLimit = newTest.timeLimit * 60;
		let completeTest = { ...newTest, timeLimit };
		const fd = new FormData();
		fd.append('test', JSON.stringify(completeTest));
		for (let file in questionFiles) {
			fd.append(`question-${file}`, questionFiles[file], questionFiles[file].name);
		}
		//	props.postTest(fd);
	}

	const showFiles = () => {
		console.log(questionFiles);
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

	const onTitleChange = (e) => {
		setNewTest({ ...newTest, title: e.target.value })
	}

	const onChangeQuestionText = (e, questionIndex) => {
		let text = e.target.value;
		let question = newTest.questions[questionIndex];
		question.text = text;
		updateQuestions(questionIndex - 1, 1, question);
	}

	const updateMarks = () => {
		let totalMarks = newTest.questions.map(q => Number(q.marks)).reduce((acc, v) => acc += v);
		setNewTest({ ...newTest, totalMarks });
	}


	const onMarksChange = (e, questionIndex) => {
		let text = e.target.value;
		let question = newTest.questions[questionIndex];
		question.marks = text;
		updateQuestions(questionIndex - 1, 1, question);
		updateMarks()
	}


	const onChangeOptionText = (e, questionIndex, optionIndex) => {
		let text = e.target.value;
		let question = newTest.questions[questionIndex];
		question.options[optionIndex].optionText = text;
		updateQuestions(questionIndex - 1, 1, question);
	}

	const onChangeOptionRadio = (questionIndex, optionIndex) => {
		let question = newTest.questions[questionIndex];
		question.options.forEach(e => e.isRight = false)
		question.options[optionIndex].isRight = true;
		updateQuestions(questionIndex - 1, 1, question);
	}

	const onRemoveOption = (questionIndex, optionIndex) => {
		let question = newTest.questions[questionIndex];
		if (question.options.length > 2) {
			question.options.splice(optionIndex, 1);
			updateQuestions(questionIndex - 1, 1, question);
		}
	}

	const onNewOption = (questionIndex) => {
		let question = newTest.questions[questionIndex];
		question.options.push({ optionText: "", isRight: 0 });
		updateQuestions(questionIndex - 1, 1, question);
	}


	const updateQuestions = (index, deleteCount, newItem = undefined) => {
		let updatedQuestionArray = newTest.questions;
		if (newItem) {
			updatedQuestionArray.splice(index + 1, deleteCount, newItem)
		}
		else {
			updatedQuestionArray.splice(index, deleteCount)
		}

		setNewTest({ ...newTest, questions: updatedQuestionArray })
	}

	const addNewQuestion = (questionIndex, question) => {
		updateQuestions(questionIndex, 0, question)
	}

	const onNewQuestion = (questionIndex) => {
		let newQuestion = {
			text: "",
			marks: "10",
			options: [{ optionText: "", isRight: false }, { optionText: "", isRight: false }]
		}
		addNewQuestion(questionIndex, newQuestion)
		updateMarks()
	}

	const onRemoveQuestion = (questionIndex) => {
		if (newTest.questions.length > 1) {
			updateQuestions(questionIndex, 1)
			updateMarks()
		}
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
											{/* <BackButton onBack={onBack} /> */}
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

												<Col lg={12}>
													{newTest.questions.map((question, index) =>
														<Card className="question-control">
															<CardBody>
																<Row>
																	<Col sm={10}>

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
																	<Col sm={2} className="mt-2">
																		<Button.Ripple onClick={() => onRemoveQuestion(index)} className='btn-icon float-end mr-1' size="sm" color='danger' outline>
																			<Trash size={16} />
																		</Button.Ripple>
																		<Button.Ripple onClick={() => onNewQuestion(index)} className='btn-icon float-end' size="sm" color='success' outline>
																			<Plus size={16} />
																		</Button.Ripple>
																	</Col>
																</Row>

																<Col lg={6}>
																	<AvRadioGroup name={`question${index}radio`} label="" required errorMessage="Atleast one must be selected">
																		{question.options.map((option, optionIndex) =>

																			<div className='mb-3 single-option'>
																				<Row>
																					<Col sm={1}>
																						<AvRadio onClick={() => onChangeOptionRadio(index, optionIndex)} className="option-radio" label="" value={optionIndex} />
																					</Col>
																					<Col sm={8}>
																						<input
																							name={`question${index}option${optionIndex}`}
																							value={`${option.optionText}`}
																							onChange={e => onChangeOptionText(e, index, optionIndex)}
																							className='form-control option-text'
																							placeholder={
																								`Enter Option ${optionIndex + 1}`
																							}
																							type='text'
																							required
																						/>
																					</Col>
																					<Col sm={3}>
																						<Button.Ripple onClick={() => onNewOption(index)} className='btn-icon float-right' size="sm" color='success' outline >
																							<Plus size={14} />
																						</Button.Ripple>
																						<Button.Ripple onClick={() => onRemoveOption(index, optionIndex)} className='btn-icon float-right mr-1' size="sm" color='danger' outline >
																							<Trash size={14} />
																						</Button.Ripple>
																					</Col>
																				</Row>


																			</div>

																		)}
																	</AvRadioGroup>
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
																	<hr />
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

															</CardBody>
														</Card>
													)}
												</Col>



												<Col lg={12}>
													<div className='mt-3'>
														<button
															className='btn btn-primary waves-effect waves-light'
															type='submit'
															disabled={props.newTestLoading}
														>
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
		newTestSuccess,
		newTestError,
	} = state.Tests;

	return {
		newTest,
		newTestLoading,
		newTestSuccess,
		newTestError,
	}
}

const mapDispatchToProps = {
	//postTest,
	//postTestFailed,
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewTest)
)

