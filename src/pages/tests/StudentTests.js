import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TestList from './TestList'
import { getStudentTests } from '@store/actions'

import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

export const StudentTests = (props) => {

    const { studentId } = props;

    const fetchStudentTests = () => {
        props.getStudentTests(studentId)
    }
    useEffect(fetchStudentTests, [])
    return (
        <>
            {Object.keys(props.tests).length > 0 &&
                <TestList tests={props.tests} onSelect={props.onSelect} onBack={props.onBack} />
            }
        </>
    )
}

StudentTests.propTypes = {
    studentId: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    onBack: PropTypes.func
}

const mapStateToProps = (state) => {
    const { tests, studentTestsLoading, studentTestsError } = state.Tests;
    return { tests, studentTestsLoading, studentTestsError };
}

const mapDispatchToProps = {
    getStudentTests
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentTests))
