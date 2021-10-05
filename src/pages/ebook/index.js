import React from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardImg, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cropper from 'cropperjs';
import UILoader from '../../@core/components/ui-loader';
import {
    getEbooks
} from '@store/actions'
import { DOCUMENT_BASE_URL } from '../../helpers/url_helper';
import PreviewBookModal from './preview-book-modal';
const Ebook = (props) => {

    const { ebooks,
        ebooksError,
        ebooksLoading } = props

    const [isOpen, setIsOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)

    const fetchEbooks = () => {
        props.getEbooks()
    }


    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (previewImage)
            setIsOpen(!!previewImage)
    }, [previewImage])

    useEffect(() => {
        fetchEbooks()
    }, [])


    return (
        <>
            <UILoader blocking={ebooksLoading}>
               
                <Row className='match-height'>
                    {
                        ebooks &&
                        ebooks.length > 0 &&
                        ebooks.map(
                            (book, index) => (
                                <Col lg='4' md='6' key={`ebooksList-${index}`} >
                                    <Card>
                                        <CardImg top src={DOCUMENT_BASE_URL + book.coverImage} alt={book.title} />
                                        <CardBody>
                                            <CardTitle tag='h4'>{book.title}</CardTitle>
                                            <CardText>
                                                {book.description}
                                            </CardText>
                                            <Button.Ripple color='primary' outline>
                                                Download
                                            </Button.Ripple>
                                            <Button.Ripple onClick={() => setPreviewImage(book.previewImage)} className="ml-2" color='secondary' outline>
                                                Preview
                                            </Button.Ripple>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        )
                    }
                </Row>
                <PreviewBookModal
                    isOpen={isOpen}
                    Image={previewImage}
                    toggleModal={toggleModal}
                />
            </UILoader>
        </>
    )
}



const mapStateToProps = (state) => {
    const {
        ebooks,
        ebooksError,
        ebooksLoading

    } = state.Ebook

    return {
        ebooks,
        ebooksError,
        ebooksLoading
    }

}

const mapDispatchToProps = {
    getEbooks
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ebook))
