import React from 'react';
import { Bell, Plus } from 'react-feather';
import {
	Card,
	CardTitle,
	CardBody,
	CardText,
	Button,
	Row,
	Col,
} from 'reactstrap';
import Fade from 'reactstrap/lib/Fade';
import { DateTime } from '../../components/date-time';
import { upcomingMeetings } from './data';

const UpcomingMeetingItem = ({meeting}) => {
	return (
		<Row className='upcoming-meeting-item'>
			<Col xs={10}>
				<div className='meetup-header d-flex align-items-center'>
					<div className='meetup-day'>
                        <h6 className='mb-0'><DateTime dateTime={meeting.scheduledAt} format="ddd"/></h6>
						<h3 className='mb-0'><DateTime dateTime={meeting.scheduledAt} format="DD"/></h3>
					</div>
					<div className='my-auto'>
						<CardTitle tag='h4' className='mb-25'>
							{meeting.agenda}
						</CardTitle>
                        <CardText className='mb-0'>
                            <DateTime dateTime={meeting.scheduledAt} format="ddd DD MMM, YYYY"/>
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

const UpcomingMeetings = (props) => {
	return (
		<>
            {
                props.upcomingMeetings
                && props.upcomingMeetings.length > 0
                && (
				<Card className='card-developer-meetup card-upcoming-meetings'>
					<CardBody>
						<CardTitle>Upcoming Meetings</CardTitle>
                            <div className='upcoming-meeting-list'>
                                {props.upcomingMeetings.map(meeting => <UpcomingMeetingItem key={meeting.meetingId} meeting={meeting}/>)}
						</div>
						<Button.Ripple
							className='btn-block btn-icon'
							color='primary'
						>
							<Plus size={14} /> New Meeting
						</Button.Ripple>
					</CardBody>
				</Card>
			)}
		</>
	);
};

export default UpcomingMeetings;
