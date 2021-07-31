import React from 'react';
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import {
    Card, CardBody, Row, Col,
    Button,
    CardTitle,
    CardHeader,
    Modal, ModalBody, Input, InputGroup, FormGroup, Label, Form, CustomInput
} from 'reactstrap'

// ** Store & Actions
import { connect, useSelector } from 'react-redux'
import {
    getTeacherTopicLessons,
    getTeacherTopics,
    selectTopic,
    selectLesson,
    addNewTopic,
    getTeacherRecentLessons,
    deleteTopic
} from './store/actions'

import { withRouter } from 'react-router';
import { GET_BLOG_IMAGE_URL } from '../../helpers/url_helper'
import './style.scss'

import { Plus, Trash2, X, Edit } from 'react-feather'

import UILoader from '../../@core/components/ui-loader';
import Table from 'reactstrap/lib/Table';

import { DateTime } from '../../components/date-time';

import { notifyError, notifySuccess } from '../../utility/toast'

import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const AppLessons = (props) => {

    const [isNewTopic, setIsNewTopic] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)
    const [isTopicDeleting, setIsTopicDeleting] = useState(false)

    useEffect(() => {
        props.getTeacherTopics()
        props.getTeacherRecentLessons()
    }, [])

    useEffect(() => {
        if (isTopicDeleting && !props.topicDeleting && props.topicDeleteError) {
            setIsTopicDeleting(false)
            notifyError("Delete Topic", props.topicDeleteError)
        } else if (isTopicDeleting && !props.topicDeleting && !props.topicDeleteError) {
            setIsTopicDeleting(false)
            notifySuccess("Delete Topic", "Topic deleted successfully")
        }
    }, [props.topicDeleting])

    useEffect(() => {
        if (isNewTopic && !props.newTopicUploading && !props.newTopicError) {
            closeNewTopic()
            notifySuccess("New Topic", "Topic Added successfully")
        }
        else if (isNewTopic && !props.newTopicUploading && props.newTopicError) {
            notifyError("New Topic", props.newTopicError)
        }

    }, [props.newTopicUploading])

    const submitTopic = (e) => {
        e.preventDefault()
        props.addNewTopic({
            title,
            description,
            file
        })
    }

    const closeNewTopic = () => {
        setTitle("")
        setDescription("")
        setFile(null);
        setIsNewTopic(false)
    }

    const goToTopicDetails = (id) => {
        props.selectTopic(id)
        props.history.push('/topic-lessons')
    }

    const handleTopicDelete = (id) => {
        return MySwal.fire({
            icon: 'question',
            title: "Confirm",
            text: `Are you sure to delete this topic?`,
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary ml-1'
            },
            confirmButtonText: "Yes",
            buttonsStyling: false,
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                setIsTopicDeleting(true)
                props.deleteTopic(id)
            }
        })
    }

    return (
        <Fragment >
            <UILoader
                blocking={
                    props.topicsLoading ||
                    props.recentLessonsLoading ||
                    props.topicDeleting
                }
            >
                <Card >
                    <CardBody className='p-0'>
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-primary'>Topics</CardTitle>
                                <div className="text-right">
                                    <Button.Ripple
                                        color='primary'
                                        onClick={() => setIsNewTopic(true)}
                                    >
                                        <Plus size={14} />
                                        &nbsp;
                                        New Topic
                                    </Button.Ripple>
                                </div>
                            </CardHeader>
                            <CardBody>
                                {
                                    props.topics.length == 0 &&
                                    !props.topicsLoading &&
                                    !props.topicsError &&
                                    <NotFound message={"Add some topics"} />
                                }
                                {
                                    !props.topicsLoading &&
                                    props.topicsError &&
                                    <NoNetwork />
                                }
                                {
                                    props.topics.length > 0 &&
                                    <Row className="pt-1">
                                        {
                                            props.topics.map((t, index) =>
                                                <Col
                                                    key={'topic-key-' + index}
                                                    sm='12' md='6' lg='6'
                                                    className='pl-1 pr-1 pb-1 '
                                                >
                                                    <div
                                                        className={`teacher-topic-item`}
                                                    >
                                                        <div
                                                            className="topic-image"
                                                            onClick={() => goToTopicDetails(t.id)}
                                                            style={{
                                                                backgroundImage: `url(${GET_BLOG_IMAGE_URL(t.image.formats.thumbnail.url)})`
                                                            }}
                                                        >
                                                        </div>
                                                        <div className="topic-content">
                                                            <div
                                                                className="heading"
                                                                onClick={() => goToTopicDetails(t.id)}
                                                            >
                                                                {t.title}
                                                            </div>
                                                            <div className="description">
                                                                {t.description}
                                                            </div>
                                                            <div className="actions text-right">
                                                                <Button.Ripple
                                                                    color='flat-secondary'
                                                                    onClick={() => alert("Edit")}
                                                                >
                                                                    <Edit size={14} />
                                                                </Button.Ripple>
                                                                <Button.Ripple
                                                                    color='flat-danger'
                                                                    onClick={() => handleTopicDelete(t.id)}
                                                                >
                                                                    <Trash2 size={14} />
                                                                </Button.Ripple>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        }
                                    </Row>
                                }
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-primary">Recent Lessons</CardTitle>
                            </CardHeader>
                            <CardBody>
                                {
                                    props.recentLessons.length == 0 &&
                                    !props.recentLessonsLoading &&
                                    !props.recentLessonsError &&
                                    <NotFound />
                                }
                                {
                                    !props.recentLessonsLoading &&
                                    props.recentLessonsError &&
                                    <NoNetwork />
                                }
                                {
                                    props.recentLessons.length > 0 &&
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>Lesson</th>
                                                <th>Topic</th>
                                                <th>Uploaded</th>
                                                <th>Students</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                props.recentLessons.map((l, index) =>
                                                    <tr key={'recent_lesson_' + index}
                                                        onClick={() => {
                                                            props.selectTopic(l.topic.id)
                                                            props.selectLesson(l.id)
                                                            props.history.push("/topic-lessons")
                                                        }}
                                                    >
                                                        <td>
                                                            {l.title}
                                                        </td>
                                                        <td>
                                                            {l.topic.title}
                                                        </td>
                                                        <td>
                                                            <DateTime dateTime={l.created_at} />
                                                        </td>
                                                        <td>
                                                            {l.assignToStudents}
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                }
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>
                <Modal
                    isOpen={isNewTopic}
                    className='modal-dialog-centered'
                >
                    <UILoader
                        blocking={props.newTopicUploading}
                        className="model-loader"
                    >
                        <ModalBody className="pb-1">
                            <div className="text-right">
                                <X
                                    size={16}
                                    onClick={() => closeNewTopic()}
                                />
                            </div>
                            <h6>
                                New Topic
                            </h6>
                            <Form
                                className="mt-1 mb-2"
                                onSubmit={e => submitTopic(e)}
                            >
                                <FormGroup>
                                    <Label className="ml-25">
                                        Title
                                    </Label>
                                    <InputGroup className='input-group-merge'>
                                        <Input
                                            type="text"
                                            placeholder='Title'
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            required />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="ml-25">
                                        Description
                                    </Label>
                                    <InputGroup className='input-group-merge'>
                                        <Input
                                            type='textarea'
                                            rows='4'
                                            placeholder='Description'
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            required
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for='exampleCustomFileBrowser'>Image</Label>
                                    <CustomInput
                                        id='new_topic_image'
                                        type='file' accept="image/*"
                                        required
                                        onChange={(e) => {
                                            console.log("File", e)
                                            setFile(e.target.files[0])
                                        }} />
                                </FormGroup>
                                <Button.Ripple type="submit" color='primary'>Submit</Button.Ripple>
                            </Form>
                        </ModalBody>
                    </UILoader>
                </Modal >
            </UILoader>
        </Fragment >
    )
}

const mapStateToProps = (state) => {

    const {
        topics,
        topicsLoading,
        topicsError,
        lessons,
        lessonsLoading,
        lessonsError,
        selectedTopic,
        selectedLesson,
        recentLessons,
        recentLessonsLoading,
        recentLessonsError,
        newTopicUploading,
        newTopicError,
        topicDeleting,
        topicDeleteError
    } = state.Lessons;
    return {
        topics,
        topicsLoading,
        topicsError,
        lessons,
        lessonsLoading,
        lessonsError,
        selectedTopic,
        selectedLesson,
        recentLessons,
        recentLessonsLoading,
        recentLessonsError,
        newTopicUploading,
        newTopicError,
        topicDeleting,
        topicDeleteError
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getTeacherTopicLessons, getTeacherTopics,
        selectTopic, selectLesson, addNewTopic,
        getTeacherRecentLessons, deleteTopic
    })(AppLessons)
)
