import React from "react"
import { useState, useEffect } from "react"

import { connect } from 'react-redux'
import { withRouter } from 'react-router';

import {
    postPayment,
} from '@store/actions'
import { Modal, ModalBody, ModalFooter, CardImg, Button, ModalHeader, Label } from "reactstrap"
import { DOCUMENT_BASE_URL } from "../../helpers/url_helper";
import CardContainer from "../stripe/card-container";
import UILoader from "../../@core/components/ui-loader";

import StripeApp from '../stripe'
const imgPlaceholder = require(`@src/assets/images/custom-placeholder/img_preview_placeholder.jpeg`);

const SavedCardModal = (props) => {

    const { isOpen, ebook, toggleModal, paymentMethodsList, fetchData } = props

    const [isOpenAddNewCard, setIsOpenAddNewCard] = useState(false)

    const toggle = () => {
        toggleModal()
    }

    const toggleAddNewCardModal = () => {
        setIsOpenAddNewCard(!isOpenAddNewCard)
    }


    const payToBuyBook = () => {
        props.postPayment({ "ebookId": ebook.ebookId })
    }

    useEffect(() => {
        if (props.postPaymentSuccess) fetchData()
    }, [props.postPaymentSuccess])

    return (

        <>
            <UILoader blocking={props.postPaymentLoading}>
                <Modal className='modal-lg' isOpen={isOpen} toggle={toggle}>
                    <ModalHeader>Saved cards </ModalHeader>
                    <ModalBody>

                        <div className="mb-4">
                            <div className="pay-subscription-container text-right">
                                <Button.Ripple
                                    color='success'
                                    onClick={() => payToBuyBook()}>
                                    Pay
                                </Button.Ripple>

                                <Button.Ripple
                                    className="m-2"
                                    color='flat-primary'
                                    onClick={() => setIsOpenAddNewCard(true)}>
                                    New Card
                                </Button.Ripple>
                            </div>
                        </div>

                        <CardContainer
                            paymentMethodsList={paymentMethodsList}
                        />

                    </ModalBody>
                    <StripeApp
                        isOpenModal={isOpenAddNewCard}
                        toggleModalState={toggleAddNewCardModal} />
                </Modal>

            </UILoader>
        </>

    )
}

const mapStateToProps = (state) => {

    const {

        postPaymentSuccess,
        postPaymentLoading,
        postPaymentError,

        paymentMethod,
        paymentMethodSuccess,
        paymentMethodError,
        paymentMethodLoading

    } = state.Stripe;
    return {

        postPaymentSuccess,
        postPaymentLoading,
        postPaymentError,

        paymentMethod,
        paymentMethodSuccess,
        paymentMethodError,
        paymentMethodLoading

    }
}

export default withRouter(
    connect(mapStateToProps, {
        postPayment
    })(SavedCardModal)
)
