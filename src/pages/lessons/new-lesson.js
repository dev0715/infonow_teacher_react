
/**
 * Rich Text Editor - Getting Started Sample
 */
import React, { Fragment, useEffect, useState } from 'react';

// ** Third Party Components
import {
    Card, CardBody, FormGroup, Input, Form, Label, Button, InputGroup
} from 'reactstrap'



// ** Store & Actions
import { connect, } from 'react-redux'
import { addNewLesson } from './store/actions'

import { withRouter } from 'react-router';
import './style.scss'

import UILoader from '../../@core/components/ui-loader';


import ReactMarkdown from 'react-markdown'
import { render } from 'react-dom'

import { draftToMarkdown } from 'markdown-draft-js';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { notifyError, notifySuccess } from '../../utility/toast'
import { ArrowLeft } from 'react-feather'
import { stateToMarkdown } from "draft-js-export-markdown";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { BLOG_API_URL } from '../../helpers/url_helper'

const newLesson = (props) => {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);

    const [isNewLesson, setIsNewLesson] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [videoUrl, setVideoUrl] = useState("")
    const [isPreview, setIsPreview] = useState(false)

    const lessonContentRef = React.createRef()

    const handleEditorChange = (state) => {
        setEditorState(state);
    }

    useEffect(() => {
        if (!props.selectedTopic) {
            props.history.goBack()
        }
    }, [props.selectedTopic])

    useEffect(() => {
        if (isNewLesson && !props.newLessonUploading && !props.newLessonError) {
            setIsNewLesson(false)
            notifySuccess("New Lesson", "Lesson Added successfully")
            props.history.goBack()
        }
        else if (isNewLesson && !props.newLessonUploading && props.newLessonError) {
            setIsNewLesson(false)
            notifyError("New Lesson", props.newLessonError)
        }

    }, [props.newLessonUploading])

    const youTubeParser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : "";
    }

    const getVideoThumbnailUrl = (url) => {
        let id = youTubeParser(url)
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    }

    // const getMarkDownContent = () => {
    //     const content = editorState.getCurrentContent();
    //     const rawObject = convertToRaw(content);
    //     return draftToMarkdown(rawObject)
    // }

    const getVideoLink = (url) => {
        return `https://youtube.com/embed/${youTubeParser(url)}`
    }

    const submitLesson = (e) => {
        e.preventDefault();
        setIsNewLesson(true)
        props.addNewLesson({
            topic: props.selectedTopic,
            title,
            description,
            content: stateToMarkdown(editorState.getCurrentContent()),
            videoUrl: getVideoLink(videoUrl)
        })
    }

    const renderLesson = () => {
        let content = stateToMarkdown(editorState.getCurrentContent())
        if (content) {
            let uploadPath = `${BLOG_API_URL}/uploads/`;
            let markdown = String(content).replaceAll("/uploads/", uploadPath);
            let fun = () => {
                if (lessonContentRef.current) {
                    render(<ReactMarkdown>{markdown}</ReactMarkdown>, lessonContentRef.current)
                } else {
                    setTimeout(fun, 100)
                }
            }
            setTimeout(fun, 100)
        }
    }

    return (
        <Fragment >
            <UILoader
                blocking={props.newLessonUploading}>
                <Card >
                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="d-none d-lg-inline d-xl-inline">
                                    <Button.Ripple
                                        className='btn-block btn-icon'
                                        color='flat-primary'
                                        onClick={() => {
                                            props.history.goBack()
                                        }}
                                    >
                                        <ArrowLeft size={14} />
                                    </Button.Ripple>
                                </div>
                                <h4 className="text-primary ml-25 mb-0">
                                    New Lesson
                                </h4>
                            </div>
                            <div>
                                <Button.Ripple
                                    color='primary'
                                    onClick={() => setIsPreview(!isPreview)}
                                >
                                    {isPreview ? "Exit Preview" : "Preview"}
                                </Button.Ripple>
                            </div>
                        </div>
                        {
                            props.selectedTopic &&
                            <h6 className="ml-25 mb-0">
                                {
                                    props.topics.find(t => t.id == props.selectedTopic).title
                                }
                            </h6>
                        }
                        {
                            isPreview ?
                                <div className="active-lesson">
                                    <h3 className="mt-1">
                                        {title}
                                    </h3>
                                    {
                                        videoUrl &&
                                        <div className="mt-1 lesson-video">
                                            <iframe
                                                type="text/html"
                                                src={getVideoLink(videoUrl)}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            >
                                            </iframe>
                                        </div>
                                    }
                                    <div ref={lessonContentRef}
                                        id="active-lesson-content"
                                        className="mt-3" >
                                    </div>
                                    {
                                        renderLesson()
                                    }
                                </div>
                                : <Form
                                    className="mt-1 mb-2"
                                    onSubmit={e => submitLesson(e)}
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
                                                required
                                            />
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
                                        <Label className="ml-25 ">
                                            Content
                                        </Label>
                                        <Editor
                                            editorState={editorState}
                                            onEditorStateChange={handleEditorChange}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class"
                                            toolbarClassName="toolbar-class"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="ml-25">
                                            Video Url
                                        </Label>
                                        <InputGroup className='input-group-merge'>
                                            <Input
                                                type='url'
                                                placeholder='video url'
                                                value={videoUrl}
                                                onChange={e => setVideoUrl(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    {
                                        videoUrl &&
                                        <FormGroup>
                                            <img
                                                src={getVideoThumbnailUrl(videoUrl)}
                                                className="rounded  new-lesson-thumbnail"
                                                alt="Not Valid Url" />
                                        </FormGroup>
                                    }
                                    <Button.Ripple
                                        type="submit"
                                        color='primary'
                                        className='mt-2'
                                    >
                                        Submit
                                    </Button.Ripple>
                                </Form>
                        }
                    </CardBody>
                </Card>
            </UILoader>
        </Fragment >
    );

}


const mapStateToProps = (state) => {

    const {
        topics,
        selectedTopic,
        newLessonUploading,
        newLessonError

    } = state.Lessons;
    return {
        topics,
        selectedTopic,
        newLessonUploading,
        newLessonError
    }
}

export default withRouter(
    connect(mapStateToProps, {
        addNewLesson
    })(newLesson)
)
