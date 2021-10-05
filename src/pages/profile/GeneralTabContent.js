import React, { Fragment, useState, useEffect } from 'react'
import {
  Button, Media, Label, Row, Col, Input, FormGroup,
  Form, InputGroup
} from 'reactstrap'

import Select from 'react-select'
import { selectThemeColors } from '@utils'
// ** Store & Actions
import { connect } from 'react-redux'
import {
  uploadProfilePicture,
  updateProfileData

} from './store/actions'

import { withRouter } from 'react-router';

import { GET_IMAGE_URL } from '../../helpers/url_helper'

import { notifyError, notifySuccess } from '../../utility/toast'

const GeneralTabs = (props) => {

  const [isEditing, setIsEditing] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [county, setCounty] = useState("")
  const [country, setCountry] = useState("Romania")
  const [address, setAddress] = useState("")
  const [about, setAbout] = useState("")
  const [file, setFile] = useState(null)
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setName(props.user.name || "")
    setAbout(props.user.about || "")
    setCity(props.user.city || "")
    setCounty(props.user.county || "")
    setCountry(props.user.country || "")
    setAddress(props.user.address || "")
  }, [props.user])

  useEffect(()=>{
    if(county){
      let citiesDataList = props.countiesData.cities || {};
      let citiesList = citiesDataList[county] || []
      let filteredCities = citiesList.map(x=>{return {label: x.name, value: x.name}});
      setCities(filteredCities)
      setCity(filteredCities[0]);
    }
  },[county])

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
    setFile(files[0])

  }

  const publishPhoto = () => {
    let form = new FormData()
    form.append('file', file)
    props.uploadProfilePicture(form)
  }

  const cancelEditing = () => {
    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditing && !props.updateProfileLoading && !props.updateProfileError) {
      setIsEditing(false)
      notifySuccess("Update Profile", "Profile updated successfully")
    }
    else if (isEditing && !props.updateProfileLoading && props.updateProfileError) {
      notifyError("Update Profile", props.updateProfileError)
    }
  }, [props.updateProfileLoading])

  useEffect(() => {
    if (file && !props.updateProfilePictureLoading && !props.updateProfilePictureError) {
      setFile(null)
      notifySuccess("Update Profile Picture", "Profile picture updated successfully")
      window.location.reload()
    }
    else if (file && !props.updateProfilePictureLoading && props.updateProfilePictureError) {
      setFile(null)
      notifyError("Update Profile Picture", props.updateProfilePictureError)
    }
  }, [props.updateProfilePictureLoading])

  const handleSubmit = (e) => {
    e.preventDefault()
    props.updateProfileData({
      name, about, city, county, country, address
    })
  }

  const resetImage = () => {
    setFile(null);
    setAvatar(props.user.profilePicture || "")
  }

  const countryOptions = [
    { value: 'Romania', label: 'Romania' }
  ]

  let counties__  = props.countiesData.counties || []
  const countiesOptions = counties__.map(x=>{return {value: x.id, label: x.name}});

  return (
    <Fragment>
      <Media>
        <Media className='mr-25' left>
          <Media object className='rounded mr-50' src={file ? avatar : GET_IMAGE_URL(props.user.profilePicture)} alt='No Profile Picture' height='80' width='80' />
        </Media>
        <Media className='mt-75 ml-1' body>
          {
            file ? <>
              <Button.Ripple
                tag={Label}
                className='mr-75'
                size='sm'
                color='primary'
                onClick={() => publishPhoto()}
              >
                Publish
              </Button.Ripple>
              <Button.Ripple
                color='secondary'
                size='sm'
                outline
                onClick={() => resetImage()}
              >
                Reset
              </Button.Ripple>
            </>
              :
              <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                Upload
                <Input type='file' onChange={onChange} hidden accept='image/*' />
              </Button.Ripple>
          }

          <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
        </Media>
      </Media>
      <form className='mt-2'
        onSubmit={e => handleSubmit(e)}
      >
        <Row>
          <Col md='6'>
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
                  disabled={!isEditing}
                  required />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md='6'>
            <FormGroup>
              <Label className="ml-25">
                Email
              </Label>
              <InputGroup className='input-group-merge'>
                <Input
                  type="mail"
                  placeholder='Enter Email'
                  value={props.user.email || ""}
                  disabled
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md='6'>
            <FormGroup>
              <Label className="ml-25">
                Address
              </Label>
              <InputGroup className='input-group-merge'>
                <Input
                  type="text"
                  placeholder='Enter Address'
                  value={address || ""}
                  onChange={e => setAddress(e.target.value)}
                  disabled={!isEditing}
                  required
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md='6'>
            <FormGroup>
              <Label className="ml-25">
                County
              </Label>
              <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={countiesOptions.find(e => (e.value == county))}
                  options={countiesOptions}
                  isClearable={false}
                  onChange={e => setCounty(e.value)}
                />
            </FormGroup>
          </Col>
          <Col md='6'>
            <FormGroup>
              <Label className="ml-25">
                City
              </Label>
              <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={city}
                  options={cities}
                  isClearable={false}
                  onChange={e => setCity(e.value)}
                />
            </FormGroup>
          </Col>
          
          <Col md='6'>
            <FormGroup>
              <Label className="ml-25">Country</Label>
                <Label  className="ml-25" >Country</Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={countryOptions.find(e => (e.value == country))}
                  options={countryOptions}
                  isClearable={false}
                  onChange={e => setCountry(e.value)}
                />
            </FormGroup>
          </Col>
          <Col sm='12'>
            <FormGroup >
              <Input
                type='textarea'
                rows='4'
                placeholder='About'
                value={about}
                onChange={e => setAbout(e.target.value)}
                disabled={!isEditing}
                required
              />
            </FormGroup>
          </Col>
          <Col className='mt-2' sm='12'>
            {
              isEditing &&
              <>
                <Button.Ripple type='submit' className='mr-1' color='primary'>
                  Save changes
                </Button.Ripple>
                <Button.Ripple
                  type={'button'}
                  color='secondary' outline
                  onClick={() => cancelEditing()}
                >
                  Cancel
                </Button.Ripple>
              </>
            }
          </Col>
        </Row>
      </form>
      {
        !isEditing
        &&
        <Button.Ripple
          type={'button'}
          className='mr-1'
          color='primary'
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button.Ripple>
      }
    </Fragment >
  )
}

const mapStateToProps = (state) => {

  const {
    user,

    updateProfileLoading,
    updateProfileError,

    updateProfilePictureLoading,
    updateProfilePictureError,

    countiesData,
    countiesLoading,
    countiesError
  } = state.Profile;
  return {
    user,

    updateProfileLoading,
    updateProfileError,

    updateProfilePictureLoading,
    updateProfilePictureError,

    countiesData,
    countiesLoading,
    countiesError
  }
}

export default withRouter(
  connect(mapStateToProps, {
    uploadProfilePicture,
    updateProfileData
  })(GeneralTabs)
)
