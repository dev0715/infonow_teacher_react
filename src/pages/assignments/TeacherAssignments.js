import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useEffect } from 'react'

import { getTeacherAssignments } from '@store/actions'
import AssignmentList from './AssignmentList'

export const TeacherAssignments = (props) => {

    const { teacherAssignmentsLoading, teacherAssignments } = props

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
            {Object.keys(teacherAssignments).length > 0 && teacherAssignments &&
                <AssignmentList
                    assignments={teacherAssignments}
                    isTeacher={true}
                    fetchAssignments={fetchTeacherAssignment}
                    onSelect={onSelectAssignment}
                    onNewAssignment={addNewAssignment}
                    onEditAssignment={onEditAssignment}
                    isReloading={teacherAssignmentsLoading}
                    onBack={props.onBack} />
            }
        </div>
    )
}

TeacherAssignments.propTypes = {
    onSelect: PropTypes.func,
    onBack: PropTypes.func
}


const mapStateToProps = (state) => {
    const { teacherAssignments,
        teacherAssignmentsLoading,
        teacherAssignmentsError } = state.Assignments;
    return {
        teacherAssignments,
        teacherAssignmentsLoading,
        teacherAssignmentsError
    };
}

const mapDispatchToProps = {
    getTeacherAssignments
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherAssignments))
