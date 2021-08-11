import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useEffect } from 'react'

import { getTeacherAssignments } from '@store/actions'
import AssignmentList from './AssignmentList'

export const TeacherAssignments = (props) => {

    const { teacherAssignmentsLoading, assignments } = props

    const fetchTeacherAssignment = () => {
        props.getTeacherAssignments();
    }

    const onSelectAssignment = (assignment) => {
        props.history.push({
            pathname: `/assignments/${assignment.assignmentId}`,
            state: { assignment: assignment }
        })
    }

    const addNewAssignment = () => {
        props.history.push({
            pathname: `add-new-assignment`
        })
    }

    const onEditAssignment = (assignment) => {
        // props.history.push({
        //     pathname: `/edit-test/${test.testId}`,
        //     state: { test: test }
        // })
    }


    useEffect(() => {
        fetchTeacherAssignment();
    }, [])


    return (
        <div>
            <AssignmentList
                assignments={assignments}
                isTeacher={true}
                fetchAssignments={fetchTeacherAssignment}
                onSelect={onSelectAssignment}
                onNewAssignment={addNewAssignment}
                onEditAssignment={onEditAssignment}
                isReloading={teacherAssignmentsLoading}
                onBack={props.onBack} />
        </div>
    )
}

TeacherAssignments.propTypes = {
    onSelect: PropTypes.func,
    onBack: PropTypes.func
}


const mapStateToProps = (state) => {
    const { assignments, teacherAssignmentsLoading, teacherAssignmentsError } = state.Assignments;
    return { assignments, teacherAssignmentsLoading, teacherAssignmentsError };
}

const mapDispatchToProps = {
    getTeacherAssignments
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherAssignments))
