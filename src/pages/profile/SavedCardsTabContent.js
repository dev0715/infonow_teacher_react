import React, { useState, useEffect } from 'react'
import { Row, Col, Button, CardBody, CardTitle, Card, Label, } from 'reactstrap'


// ** Store & Actions
import { connect } from 'react-redux'
import {
  getPaymentMethods, getPaymentPlan, setDefaultPaymentMethod,
  postPayment,
} from '@store/actions'

import { withRouter } from 'react-router';
import moment from 'moment';
import { notifyError, notifySuccess } from '../../utility/toast'
import StripeApp from '../stripe'
let AmericanExpress = require("../../assets/images/credit-cards/american_express.png")
let DinersClub = require("../../assets/images/credit-cards/diners_club.png")
let Discover = require("../../assets/images/credit-cards/discover.png")
let Jcb = require("../../assets/images/credit-cards/jcb.png")
let Master = require("../../assets/images/credit-cards/master.png")
let Visa = require("../../assets/images/credit-cards/visa.png")
let UnionPay = require("../../assets/images/credit-cards/union_pay.png")
let UnknownCard = require("../../assets/images/credit-cards/unknown_card.png")



const SavedCardsTabContent = (props) => {

  const [isOpenModal, setIsOpenModal] = useState(false)
  const toggleModalState = () => {
    setIsOpenModal(!isOpenModal)
  }

  useEffect(() => {
    props.getPaymentMethods()
    props.getPaymentPlan()
  }, [])

  const setDefaultCard = (card) => {
    props.setDefaultPaymentMethod({ "fingerprint": card.fingerprint })
  }

  const activateSubscribtion = () => {
    props.postPayment()
  }

  const getCardImage = (type) => {
    switch (type) {
      case "visa": return Visa
      case "mastercard": return Master
      case "american express": return AmericanExpress
      case "diners club": return DinersClub
      case "discover": return Discover
      case "jcb": return Jcb
      case "union pay": return UnionPay
      default: return UnknownCard
    }
  }

  return (
    <div className="subscription-page">
      {
        props.paymentPlan &&
        Object.keys(props.paymentPlan).length > 0 &&
        <div className="mb-4">
          <h4>Active Plan</h4>
          <h5>{props.paymentPlan.price}{props.paymentPlan.currencyCode} <small>/month</small></h5>
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


      <StripeApp isOpenModal={isOpenModal} toggleModalState={toggleModalState} />
      <Row className="card-item-container">
        {
          props.paymentMethodsList &&
          props.paymentMethodsList.length > 0 &&
          props.paymentMethodsList.map((p, index) =>

            <Col md={6} key={`payment-cards${index}`} onClick={() => setDefaultCard(p)}>
              <Row className={`card-item ${p.default ? "active" : ""} `} >
                <div>
                  <img src={getCardImage(p.type)} />
                </div>
                <div>
                  <h5> {p.brand}</h5>
                  <h6>{p.mask}</h6>
                  <p className="m-0"><small>Expiry {p.exp_month}/{p.exp_year}</small></p>
                </div>
              </Row>
            </Col>
          )
        }

      </Row>
    </div>
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

  } = state.Stripe;
  return {
    paymentMethodsList,
    paymentMethodsListError,
    paymentMethodsListLoading,

    paymentPlan,
    paymentPlanError,
    paymentPlanLoading,

  }
}

export default withRouter(
  connect(mapStateToProps, {
    getPaymentMethods,
    getPaymentPlan,
    setDefaultPaymentMethod,
    postPayment
  })(SavedCardsTabContent)
)
