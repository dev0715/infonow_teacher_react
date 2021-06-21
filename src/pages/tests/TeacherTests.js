import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TestList from './TestList'
import { withRouter } from 'react-router-dom'
import { useEffect } from 'react'

import { getTeacherTests } from '@store/actions'

export const TeacherTests = (props) => {

    const fetchTeacherTests = () => {
        props.getTeacherTests();
    }

    useEffect(() => {
        fetchTeacherTests();
    }, [])

    return (
        <div>
            <TestList tests={props.tests} onSelect={props.onSelect} onBack={props.onBack} />
        </div>
    )
}

TeacherTests.propTypes = {
    onSelect: PropTypes.func,
    onBack: PropTypes.func
}


const mapStateToProps = (state) => {
    const { tests, teacherTestsLoading, teacherTestsError } = state.Tests;
    return { tests, teacherTestsLoading, teacherTestsError };
}

const mapDispatchToProps = {
    getTeacherTests
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherTests))
