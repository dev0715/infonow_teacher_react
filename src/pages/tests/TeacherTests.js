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
        if (props.onSelect) {
            props.onSelect(test);
        }
    }

    const addNewTest = () => {
        props.history.push({
            pathname: `addNewTest`
        })
    }

    useEffect(() => {
        fetchTeacherTests();
    }, [])

    return (
        <div>
            <TestList tests={props.tests} isTeacher={true} onSelect={onSelectTest} onNewTest={addNewTest} onBack={props.onBack} />
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
