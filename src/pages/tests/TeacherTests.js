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

    const onSelectTest = (test) => {
        props.history.push({
            pathname: `/tests/${test.testId}`,
            state: { test: test }
        })
    }

    const addNewTest = () => {
        props.history.push({
            pathname: `addNewTest`
        })
    }

    const onEditTest = (test) => {
        props.history.push({
            pathname: `/edit-test/${test.testId}`,
            state: { test: test }
        })
    }


    useEffect(() => {
        fetchTeacherTests();
    }, [])

    return (
        <div>
            <TestList tests={props.tests}
                isTeacher={true}
                onSelect={onSelectTest}
                onNewTest={addNewTest}
                onEditTest={onEditTest}
                onBack={props.onBack} />
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
