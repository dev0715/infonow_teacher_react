import React, { useState, useEffect } from 'react'
import { Row, Col, Button, CardBody, CardTitle, Card, Label, Alert } from 'reactstrap'
import { DateTime } from '../../components/date-time'

// ** Store & Actions
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import {
  getPaymentMethods, getPaymentPlan,  postPayment,
} from '@store/actions'



import moment from 'moment';
import { notifyError, notifySuccess } from '../../utility/toast'
import StripeApp from '../stripe'
import UILoader from '../../@core/components/ui-loader'
import CardContainer from '../stripe/card-container'




const SavedCardsTabContent = (props) => {

  const [isOpenModal, setIsOpenModal] = useState(false)
  const toggleModalState = () => {
    setIsOpenModal(!isOpenModal)
  }

  const getPaymentMethodsAndPlans = () => {
    props.getPaymentMethods()
    props.getPaymentPlan()
  }

  useEffect(() => {
    getPaymentMethodsAndPlans()
  }, [])

  useEffect(() => {
    if (props.postPaymentSuccess) {
      notifySuccess('Payment', 'Payment was Successfully')
      getPaymentMethodsAndPlans()
    }
  }, [props.postPaymentSuccess])

  useEffect(() => {
    if (props.paymentMethodSuccess) {
      notifySuccess('Payment', 'Card added Successfully')
      getPaymentMethodsAndPlans()
    }
  }, [props.paymentMethodSuccess])
  

  useEffect(() => {
    if (props.postPaymentError) notifyError('Payment', props.postPaymentError)
  }, [props.postPaymentError])

  useEffect(() => {
    if (props.defaultPaymentMethodSuccess) {
      notifySuccess('Default Card', 'Selected card has been set as your default card successfully')
      getPaymentMethodsAndPlans()
    }
  }, [props.defaultPaymentMethodSuccess])

  useEffect(() => {
    if (props.defaultPaymentMethodError) notifyError('Default Card', props.defaultPaymentMethodError)
  }, [props.defaultPaymentMethodError])


  const activateSubscribtion = () => {
    props.postPayment()
  }


  return (
    <UILoader blocking={props.paymentMethodsListLoading || props.defaultPaymentMethodLoading ||
      props.paymentPlanLoading || props.postPaymentLoading}>
      <div className="subscription-page">
        {
          props.paymentMethodsListError && <Alert className="p-1 w-75" color="danger">{props.paymentMethodsListError}</Alert>
        }
        {
          props.paymentPlanError && <Alert className="p-1 w-75" color="danger">{props.paymentPlanError}</Alert>
        }
        {
          props.postPaymentError && <Alert className="p-1 w-75" color="danger">{props.postPaymentError}</Alert>
        }
        {
          props.paymentPlan &&
          Object.keys(props.paymentPlan).length > 0 &&
          <div className="mb-4">
            <h4>Active Plan</h4>
            <h5>{props.paymentPlan.price}{props.paymentPlan.currencyCode} <small>/month</small></h5>
            <h6>{props.paymentPlan.endDate && <>Renews on <DateTime type="date" dateTime={props.paymentPlan.endDate} /></>}</h6>
            <div className="pay-subscription-container">

              {
                ((!props.paymentPlan.startDate && !props.paymentPlan.endDate) || moment(props.paymentPlan.endDate).isBefore(new Date())) &&
                <Button.Ripple
                  color='success'
                  onClick={() => activateSubscribtion()}>
                  Pay
                </Button.Ripple>
              }
              <Button.Ripple
                size="sm"
                color='flat-primary'
                onClick={() => setIsOpenModal(true)}>
                New Card
              </Button.Ripple>
            </div>

          </div>
        }

        <StripeApp
          isOpenModal={isOpenModal}
          toggleModalState={toggleModalState} />

        <CardContainer
          paymentMethodsList={props.paymentMethodsList}
        />

      </div>
    </UILoader>
  )
}


const mapStateToProps = (state) => {

  const {
    paymentMethodsList,
    paymentMethodsListError,
    paymentMethodsListLoading,

    paymentPlan,
    paymentPlanError,
    paymentPlanLoading,

    postPaymentSuccess,
    postPaymentLoading,
    postPaymentError,

    defaultPaymentMethod,
    defaultPaymentMethodSuccess,
    defaultPaymentMethodLoading,
    defaultPaymentMethodError,

    paymentMethod,
    paymentMethodSuccess,
    paymentMethodError,
    paymentMethodLoading

  } = state.Stripe;
  return {
    paymentMethodsList,
    paymentMethodsListError,
    paymentMethodsListLoading,

    paymentPlan,
    paymentPlanError,
    paymentPlanLoading,

    postPaymentSuccess,
    postPaymentLoading,
    postPaymentError,

    defaultPaymentMethod,
    defaultPaymentMethodSuccess,
    defaultPaymentMethodLoading,
    defaultPaymentMethodError,

    paymentMethod,
    paymentMethodSuccess,
    paymentMethodError,
    paymentMethodLoading

  }
}

export default withRouter(
  connect(mapStateToProps, {
    getPaymentMethods,
    getPaymentPlan,
    postPayment
  })(SavedCardsTabContent)
)
