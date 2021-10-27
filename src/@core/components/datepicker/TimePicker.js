import React from 'react'
import { Fragment, useState } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import FormGroup from 'reactstrap/lib/FormGroup'

const TimePicker = (props) => {

  return (
    <FormGroup>
      <Label id='timepicker'>{props.label || "Time"}</Label>
      <Flatpickr
        className='form-control'
        value={props.value}
        id='timepicker'

        options={{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true,
          defaultMinute: 0,
          minuteIncrement: 15
        }}

        onChange={date => props.onChange(date[0])}
      />
    </FormGroup>
  )
}

export default TimePicker
