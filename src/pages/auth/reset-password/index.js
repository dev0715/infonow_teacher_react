import React, { useEffect, useState } from 'react';
import { useSkin } from '@hooks/useSkin'
import { Link, withRouter } from 'react-router-dom'
import { resetAccountPassword } from './store/actions'
import {
    Row, Col,
    CardTitle, FormGroup,
    Label, Button,
    Form, InputGroup, Input, CardText

} from 'reactstrap'

import {
    useParams
} from "react-router-dom";

import '@styles/base/pages/page-auth.scss'
import BrandLogo from '../../../components/brand-logo'
import { connect } from 'react-redux'

import { notifyError, notifySuccess, notifyWarning } from '../../../utility/toast'


const Login = (props) => {
    const [skin, setSkin] = useSkin()

    const illustration = skin === 'dark' ? 'reset-password-dark.svg' : 'reset-password.svg',
        source = require(`@src/assets/images/illustrations/${illustration}`)

    let { token } = useParams();

    const [processing, setProcessing] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    useEffect(() => {
        if (processing && !props.loading && props.error) {
            setProcessing(false)
            notifyError("Reset Password", props.error)
        }
        else if (processing && !props.loading && !props.error) {
            setProcessing(false)
            notifySuccess("Reset Password", "Password Reset successfully")
        }

    }, [props.loading])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password != confirmPassword)
            return notifyWarning("Reset Password", "Confirm password is not same")
        setProcessing(true)
        props.resetAccountPassword({
            token,
            password,
            confirmPassword
        })
    }

    return (
        <div className='auth-wrapper auth-v2'>
            <Row className='auth-inner m-0'>
                <Link className='brand-logo' to='/'>
                    <BrandLogo />
                    <h2 className='brand-text text-primary ml-1'>InfoNow</h2>
                </Link>
                <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                    <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                        <img className='img-fluid' src={source} alt='Login Illustration' />
                    </div>
                </Col>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                        <CardTitle tag='h2' className='font-weight-bold mb-1'>
                            Reset Password
                        </CardTitle>
                        <CardText className='mb-2'>
                            Your new password must be different from previously used passwords
                        </CardText>
                        <Form
                            onSubmit={e => handleSubmit(e)}
                        >
                            <FormGroup>
                                <Label className="ml-25">
                                    New Password
                                </Label>
                                <InputGroup className='input-group-merge'>
                                    <Input
                                        type="password"
                                        placeholder='Enter New Password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className='input-group-merge'>
                                    <Label className="ml-25">
                                        Confirm Password
                                    </Label>
                                    <InputGroup>
                                        <Input
                                            type="password"
                                            placeholder='Enter Password'
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            required />
                                    </InputGroup>
                                </InputGroup>
                            </FormGroup>
                            <Button.Ripple
                                type="submit"
                                color='primary'
                                className="btn btn-block mt-2"
                                disabled={props.loading}
                            >
                                {props.loading && <><i className="las la-spinner la-spin"></i>&nbsp;&nbsp;</>}
                                Submit
                            </Button.Ripple>
                            <br />
                            <Button.Ripple
                                type="button"
                                color='flat-primary'
                                className="btn btn-block mt-2"
                                disabled={props.loading}
                                onClick={() => props.history.replace('/login')}
                            >
                                Back to Login
                            </Button.Ripple>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </div >
    )
}


const mapStateToProps = (state) => {
    const {
        error,
        loading
    } = state.ResetPassword
    return {
        error,
        loading
    }
}

export default withRouter(
    connect(mapStateToProps, {
        resetAccountPassword
    })(Login)
)