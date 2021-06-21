import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import MeetingList from './MeetingList';
import UpcomingMeeting from './UpcomingMeeting';
import UpcomingMeetings from './UpcomingMeetings';
import { getAllMeetings } from '@store/actions';
import moment from 'moment';

function MeetingHome(props) {

    useEffect(() => {
        props.getAllMeetings();
    }, []);

    const getUpcomingMeetings = ()=>{
        const meetingList = props.meetings || [];
        return meetingList.filter(x => moment(x.scheduledAt).isSameOrAfter(moment()));
    }

    const upcomingMeetings = getUpcomingMeetings();

	return (
		<Row>
			<Col lg={7}>
                <UpcomingMeeting meeting={ upcomingMeetings && upcomingMeetings[0]}/>
			</Col>
			<Col lg={5} style={{ maxWidth: 500 }}>
				<UpcomingMeetings upcomingMeetings={upcomingMeetings}/>
			</Col>
			<Col lg={12}>
                <MeetingList Meetings={props.meetings}/>
			</Col>
		</Row>
	);
}


const mapStateToProps = (state) =>{
    const { meetings, meetingsError, meetingsLoading } = state.Meetings;
    return { meetings, meetingsError, meetingsLoading };
};

export default withRouter(
    connect(mapStateToProps, {getAllMeetings})(MeetingHome)
)
