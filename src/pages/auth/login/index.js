import React from 'react';
import { useSkin } from '@hooks/useSkin'
import { Link, useHistory, withRouter } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Coffee } from 'react-feather'
import Avatar from '@components/avatar'
import { loginUser, loginError } from '@store/actions'
import { Row, Col, CardTitle, CardText, FormGroup, Label, CustomInput, Button, Alert } from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation-safe';
import '@styles/base/pages/page-auth.scss'
import BrandLogo from '../../../components/brand-logo'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import { useEffect } from 'react';

const ToastContent = ({ name, role }) => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
                <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
            </div>
        </div>
        <div className='toastify-body'>
            <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
        </div>
    </Fragment>
)

const Login = (props) => {
    const [skin, setSkin] = useSkin()
    const history = useHistory()

    const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`)

    useEffect(() => {
        props.loginError(null)
    }, [])

    useEffect(() => {
        if (props.success) {
            history.push('/')
        }
    }, [props.success])


    const handleValidSubmit = (event, data) => {
        props.loginUser(data, history)
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
                            LOGIN
                        </CardTitle>
                        <CardText className='mb-2'>Welcome back! Please sign-in to your account</CardText>

                        <AvForm
                            className='auth-login-form mt-2'
                            onValidSubmit={(e, v) => handleValidSubmit(e, v)}>

                            {props.error &&
                                typeof props.error === 'string' ? (
                                <Alert color='danger'>
                                    <div className='alert-body'>
                                        <span className='ml-1'>
                                            {props.error}
                                        </span>
                                    </div>
                                </Alert>
                            ) : null}

                            <AvField
                                name='email'
                                label={'Email'}
                                value={'teacher@mail.com'}
                                className='form-control'
                                placeholder='john@example.com'
                                type='email'
                                required
                                autoFocus
                            />

                            <div className='d-flex justify-content-between'>
                                <Label className='form-label' for='password'>
                                    Password
                                </Label>
                                <Link to='/'>
                                    <small>Forgot Password?</small>
                                </Link>
                            </div>
                            <AvField
                                name='password'
                                label=''
                                value='12345678'
                                type='password'
                                required
                                placeholder='Enter Password'
                            />

                            <FormGroup>
                                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
                            </FormGroup>

                            <Button.Ripple
                                type='submit'
                                color='primary'
                                block
                                disabled={props.loading}>
                                {props.loading && <><i className="fa fa-spinner fa-spin" />&nbsp;&nbsp;</>}Sign in
                            </Button.Ripple>

                        </AvForm>
                        <p className='text-center mt-2'>
                            <span className='mr-25'>New on our platform?</span>
                            <Link to='/'>
                                <span>Create an account</span>
                            </Link>
                        </p>

                        <div className='divider my-2'>
                            <div className='divider-text'>or</div>
                        </div>

                        <div className='auth-footer-btn d-flex justify-content-center'>
                            <Button.Ripple color='facebook'>
                                <Facebook size={14} />
                            </Button.Ripple>
                            <Button.Ripple color='twitter'>
                                <Twitter size={14} />
                            </Button.Ripple>
                            <Button.Ripple color='google'>
                                <Mail size={14} />
                            </Button.Ripple>
                            <Button.Ripple className='mr-0' color='github'>
                                <GitHub size={14} />
                            </Button.Ripple>
                        </div>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}


const mapStateToProps = (state) => {
    const {
        error,
        success,
        user
    } = state.Login
    return {
        error,
        success,
        user
    }
}

export default withRouter(
    connect(mapStateToProps, { loginUser, loginError })(Login)
)