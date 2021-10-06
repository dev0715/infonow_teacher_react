import React from "react"
import { Row, Col } from 'reactstrap'

import { connect } from 'react-redux'
import { withRouter } from 'react-router';

import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
    setDefaultPaymentMethod,
  } from '@store/actions'


let AmericanExpress = require("../../assets/images/credit-cards/american_express.png")
let DinersClub = require("../../assets/images/credit-cards/diners_club.png")
let Discover = require("../../assets/images/credit-cards/discover.png")
let Jcb = require("../../assets/images/credit-cards/jcb.png")
let Master = require("../../assets/images/credit-cards/master.png")
let Visa = require("../../assets/images/credit-cards/visa.png")
let UnionPay = require("../../assets/images/credit-cards/union_pay.png")
let UnknownCard = require("../../assets/images/credit-cards/unknown_card.png")

const CardContainer = (props) => {

    const { paymentMethodsList } = props


    const MySwal = withReactContent(Swal)
    const setDefaultCard = (card) => {
        props.setDefaultPaymentMethod({ "fingerprint": card.fingerprint })
     }

    const setDefaultCardPopup = (p) => {
        return MySwal.fire({
            icon: 'question',
            title: "Confirm",
            text: 'Are you sure you want to set this card as your default card?',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
            },
            showCancelButton: true,
            confirmButtonText: 'Yes',
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                setDefaultCard(p)
            }
        })
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
        <Row className="card-item-container">
            {
                paymentMethodsList &&
                paymentMethodsList.length > 0 &&
                paymentMethodsList.map((p, index) =>

                    <Col md={6} key={`payment-cards${index}`} onClick={() => setDefaultCardPopup(p)}>
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
    )
}

const mapStateToProps = (state) => {

    const {  
      defaultPaymentMethod,
      defaultPaymentMethodSuccess,
      defaultPaymentMethodLoading,
      defaultPaymentMethodError,
  
    } = state.Stripe;
    return {
  
      defaultPaymentMethod,
      defaultPaymentMethodSuccess,
      defaultPaymentMethodLoading,
      defaultPaymentMethodError,
  
    }
  }
  
  export default withRouter(
    connect(mapStateToProps, {
      setDefaultPaymentMethod,
    })(CardContainer)
  )