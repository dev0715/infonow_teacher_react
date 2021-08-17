import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Plus, X } from 'react-feather';

import {
	Card,
	CardTitle,
	CardBody,
	CardText,
	Button,
	Row,
	Col,
	Modal,
	ModalBody,
	InputGroup,
	Input,
	Label,
	InputGroupAddon,
	InputGroupText

} from 'reactstrap';

import InputPasswordToggle from '../../@core/components/input-password-toggle'

import Fade from 'reactstrap/lib/Fade';
import { DateTime } from '../../components/date-time'
import TimePicker from '@components/datepicker/TimePicker';
import DatePicker from '@components/datepicker/DatePicker';
import { upcomingMeetings } from './data';
import CardReload from '@components/card-reload'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
	getMeetingDates, newMeeting, getStudentsForMeeting
} from '@store/actions';


import Avatar from '@components/avatar'

import UILoader from '../../@core/components/ui-loader';

import { getLoggedInUser } from './../../helpers/backend-helpers';
import { GET_IMAGE_URL } from './../../helpers/url_helper';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import { notifyError, notifySuccess } from '../../utility/toast'
import moment from 'moment';


import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';

const UpcomingMeetingItem = ({ meeting }) => {
	return (
		<Row className='upcoming-meeting-item'>
			<Col xs={10}>
				<div className='meetup-header d-flex align-items-center'>
					<div className='meetup-day'>
						<h6 className='mb-0'><DateTime dateTime={meeting.scheduledAt} format="ddd" /></h6>
						<h3 className='mb-0'><DateTime dateTime={meeting.scheduledAt} format="DD" /></h3>
					</div>
					<div className='my-auto'>
						<CardTitle tag='h4' className='mb-25'>
							{meeting.agenda}
						</CardTitle>
						<CardText className='mb-0'>
							<DateTime dateTime={meeting.scheduledAt} format="ddd DD MMM, YYYY" />
						</CardText>
					</div>
				</div>
			</Col>
			<Col xs={2}>
				<Fade>
					<Button.Ripple
						className='remind-me-btn btn-icon'
						color='primary'
					>
						<Bell size={14} />
					</Button.Ripple>
				</Fade>
			</Col>
		</Row>
	);
};

const UpcomingMeetings = props => {

	const [isNewMeeting, setIsNewMeeting] = useState(false)
	const [user, setUser] = useState({})

	const [studentId, setStudentId] = useState("")
	const [agenda, setAgenda] = useState("")
	const [message, setMessage] = useState("")
	const [meetingDate, setMeetingDate] = useState(new Date())
	const [meetingTime, setMeetingTime] = useState(new Date('1970-01-01 10:00:00'))

	useEffect(() => {
		setUser(getLoggedInUser())
	}, [])

	useEffect(() => {
		if (!props.studentLoading && !props.studentsError && props.students.length > 0)
			setStudentId(props.students[0].user.userId)
	}, [props.students])

	useEffect(() => {
		console.log("StudentId", studentId)
	}, [studentId])

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
		props.newMeeting({
			guest: studentId,
			scheduledAt: date,
			agenda,
			message
		})
	}

	return (
		<>
			{
				props.meetings
				&& props.meetings.length > 0
				&& (
					<CardReload
						title="Upcoming Meetings"
						className='card-developer-meetup card-upcoming-meetings'
						isReloading={props.meetingsLoading}
					>
						<CardBody>
							<div className='upcoming-meeting-list'>
								{props.meetings
									.filter(m => m.status == 'accepted' && moment(m.scheduledAt).isSameOrAfter(moment()))
									.map(meeting => <UpcomingMeetingItem key={meeting.meetingId} meeting={meeting} />)}
							</div>
							<Button.Ripple
								className='btn-block btn-icon'
								color='primary'
								onClick={() => addNewMeeting()}
							>
								<Plus size={14} /> New Meeting
							</Button.Ripple>
						</CardBody>
					</CardReload>
				)}

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
														required
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
};


const mapStateToProps = state => {
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
	}
}

export default withRouter(connect(mapStateToProps, {
	getMeetingDates, newMeeting,
	getStudentsForMeeting
})(UpcomingMeetings))
