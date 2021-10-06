import React from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardImg, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UILoader from '../../@core/components/ui-loader';
import {
    getEbooks,
    getPaymentMethods
} from '@store/actions'
import { DOCUMENT_BASE_URL } from '../../helpers/url_helper';
import PreviewBookModal from './preview-book-modal';
import StripeApp from '../stripe'
import SavedCardModal from './saved-cards-modal';

const Ebook = (props) => {

    const { ebooks, ebooksError, ebooksLoading } = props

    const [isOpenPreview, setIsOpenPreview] = useState(false)
    const [isOpenCardContainer, setIsOpenCardContainer] = useState(false)
    const [isOpenAddNewCard, setIsOpenAddNewCard] = useState(false)
    const [selectedBook, setSelectedBook] = useState()
    const [previewImage, setPreviewImage] = useState(null)

    
    const fetchData = () => {
        props.getEbooks()
        props.getPaymentMethods()
    }




    const togglePreviewModal = () => {
        setPreviewImage(null)
        setIsOpenPreview(!isOpenPreview)
    }

    const toggleAddNewCardModal = () => {
        setSelectedBook(null)
        setIsOpenAddNewCard(!isOpenAddNewCard)
    }

    const toggleCardContainerModal = () => {
        setSelectedBook(null)
        setIsOpenCardContainer(!isOpenCardContainer)
    }

    const BuyBook = (ebook) => {
       setSelectedBook(ebook)
    }

    useEffect(() =>{
        if(selectedBook){
            if(props.paymentMethodsList.length > 0) setIsOpenCardContainer(!!selectedBook)
            else setIsOpenAddNewCard(true)
        }
    },[selectedBook])

    useEffect(() => {
        if (previewImage)
            setIsOpenPreview(!!previewImage)
    }, [previewImage])

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
       if(props.paymentMethodSuccess) fetchData()
    }, [props.paymentMethodSuccess])


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
                                            <Button.Ripple color='primary' onClick={() => BuyBook(book)} outline >
                                                Buy Now
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

                <StripeApp
                    isOpenModal={isOpenAddNewCard}
                    toggleModalState={toggleAddNewCardModal} />

                <PreviewBookModal
                    isOpen={isOpenPreview}
                    Image={previewImage}
                    toggleModal={togglePreviewModal} />

                <SavedCardModal
                    ebook={selectedBook}
                    fetchData={fetchData}
                    isOpen={isOpenCardContainer}
                    toggleModal={toggleCardContainerModal}
                    paymentMethodsList={props.paymentMethodsList}
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

    const {
        paymentMethodsList,
        paymentMethodsListError,
        paymentMethodsListLoading,

        paymentMethod,
        paymentMethodSuccess,
        paymentMethodError,
        paymentMethodLoading
    } = state.Stripe

    return {
        ebooks,
        ebooksError,
        ebooksLoading,

        paymentMethodsList,
        paymentMethodsListError,
        paymentMethodsListLoading,

        paymentMethod,
        paymentMethodSuccess,
        paymentMethodError,
        paymentMethodLoading
    }

}

const mapDispatchToProps = {
    getEbooks,
    getPaymentMethods
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ebook))
