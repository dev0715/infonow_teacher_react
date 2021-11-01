import React from "react"
import { useState, useEffect } from "react"

import { connect } from 'react-redux'
import { withRouter } from 'react-router';

import {
    downloadEbook,
} from '@store/actions'
import { Modal, ModalBody, Button, ModalHeader } from "reactstrap"
import CardContainer from "../stripe/card-container";
import UILoader from "../../@core/components/ui-loader";
import StripeApp from '../stripe'
import { useTranslation } from "react-i18next";
const imgPlaceholder = require(`@src/assets/images/custom-placeholder/img_preview_placeholder.jpeg`);

const SavedCardModal = (props) => {

    const { t } = useTranslation()
    const { isOpen, ebook, toggleModal, paymentMethodsList, fetchData } = props

    const [isOpenAddNewCard, setIsOpenAddNewCard] = useState(false)

    const toggle = () => {
        toggleModal()
    }

    const toggleAddNewCardModal = () => {
        setIsOpenAddNewCard(!isOpenAddNewCard)
    }


    const payToBuyBook = () => {
        props.downloadEbook(ebook.ebookId)
    }


    useEffect(() => {
        if (props.defaultPaymentMethodSuccess || props.deletePaymentMethodSuccess || props.postPaymentSuccess) fetchData()
    }, [props.defaultPaymentMethodSuccess, props.deletePaymentMethodSuccess ,props.postPaymentSuccess])

    

    return (

        <>
            <UILoader blocking={props.postPaymentLoading || props.downloadEbookLoading 
            || props.defaultPaymentMethodLoading || props.deletePaymentMethodLoading}>
                <Modal className='modal-lg' isOpen={isOpen} toggle={toggle}>
                    <ModalHeader>Saved cards </ModalHeader>
                    <ModalBody>

                        <div className="mb-4">
                            <div className="pay-subscription-container text-right">
                                <Button.Ripple
                                    color='success'
                                    onClick={() => payToBuyBook()}>
                                    {t('Pay')}
                                </Button.Ripple>

                                <Button.Ripple
                                    className="m-2"
                                    color='flat-primary'
                                    onClick={() => setIsOpenAddNewCard(true)}>
                                    {t('New Card')}
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
        downloadEbookLoading,
        downloadEbookSuccess,
        downloadEbookError,
        downloadEbook,

    } = state.Ebook

    const {
        postPaymentSuccess,
        postPaymentLoading,
        postPaymentError,

        paymentMethod,
        paymentMethodSuccess,
        paymentMethodError,
        paymentMethodLoading,

        defaultPaymentMethodSuccess,
        deletePaymentMethodSuccess,
        defaultPaymentMethodLoading,
        deletePaymentMethodLoading,

    } = state.Stripe;
    return {

        downloadEbookLoading,
        downloadEbookSuccess,
        downloadEbookError,
        downloadEbook,

        postPaymentSuccess,
        postPaymentLoading,
        postPaymentError,

        paymentMethod,
        paymentMethodSuccess,
        paymentMethodError,
        paymentMethodLoading,

        defaultPaymentMethodSuccess,
        deletePaymentMethodSuccess,
        defaultPaymentMethodLoading,
        deletePaymentMethodLoading,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        downloadEbook
    })(SavedCardModal)
)
