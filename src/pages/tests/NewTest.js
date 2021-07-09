import React from 'react';
import { useState, useEffect } from 'react';
import {
	Card, CardBody, CardTitle, Row, Col, Container
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Swal from 'sweetalert2';
import Questions from "../createTest/Questions"
import '../../assets/scss/custom/components/_question.scss'
const NewTest = (props) => {

	const loading = false;
	const [questionFiles, setQuestionFiles] = useState(null);
	const [newTest, setNewTest] = useState({
		"title": "",
		"totalMarks": 0,
		"timeLimit": 60,
		questions: []
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


	const onTitleChange = (e) => {
		setNewTest({ ...newTest, title: e.target.value })
	}

	const onTimeLimitChange = (e) => {
		setNewTest({ ...newTest, timeLimit: e.target.value })
	}

	const updateQuestionsAndMarks = (questions) => {
		let totalMarks = questions.reduce((acc, q) => acc += Number(q.marks), 0);
		setNewTest({ ...newTest, questions: questions, totalMarks })
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

												<Questions onUpdate={updateQuestionsAndMarks} />

												<Col lg={12}>
													<div className='mt-3'>
														<button
															className='btn btn-primary waves-effect waves-light'
															type='submit'
															disabled={props.newTestLoading}>
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

