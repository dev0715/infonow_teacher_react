import React, { useEffect, useState } from 'react';
import { useSkin } from '@hooks/useSkin'
import { Link, withRouter } from 'react-router-dom'
import { registerAccount } from './store/actions'
import {
    Row, Col,
    CardTitle, FormGroup,
    Label, Button,
    Form, InputGroup, Input, CardText

} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import BrandLogo from '../../../components/brand-logo'
import { connect } from 'react-redux'

import { notifyError, notifySuccess, notifyWarning } from '../../../utility/toast'


import GoogleSignIn from '../../../views/google-signin';


const Register = (props) => {
    const [skin, setSkin] = useSkin()

    const illustration = skin === 'dark' ? 'register-dark.svg' : 'register-light.svg',
        source = require(`@src/assets/images/pages/${illustration}`)

    const [processing, setProcessing] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        if (processing && !props.loading && props.error) {
            setProcessing(false)
            notifyError("Register Account", props.error)
        }
        else if (processing && !props.loading && !props.error) {
            setProcessing(false)
            notifySuccess("Register Account", "Account registered successfully")
        }

    }, [props.loading])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password != confirmPassword)
            return notifyWarning("Register Account", "Confirm password is not same")
        setProcessing(true)
        props.registerAccount({
            data: {
                role: "teacher",
                name,
                email,
                password,
                confirmPassword
            },
            history: props.history
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
                            Register Account
                        </CardTitle>
                        <CardText className='mb-2'>Please fill up the form</CardText>
                        <Form
                            onSubmit={e => handleSubmit(e)}
                        >
                            <FormGroup>
                                <Label className="ml-25">
                                    Name
                                </Label>
                                <InputGroup className='input-group-merge'>
                                    <Input
                                        type="text"
                                        placeholder='Enter Name'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label className="ml-25">
                                    Email
                                </Label>
                                <InputGroup className='input-group-merge'>
                                    <Input
                                        type="mail"
                                        placeholder='Enter Email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label className="ml-25">
                                    Password
                                </Label>
                                <InputGroup className='input-group-merge'>
                                    <Input
                                        type="password"
                                        placeholder='Enter Password'
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
                                disabled={props.loading || processing}
                            >
                                {props.loading && <><i className="las la-spinner la-spin"></i>&nbsp;&nbsp;</>}
                                Submit
                            </Button.Ripple>
                        </Form>
                        <p className='text-center mt-2'>
                            <span className='mr-25'>Already have an account?</span>
                            <Link to='/login'>
                                <span>Login</span>
                            </Link>
                        </p>
                        <div className='divider my-2'>
                            <div className='divider-text'>or</div>
                        </div>

                        <div className='auth-footer-btn d-flex justify-content-center'>
                            <GoogleSignIn
                                processing={processing}
                                processingCallBack={() => setProcessing(!processing)}
                            />
                        </div>
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
    } = state.Register
    return {
        error,
        loading
    }
}

export default withRouter(
    connect(mapStateToProps, {
        registerAccount
    })(Register)
)