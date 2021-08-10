import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, } from 'reactstrap';
import MeetingList from './MeetingList';
import UpcomingMeeting from './UpcomingMeeting';
import UpcomingMeetings from './UpcomingMeetings';
import { getAllMeetings, getMeetingDates } from '@store/actions';
import moment from 'moment';

const close = (
	<button type='button' className='ml-1 close'>
		<span>×</span>
	</button>
)

function MeetingHome(props) {

	const getUpcomingMeetings = () => {
		const meetingList = props.meetings || [];
		return meetingList.filter(x => moment(x.scheduledAt).isSameOrAfter(moment()) && x.status === 'accepted');
	}

	const upcomingMeetings = getUpcomingMeetings();

	return (
		<Row>
			<Col lg={7}>
				<UpcomingMeeting meeting={upcomingMeetings && upcomingMeetings[0]} />
			</Col>
			<Col lg={5} style={{ maxWidth: 500 }}>
				<UpcomingMeetings />
			</Col>
			<Col lg={12}>
				<MeetingList />
			</Col>
		</Row>
	);
}


const mapStateToProps = (state) => {
	const {
		meetings, meetingsError,
		meetingsLoading, meetingsDates,
		meetingsDatesLoading,
		meetingsDatesError
	} = state.Meetings;
	return {
		meetings, meetingsError,
		meetingsLoading, meetingsDates,
		meetingsDatesLoading,
		meetingsDatesError
	};
};

export default withRouter(
	connect(mapStateToProps, { getAllMeetings, getMeetingDates })(MeetingHome)
)
