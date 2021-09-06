import React from 'react'
import moment from 'moment';
import PropTypes from 'prop-types'
const DATE_TIME_FORMAT = 'DD/MM/yyyy HH:mm'
const DATE_FORMAT = 'DD/MM/yyyy'
const TIME_FORMAT = 'HH:mm'

export const DateTime = (props) => {
    let format = DATE_TIME_FORMAT;

    if (props.type) {
        if (props.type === 'date') format = DATE_FORMAT
        if (props.type === 'time') format = TIME_FORMAT
    }

    return (
        <>
            {props.dateTime ? moment.utc(props.dateTime).local().format(props.format || format) : props.invalidValueText}
        </>
    )
}

export const DateTimeFunction = (dateTime, format = DATE_TIME_FORMAT) => {
    return moment.utc(dateTime).local().format(format)
}

DateTime.propTypes = {
    dateTime: PropTypes.string,
    invalidValueText: PropTypes.string
}