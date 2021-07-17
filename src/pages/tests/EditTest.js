import React from 'react';
import { useEffect } from 'react';
import {
	Card, CardBody, CardTitle, Row, Col, Container, Button
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Swal from 'sweetalert2';
import Questions from "../testQuestions/Questions"
import { ArrowLeft, Eye } from 'react-feather'
import { useState } from 'react'
// import { postTest } from '@store/actions'
import '../../assets/scss/custom/components/_question.scss'

const EditTest = (props) => {

	const loading = false;
	const { onChangeView } = props
	const [test, setTest] = useState(props.test)


	const updateQuestions = (index, deleteCount, newItem = undefined) => {

		let updatedQuestionArray = test.questions;
		if (newItem) {
			updatedQuestionArray.splice(index + 1, deleteCount, newItem)
		}
		else {
			updatedQuestionArray.splice(index, deleteCount)
		}

		setTest({
			...test,
			questions: updatedQuestionArray,
			totalMarks: updatedQuestionArray.reduce((acc, q) => acc + Number(q.marks), 0)
		})
	}

	const onFileChanged = (file, index) => {

		setTest(t => {
			file ? t.questions[index].file = file
				: delete t.questions[index].file;
			let test = {
				...t,
				questions: [...t.questions]
			}
			return t
		})
		// file ? test.questions[index].file = file
		// 	: delete test.questions[index].file;
	}

	const handleValidSubmit = (events, values) => {
		// Converting minutes to seconds
		let timeLimit = test.timeLimit * 60;
		let completeTest = { ...test, timeLimit };

		const fd = new FormData();

		completeTest.questions.forEach((q, i) => {
			if (q.file) fd.append(`question-file-${i}`, q.file, q.file.name);
			delete q.file
		})

		fd.append('test', JSON.stringify(completeTest));

		props.postTest(fd);
	}



	const onTitleChange = (e) => {
		// setNewTest({ ...test, title: e.target.value })
		test.title = e.target.value
	}

	const onTimeLimitChange = (e) => {
		// setNewTest({ ...test, timeLimit: e.target.value })
		test.timeLimit = e.target.value
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

				<Row>
					<Col lg={12}>
						<Card>
							<CardBody>
								<CardTitle className='h4'>
									<Button.Ripple className="btn-icon" size="sm" onClick={() => props.history.goBack()}><ArrowLeft size={16} /></Button.Ripple>
									Edit Test
									<div className='mr-2 text-right'>
										<Button.Ripple outline color='primary' onClick={onChangeView} >
											<Eye size={14} />
											<span className='align-middle ml-25'>View</span>
										</Button.Ripple>
									</div>
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
													value={test.title}
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
													value={test.timeLimit}
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
													value={`${test.totalMarks}`}
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
													questions={test.questions}
													onChangeQuestion={updateQuestions}
													onFileChanged={onFileChanged}
													isEdit={true}
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
													Edit Test
												</button>
											</div>
										</Col>
									</Row>
								</AvForm>
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {

}

const mapDispatchToProps = {
	// postTest,
	//postTestFailed,
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(EditTest)
)

