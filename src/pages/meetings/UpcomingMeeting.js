import React from 'react';
import { useEffect } from 'react';
import Avatar from '@components/avatar';
import { Bell, Calendar, MapPin } from 'react-feather';
import AvatarGroup from '@components/avatar-group';
import {
	Card,
	CardTitle,
	CardBody,
	CardText,
	Media,
	Button,
	Row,
	Col,
} from 'reactstrap';
import { useSkin } from '@hooks/useSkin';
import { DateTime } from '../../components/date-time';
import { Link } from 'react-router-dom';

const UpcomingMeeting = ({meeting}) => {
	const [skin, setSkin] = useSkin();

	const illus =
		skin === 'dark' ? 'upcoming-meeting-dark.svg' : 'upcoming-meeting.svg';
	const illustration = require(`@src/assets/images/illustrations/${illus}`);

	return (
		<>
			{meeting && (
				<Card className='card-developer-meetup'>
					<div className='meetup-img-wrapper rounded-top text-center pt-3'>
						<img src={illustration} height='170' />
					</div>
					<CardBody>
						<div className='meetup-header d-flex align-items-center'>
							<div className='meetup-day'>
                                <h6 className='mb-0'><DateTime dateTime={meeting.scheduledAt} format="ddd"/></h6>
								<h3 className='mb-0'><DateTime dateTime={meeting.scheduledAt} format="DD"/></h3>
							</div>
							<div className='my-auto'>
								<CardTitle tag='h4' className='mb-25'>
									Upcoming Meeting
								</CardTitle>
								<CardText className='mb-0'>
									{meeting.agenda}
								</CardText>
							</div>
						</div>
						<div className='float-right'>
							<Button.Ripple
								className='mr-1'
								outline
								color='primary'
							>
								<Bell size={14} />
								<span className='align-middle ml-25'>
									Remind Me
								</span>
                            </Button.Ripple>
                            <a target="_blank" href={'https://meeting.meditati.ro/ec88d736-c5ec-4d3a-981b-1991b6ce7c9f/JWT%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdXNlcklkIjo3LCJ1c2VySWQiOiI2ODYzMzY2Mi04OGJiLTRkZDAtOTlmYS0xZGMzNWQ2MDg0MmUiLCJuYW1lIjoidGVzdFN0dWRlbnROZXciLCJlbWFpbCI6InN0dWRlbnQyQG1haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0yMFQwNzo1Mjo0Ni4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0yMFQwNzo1Mjo0Ni4wMDBaIiwicm9sZUlkIjoic3R1ZGVudCIsInJvbGUiOnsicm9sZUlkIjoic3R1ZGVudCIsInJvbGVOYW1lIjoiU3R1ZGVudCIsImNyZWF0ZWRBdCI6IjIwMjEtMDUtMjBUMDc6NDE6MzQuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDUtMjBUMDc6NDE6MzQuMDAwWiJ9LCJzdHVkZW50Ijp7InN0dWRlbnRJZCI6NywidGVhY2hlcklkIjo2LCJzdGF0dXMiOiJhY3RpdmUiLCJjcmVhdGVkQXQiOiIyMDIxLTA1LTIwVDA3OjUyOjQ2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA1LTIwVDA3OjU1OjM2LjAwMFoiLCJ0ZWFjaGVyIjp7InRlYWNoZXJJZCI6Niwic3RhdHVzIjoiYXBwcm92ZWQiLCJjcmVhdGVkQXQiOiIyMDIxLTA1LTIwVDA3OjQ4OjA0LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA1LTIxVDA3OjIxOjIwLjAwMFoiLCJ1c2VyIjp7Il91c2VySWQiOjYsInVzZXJJZCI6IjdhZmRmYTU2LTgxN2ItNDM2Ny1iOGRiLWEwNzFiMTI1M2FkMiIsIm5hbWUiOiJ0ZXN0VGVhY2hlciIsImVtYWlsIjoidGVhY2hlckBtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJG9tSkVlWG1OLjdHbEZiNGx4UVVLdC55b0QyMlZOa2RKZ1IuQk1KbDcxV01xeDF2bGZ4T0NPIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0yMFQwNzo0ODowNC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0yMFQwNzo0ODowNC4wMDBaIiwicm9sZUlkIjoidGVhY2hlciJ9fX0sImlhdCI6MTYyMTY4NzQ5NiwiZXhwIjoyMjI2NDg3NDk2fQ.RR8d4nOx1j2gXPEHhKqJVNLCxa5d6vvLCXqtQ1FHOF4'}>
                            <Button.Ripple className='mr-1' color='primary'>
                                Join
							</Button.Ripple>
                            </a>
							
						</div>
						<Media>
							<Avatar
								color='light-primary'
								className='rounded mr-1'
								icon={<Calendar size={18} />}
							/>
							<Media body>
								<h6 className='mb-0'><DateTime dateTime={meeting.scheduledAt} format="ddd DD MMM, YYYY"/></h6>
                                <small><DateTime dateTime={meeting.scheduledAt} type="time"/></small>
							</Media>
						</Media>
					</CardBody>
				</Card>
			)}
		</>
	);
};

export default UpcomingMeeting;
