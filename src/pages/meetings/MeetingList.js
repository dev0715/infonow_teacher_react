import React from "react";

import {
	CardBody,
	Table,
	Badge,
	UncontrolledDropdown,
	UncontrolledButtonDropdown,
	UncontrolledTooltip,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	Modal,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	InputGroup,
	Row,
	Col,
	Button,
} from "reactstrap";

import { MoreVertical, X, AlertCircle } from "react-feather";

import CardReload from "../../@core/components/card-reload";

import { titleCase } from "@utils";
import { DateTime } from "../../components/date-time";
import { useState, useEffect } from "react";
import { getAllMeetings, updateMeeting } from "@store/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MeetingActions, getMeetingStatusColor } from "./util";
import { getLoggedInUser } from "../../helpers/backend-helpers";
import { MeetingPreview } from "./meetingPreview";
import UILoader from "../../@core/components/ui-loader";
import "./style.scss";

import TimePicker from "@components/datepicker/TimePicker";
import DatePicker from "@components/datepicker/DatePicker";
import Avatar from "@components/avatar";
import { GET_IMAGE_URL } from "./../../helpers/url_helper";
import { notifyError, notifySuccess } from "../../utility/toast";
import moment from "moment";

import NotFound from "../../components/not-found";
import { useTranslation } from "react-i18next";

const MeetingList = (props) => {
	const { t } = useTranslation();
	const [user, setUser] = useState({});
	const [updateMeetingId, setUpdateMeetingId] = useState({});
	const [meetingAction, setMeetingAction] = useState("Updated");
	const [viewMeetingId, setViewMeetingId] = useState({});
	const [message, setMessage] = useState("");
	const [meetingDate, setMeetingDate] = useState(new Date());
	const [meetingTime, setMeetingTime] = useState(
		new Date("1970-01-01 10:00:00")
	);

	useEffect(() => {
		if (updateMeetingId) {
			let meeting = getMeetingById(updateMeetingId);
			if (meeting) {
				setMeetingDate(meeting.scheduledAt);
				setMeetingTime(meeting.scheduledAt);
			}
		}
	}, [updateMeetingId]);

	const fetchMeetings = () => {
		props.getAllMeetings();
	};

	useEffect(() => {
		setUser(getLoggedInUser());
		fetchMeetings();
	}, []);

	useEffect(() => {
		let meeting = props.meetings.find((m) => m.meetingId == updateMeetingId);
		if (meeting) {
			if (!meeting.loading && !meeting.error) {
				setUpdateMeetingId(null);
				notifySuccess(
					t("Update Meeting"),
					t(`${t("Meeting")} ${meetingAction} ${t("successfully")}`)
				);
			} else if (!meeting.loading && meeting.error) {
				notifyError(t("Update Meeting"), meeting.error);
			}
		}

		meeting = props.meetings.find((m) => m.meetingId == viewMeetingId);
		if (meeting) {
			if (!meeting.loading && !meeting.error) {
				setViewMeetingId(null);
				notifySuccess(
					t("Update Meeting"),
					t(`${t("Meeting")} ${meetingAction} ${t("successfully")}`)
				);
			} else if (!meeting.loading && meeting.error) {
				notifyError("Update Meeting", meeting.error);
			}
		}
	}, [props.meetings]);

	const onMeetingAction = (e, id, action, data = {}) => {
		e.preventDefault();
		setMeetingAction(action);
		props.updateMeeting({ id, action, data });
	};

	const getMeetingById = (id) => {
		return props.meetings.find((m) => m.meetingId == id);
	};

	const rescheduleMeeting = (e) => {
		let date = moment(meetingDate);
		let time = moment(meetingTime);
		date.set("hour", time.get("hour")).set("minute", time.get("minute"));
		let data = {
			message,
			scheduledAt: date,
		};
		if (!data.message) delete data.message;
		onMeetingAction(e, updateMeetingId, MeetingActions.Reschedule, data);
	};

	const closeRescheduleMeeting = () => {
		setUpdateMeetingId(null);
		setMessage("");
		setMeetingDate(new Date());
		setMeetingTime(new Date("1970-01-01 10:00:00"));
	};

	const isMeetingAfterCurrentDate = (date) => {
		return moment(date).isAfter(new Date())
	}

	const meetingDropDownItem = (meetingId, meetingAction, labelText) => {
		return (
			<DropdownItem
				tag="a"
				href="/"
				className="w-100"
				onClick={(e) => {
					e.preventDefault()
					meetingAction == "rescheduled"
						? setUpdateMeetingId(meetingId)
						: onMeetingAction(e, meetingId, meetingAction)
				}
				}
			>
				<span className="align-middle ml-50">{t(labelText)}</span>
			</DropdownItem>
		);
	};

	const rescheduleMeetingModel = () => {
		let meeting = getMeetingById(updateMeetingId);
		return meeting ? (
			<Modal isOpen={true} className="pt-5">
				<UILoader blocking={meeting.loading}>
					<ModalBody className="p-2">
						<div className="close-icon">
							<X size={16} onClick={() => closeRescheduleMeeting()} />
						</div>
						<h3 className="mb-2">{t("Reschedule Meeting")}</h3>
						<div className="text-center">
							<Avatar
								className="box-shadow-1 avatar-border"
								img={GET_IMAGE_URL(
									meeting.participants.find((u) => u.user.userId != user.userId)
										.user.profilePicture
								)}
								size="xl"
							/>
							<h5 className="mt-25 pt-1">
								{
									meeting.participants.find((u) => u.user.userId != user.userId)
										.user.name
								}
							</h5>
						</div>
						<Form className="mt-1 mb-2" onSubmit={(e) => rescheduleMeeting(e)}>
							<Row>
								<Col lg="12">
									<FormGroup>
										<DatePicker value={meetingDate} onChange={setMeetingDate} />
									</FormGroup>
								</Col>
								<Col lg="12">
									<FormGroup>
										<TimePicker value={meetingTime} onChange={setMeetingTime} />
									</FormGroup>
								</Col>
							</Row>
							<FormGroup>
								<Label className="ml-25">{t("Personal Message")}</Label>
								<InputGroup className="input-group-merge">
									<Input
										type="textarea"
										rows="4"
										placeholder={t("Send a personal message")}
										value={message}
										onChange={(e) => setMessage(e.target.value)}
									/>
								</InputGroup>
							</FormGroup>
							<div className="text-right">
								<Button.Ripple
									className="mr-1"
									color="primary"
									outline
									onClick={() => closeRescheduleMeeting()}
								>
									{t("Cancel")}
								</Button.Ripple>
								<Button.Ripple type="submit" color="primary">
									{t("Submit")}
								</Button.Ripple>
							</div>
						</Form>
					</ModalBody>
				</UILoader>
			</Modal>
		) : null;
	};

	const meetingDetailsModel = () => {
		let meeting = getMeetingById(viewMeetingId);
		return meeting ? (
			<Modal isOpen={true} className="pt-5">
				<UILoader blocking={meeting.loading}>
					<ModalBody className="p-2">
						<div className="close-icon">
							<X size={16} onClick={() => setViewMeetingId(null)} />
						</div>
						<h3 className="mb-2">{t("Meeting Details")}</h3>
						<MeetingPreview meeting={meeting} user={user} />
						<div className="mt-3 text-right">
							{(meeting.status == "pending" ||
								meeting.status == "rescheduled") && (
									<UncontrolledButtonDropdown>
										<DropdownToggle outline color="primary" caret>
											{t("Actions")}
										</DropdownToggle>
										<DropdownMenu>

											{meeting.status == "pending" &&
												meeting.user.userId != user.userId && (
													<>
														{meetingDropDownItem(
															viewMeetingId,
															MeetingActions.Reject,
															"Reject"
														)}
														{/* <DropdownItem
                            href="/"
                            tag="a"
                            onClick={(e) =>
                              onMeetingAction(
                                e,
                                viewMeetingId,
                                MeetingActions.Reject
                              )
                            }
                          >
                            {t("Reject")}
                          </DropdownItem> */}
														<DropdownItem
															href="/"
															tag="a"
															onClick={(e) => {
																e.preventDefault();
																setUpdateMeetingId(viewMeetingId);
																setViewMeetingId(null);
															}}
														>
															{t("Reschedule")}
														</DropdownItem>
													</>
												)}
											{
												(meeting.status == "rescheduled" ||
													(meeting.status == "pending" &&
														meeting.user.userId == user.userId)) &&
												meetingDropDownItem(
													viewMeetingId,
													MeetingActions.Cancel,
													"Cancel"
												)
												// 	 (
												//   <DropdownItem
												//     href="/"
												//     tag="a"
												//     onClick={(e) =>
												//       onMeetingAction(
												//         e,
												//         viewMeetingId,
												//         MeetingActions.Cancel
												//       )
												//     }
												//   >
												//     {t("Cancel")}
												//   </DropdownItem>
												// )
											}
										</DropdownMenu>
									</UncontrolledButtonDropdown>
								)}
							{((meeting.status == "pending" &&
								meeting.user.userId != user.userId) ||
								(meeting.status == "rescheduled" &&
									meeting.user.userId == user.userId)) && (
									<Button.Ripple
										type="button"
										color="primary"
										className="ml-2"
										onClick={(e) =>
											onMeetingAction(e, viewMeetingId, MeetingActions.Accept)
										}
									>
										{t("Accept")}
									</Button.Ripple>
								)}
						</div>
					</ModalBody>
				</UILoader>
			</Modal>
		) : null;
	};

	return (
		<>
			<CardReload
				title={t("My Meetings")}
				onReload={fetchMeetings}
				isReloading={props.meetingsLoading}
			>
				<CardBody className="meeting-table-body">
					{props.meetings.filter((m) => m.status != "accepted").length == 0 ? (
						<NotFound message="No meetings found" />
					) : (
						<Table responsive hover>
							<thead>
								<tr>
									<th>#</th>
									<th>{t("Subject")}</th>
									<th>{t("Date")}</th>
									<th>{t("Time")}</th>
									<th>{t("Status")}</th>
									<th>{t("Action")}</th>
								</tr>
							</thead>
							<tbody>
								{props.meetings &&
									props.meetings.map((m, index) => (
										<tr key={m.meetingId}>
											<td>{index + 1}</td>
											<td>
												<span className="align-middle font-weight-bold">
													{m.agenda}
												</span>
											</td>
											<td>
												<DateTime dateTime={m.scheduledAt} type="date" />
											</td>
											<td>
												<DateTime dateTime={m.scheduledAt} type="time" />
											</td>
											<td>
												<Badge
													pill
													color={getMeetingStatusColor(m.status)}
													className="mr-1"
												>
													{titleCase(m.status)}
												</Badge>
											</td>
											<td>
												<UILoader blocking={m.loading}>
													<Row>
														<Col sm="3">
															<UncontrolledDropdown>
																<DropdownToggle className="pr-1" tag="span">
																	<MoreVertical size={15} />
																</DropdownToggle>
																<DropdownMenu right>
																	<DropdownItem
																		tag="a"
																		href="/"
																		className="w-100"
																		onClick={(e) => {
																			e.preventDefault();
																			setViewMeetingId(m.meetingId);
																		}}
																	>
																		<span className="align-middle ml-50">
																			{t("View")}
																		</span>
																	</DropdownItem>

																	{m.status == "rescheduled" &&
																		m.user.userId == user.userId &&
																		//   <DropdownItem
																		//     tag="a"
																		//     href="/"
																		//     className="w-100"
																		//     onClick={(e) =>
																		//       onMeetingAction(
																		//         e,
																		//         m.meetingId,
																		//         MeetingActions.Accept
																		//       )
																		//     }
																		//   >
																		//     <span className="align-middle ml-50">
																		//       {t("Accept")}
																		//     </span>
																		//   </DropdownItem>

																		meetingDropDownItem(
																			m.meetingId,
																			MeetingActions.Accept,
																			"Accept"
																		)}
																	{m.status == "pending" &&
																		m.user.userId != user.userId && (
																			<>
																				{/* <DropdownItem
                                          tag="a"
                                          href="/"
                                          className="w-100"
                                          onClick={(e) =>
                                            onMeetingAction(
                                              e,
                                              m.meetingId,
                                              MeetingActions.Accept
                                            )
                                          }
                                        >
                                          <span className="align-middle ml-50">
                                            {t("Accept")}
                                          </span>
                                        </DropdownItem> */}
																				{
																					moment(m.scheduledAt).isSameOrAfter(new Date()) &&
																					meetingDropDownItem(
																						m.meetingId,
																						MeetingActions.Accept,
																						"Accept"
																					)
																				}
																				{meetingDropDownItem(
																					m.meetingId,
																					MeetingActions.Reject,
																					"Reject"
																				)}
																				{meetingDropDownItem(
																					m.meetingId,
																					MeetingActions.Reschedule,
																					"Reschedule"
																				)}
																				{/* <DropdownItem
                                          tag="a"
                                          href="/"
                                          className="w-100"
                                          onClick={(e) =>
                                            onMeetingAction(
                                              e,
                                              m.meetingId,
                                              MeetingActions.Reject
                                            )
                                          }
                                        >
                                          <span className="align-middle ml-50">
                                            {t("Reject")}
                                          </span>
                                        </DropdownItem> */}
																				{/* <DropdownItem
                                          tag="a"
                                          href="/"
                                          className="w-100"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setUpdateMeetingId(m.meetingId);
                                          }}
                                        >
                                          <span className="align-middle ml-50">
                                            {t("Reschedule")}
                                          </span>
                                        </DropdownItem> */}
																			</>
																		)}
																	{
																		(m.status == "rescheduled" ||
																			(m.status == "pending" &&
																				m.user.userId == user.userId)) &&
																		meetingDropDownItem(
																			m.meetingId,
																			MeetingActions.Cancel,
																			"Cancel"
																		)
																		// 	  (
																		//     <DropdownItem
																		//       tag="a"
																		//       href="/"
																		//       className="w-100"
																		//       onClick={(e) =>
																		//         onMeetingAction(
																		//           e,
																		//           m.meetingId,
																		//           MeetingActions.Cancel
																		//         )
																		//       }
																		//     >
																		//       <span className="align-middle ml-50">
																		//         {t("Cancel")}
																		//       </span>
																		//     </DropdownItem>
																		//   )
																	}
																</DropdownMenu>
															</UncontrolledDropdown>
														</Col>
														{m.error && (
															<Col sm={3}>
																<AlertCircle
																	color="red"
																	id={`meeting-error-${m.meetingId}`}
																/>
																<UncontrolledTooltip
																	placement="top"
																	target={`meeting-error-${m.meetingId}`}
																>
																	{m.error}
																</UncontrolledTooltip>
															</Col>
														)}
													</Row>
												</UILoader>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					)}
				</CardBody>
			</CardReload>
			{rescheduleMeetingModel()}
			{meetingDetailsModel()}
		</>
	);
};

const mapStateToProps = (state) => {
	const { meetings, meetingsError, meetingsLoading } = state.Meetings;
	return { meetings, meetingsError, meetingsLoading };
};

export default withRouter(
	connect(mapStateToProps, { getAllMeetings, updateMeeting })(MeetingList)
);
