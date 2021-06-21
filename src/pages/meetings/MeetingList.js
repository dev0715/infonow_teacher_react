import React from 'react';

import {
	CardBody,
	CardTitle,
	Table,
	Badge,
} from 'reactstrap';

import CardReload from '../../@core/components/card-reload';

import { titleCase } from '@utils';
import { DateTime } from '../../components/date-time';
import { useState, useEffect } from 'react';
import { getAllMeetings } from '@store/actions';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

const MeetingList = (props) => {

	const fetchMeetings = () => {
		props.getAllMeetings();
	}

	useEffect(() => {
		fetchMeetings();
	}, []);




	const getMeetingStatusColor = (meetingStatus) => {
		switch (meetingStatus) {
			case 'accepted': return 'light-success';
			case 'rejected': return 'light-danger';
			case 'pending': return 'light-warning';
			case 'cancelled': return 'light-danger';
			case 'rescheduled': return 'light-warning';
			default: return 'light-warning'
		}
	}

	return (

		<CardReload
			title='My Meetings'
			onReload={fetchMeetings}
			isReloading={props.meetingsLoading}
		>
			<CardBody>
				<Table responsive hover >
					<thead>
						<tr>
							<th>#</th>
							<th>Subject</th>
							<th>Date</th>
							<th>Time</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{props.meetings && props.meetings.map(m =>
							<tr key={m.meetingId}>
								<td>1</td>
								<td>
									<span className='align-middle font-weight-bold'>
										{m.agenda}
									</span>
								</td>
								<td><DateTime dateTime={m.scheduledAt} type="date" /></td>
								<td><DateTime dateTime={m.scheduledAt} type="time" /></td>
								<td>
									<Badge
										pill
										color={getMeetingStatusColor(m.status)}
										className='mr-1'
									>
										{titleCase(m.status)}
									</Badge>
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</CardBody>
		</CardReload>
	);
};


const mapStateToProps = (state) => {
	const { meetings, meetingsError, meetingsLoading } = state.Meetings;
	return { meetings, meetingsError, meetingsLoading };
};

export default withRouter(
	connect(mapStateToProps, { getAllMeetings })(MeetingList)
)

