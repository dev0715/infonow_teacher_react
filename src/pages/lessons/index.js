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
    getTeacherRecentLessons
} from './store/actions'

import { withRouter } from 'react-router';
import { GET_BLOG_IMAGE_URL } from '../../helpers/url_helper'
import './style.scss'

import { Plus, X } from 'react-feather'

import UILoader from '../../@core/components/ui-loader';
import Table from 'reactstrap/lib/Table';

import { DateTime } from '../../components/date-time';

import { notifyError, notifySuccess } from '../../utility/toast'

import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';

const AppLessons = (props) => {

    const [isNewTopic, setIsNewTopic] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)

    useEffect(() => {
        props.getTeacherTopics()
        props.getTeacherRecentLessons()
    }, [])

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

    return (
        <Fragment >
            <UILoader
                blocking={props.topicsLoading || props.recentLessonsLoading}>
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
                                                        onClick={() => {
                                                            props.selectTopic(t.id)
                                                            props.history.push('/topic-lessons')
                                                        }}
                                                    >
                                                        <div
                                                            className="topic-image"
                                                            style={{
                                                                backgroundImage: `url(${GET_BLOG_IMAGE_URL(t.image.formats.thumbnail.url)})`
                                                            }}
                                                        >
                                                        </div>
                                                        <div className="topic-content">
                                                            <div className="heading">
                                                                {t.title}
                                                            </div>
                                                            <div className="description">
                                                                {t.description}
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
        newTopicError

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
        newTopicError
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getTeacherTopicLessons, getTeacherTopics,
        selectTopic, selectLesson, addNewTopic,
        getTeacherRecentLessons
    })(AppLessons)
)
