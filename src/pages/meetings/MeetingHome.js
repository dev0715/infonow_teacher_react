import React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, } from 'reactstrap';
import MeetingList from './MeetingList';
import UpcomingMeeting from './UpcomingMeeting';
import UpcomingMeetings from './UpcomingMeetings';
import { getAllMeetings, getMeetingDates, newMeeting, getStudentsForMeeting } from '@store/actions';
import moment from 'moment';

import UILoader from '../../@core/components/ui-loader';

import { Form, FormGroup, Modal, ModalBody, Input, Label, InputGroup, Button } from 'reactstrap';
import { X, Plus } from 'react-feather'
import { notifyError, notifySuccess } from '../../utility/toast'

import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';


import TimePicker from '@components/datepicker/TimePicker';
import DatePicker from '@components/datepicker/DatePicker';

const newMeetingImg = require("../../assets/images/illustrations/new-meeting.svg")



const close = (
	<button type='button' className='ml-1 close'>
		<span>×</span>
	</button>
)

function MeetingHome(props) {

	const [isNewMeeting, setIsNewMeeting] = useState(false)


	const [studentId, setStudentId] = useState("")
	const [agenda, setAgenda] = useState("")
	const [message, setMessage] = useState("")
	const [meetingDate, setMeetingDate] = useState(new Date())
	const [meetingTime, setMeetingTime] = useState(new Date('1970-01-01 10:00:00'))

	const getUpcomingMeetings = () => {
		const meetingList = props.meetings || [];
		return meetingList.filter(x => moment(x.scheduledAt).isSameOrAfter(moment()) && x.status === 'accepted');
	}

	const upcomingMeetings = getUpcomingMeetings();

	useEffect(() => {
		props.getAllMeetings()
	}, [])

	useEffect(() => {
		if (!props.studentLoading && !props.studentsError && props.students.length > 0)
			setStudentId(props.students[0].user.userId)
	}, [props.students])

	useEffect(() => {
		if (isNewMeeting && !props.newMeetingLoading && !props.newMeetingError) {
			closeMeeting()
			notifySuccess("New Meeting", "Meeting scheduled successfully")
		}
		else if (isNewMeeting && !props.newMeetingLoading && props.newMeetingError) {
			notifyError("New Meeting", props.newMeetingError)
		}

	}, [props.newMeetingLoading])


	const addNewMeeting = () => {

		setIsNewMeeting(true)
		setMeetingDate(new Date())
		setMeetingTime(new Date('1970-01-01 10:00:00'))
		props.getStudentsForMeeting()
		// if (user && user.student) {
		// 	props.getMeetingDates(user.student.teacher.user.userId)
		// }
	}

	const closeMeeting = () => {
		setAgenda("");
		setMessage("")
		setMeetingDate(new Date())
		setMeetingTime(new Date('1970-01-01 10:00:00'))
		setIsNewMeeting(false)
	}

	const requestMeeting = (e) => {
		e.preventDefault()
		let date = moment(meetingDate)
		let time = moment(meetingTime)
		date.set('hour', time.get('hour')).set('minute', time.get('minute'))
		let data = {
			guest: studentId,
			scheduledAt: date,
			agenda,
			message: message ? message : ""
		}
		if (!data.message) delete data.message
		props.newMeeting(data)
	}


	return (
		<>
			{
				props.meetings.length == 0 ?
					<div className=" mt-3 d-flex flex-column justify-content-center align-items-center">
						<img src={newMeetingImg} className="img w-25" />
						<h3>
							It’s too lonely here
						</h3>
						<div>
							Get started by scheduling your first meeting
						</div>
						<Button.Ripple
							color="primary"
							className="btm btn-sm mt-1"
							onClick={() => addNewMeeting()}
						>
							<Plus size={14} />
							New Meeting
						</Button.Ripple>
					</div>
					:

					<Row>
						{
							props.meetings
								.filter(m => m.status == 'accepted'
									&& moment(m.scheduledAt).isSameOrAfter(moment())).length == 0 ?
								<Col lg={12} className="mb-1">
									<div className="d-flex  align-items-center justify-content-between">
										<h3>Meetings</h3>
										<Button.Ripple
											color="primary"
											onClick={() => addNewMeeting()}
										>
											<Plus size={14} />
											New Meeting
										</Button.Ripple>
									</div>
								</Col>
								:
								<>
									<Col lg={7}>
										<UpcomingMeeting meeting={upcomingMeetings && upcomingMeetings[0]} />
									</Col>
									<Col lg={5} style={{ maxWidth: 500 }}>
										<UpcomingMeetings addNewMeeting={addNewMeeting} />
									</Col>
								</>
						}
						<Col lg={12}>
							<MeetingList />
						</Col>
					</Row>
			}

			<Modal isOpen={isNewMeeting || props.newMeetingLoading} className="pt-5">
				<UILoader
					blocking={
						props.meetingsDatesLoading ||
						props.newMeetingLoading ||
						props.studentLoading
					}
				>
					<ModalBody className="pb-1">
						<div className="text-right">
							<X
								size={16}
								onClick={() => closeMeeting()}
							/>
						</div>
						<h5 className="mb-2">
							New Meeting
						</h5>
						{
							!props.studentLoading && props.students == 0 && props.studentsError &&
							<NoNetwork />
						}
						{
							!props.studentLoading && props.students == 0 && !props.studentsError ?
								<NotFound message={"No Student Found"} />
								:
								<Form
									className="mt-1 mb-2"
									onSubmit={e => requestMeeting(e)}>
									<Row>
										<Col lg='12'>
											<FormGroup>
												<Label for='select-basic'>Select Student</Label>
												<Input type='select' name='select' id='select-basic'
													value={studentId}
													onChange={(e) => {
														setStudentId(e.target.value)
													}}
												>
													{
														props.students.map((s, index) => <option key={"select-student" + index} value={s.user.userId}>{s.user.name}</option>)
													}
												</Input>
											</FormGroup>
										</Col>
										<Col lg='12'>
											<FormGroup>
												<Label className="ml-25">
													Agenda
												</Label>
												<InputGroup className='input-group-merge'>
													<Input
														type="text"
														placeholder='Meeting Agenda'
														value={agenda}
														onChange={e => setAgenda(e.target.value)}
														required />
												</InputGroup>
											</FormGroup>
										</Col>
										<Col md='12' lg='6'>
											<DatePicker
												value={meetingDate}
												onChange={setMeetingDate}
											// disableDates={props.meetingsDates.map(d => d.scheduledAt)}
											/>
										</Col>
										<Col md='12' lg='6'>
											<TimePicker
												value={meetingTime}
												onChange={setMeetingTime}
											/>
										</Col>
										<Col lg="12">
											<FormGroup>
												<Label className="ml-25">
													Personal Message
												</Label>
												<InputGroup className='input-group-merge'>
													<Input
														type='textarea'
														rows='4'
														placeholder='Send a personal message'
														value={message}
														onChange={e => setMessage(e.target.value)}
													/>
												</InputGroup>
											</FormGroup>
										</Col>
									</Row>
									<Button.Ripple type="submit" color='primary'>Request Meeting</Button.Ripple>
								</Form>
						}
					</ModalBody>
				</UILoader>
			</Modal>

		</>
	);
}


const mapStateToProps = (state) => {
	const {
		meetings,
		meetingsLoading,
		meetingsDates,
		meetingsDatesLoading,
		meetingsDatesError,
		newMeetingLoading,
		newMeetingError,
		students,
		studentLoading,
		studentsError,
	} = state.Meetings;
	return {
		meetings,
		meetingsLoading,
		meetingsDates,
		meetingsDatesLoading,
		meetingsDatesError,
		newMeetingLoading,
		newMeetingError,
		students,
		studentLoading,
		studentsError,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		getAllMeetings, getMeetingDates, newMeeting,
		getStudentsForMeeting
	})(MeetingHome)
)
