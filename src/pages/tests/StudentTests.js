import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TestList from './TestList'
import { getStudentTests } from '@store/actions'

import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

export const StudentTests = (props) => {

    const [mapTests, setMapTests] = useState()
    const { studentId, tests } = props;
    const fetchStudentTests = () => {
        props.getStudentTests(studentId)
    }

    const onSelectTest = (test) => {
        if (props.onSelect) {
            props.onSelect(test);
        }
    }

    useEffect(fetchStudentTests, [])

    const filteredTestsData = () => {
        let testMap = new Map();
        for (let t of tests) {
            if (t.test && !testMap.has(t.test.testId)) {
                testMap.set(t.test.testId, t.test);
            }
        }
        setMapTests(Array.from(testMap.values()));
    }

    useEffect(filteredTestsData, [tests])

    return (
        <>
            {
                Object.keys(tests).length > 0 &&
                <TestList tests={mapTests}
                    isTeacher={false}
                    onSelect={onSelectTest}
                    onBack={props.onBack} />
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
