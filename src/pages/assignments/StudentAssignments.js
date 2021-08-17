import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getStudentAssignments } from '@store/actions'
import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import AssignmentList from './AssignmentList'

const StudentAssignments = (props) => {

    const [mapAssignments, setMapAssignments] = useState()
    const { studentId, assignments, studentAssignmentsLoading } = props;

    const fetchStudentAssignments = () => {
        props.getStudentAssignments(studentId)

    }

    const onSelectAssignment = (assignment) => {
        // if (props.onSelectAssignment) {
        //     props.onSelectAssignment(assignment);
        // }
        // alert("ASSIGNMENT")
    }

    useEffect(fetchStudentAssignments, [])

    const filteredAssignmentsData = () => {
        let assignmentMap = new Map();
        for (let a of assignments) {
            if (a.assignment && !assignmentMap.has(a.assignment.assignmentId)) {
                assignmentMap.set(a.assignment.assignmentId, a.assignment);
            }
        }
        setMapAssignments(Array.from(assignmentMap.values()));

    }

    useEffect(filteredAssignmentsData, [assignments])

    return (
        <>
            {
                assignments &&
                <AssignmentList
                    assignments={mapAssignments}
                    isTeacher={false}
                    fetchAssignments={fetchStudentAssignments}
                    onSelect={onSelectAssignment}
                    isReloading={studentAssignmentsLoading}
                    onBack={props.onBack} />
            }
        </>
    )
}

StudentAssignments.propTypes = {
    studentId: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    onBack: PropTypes.func
}

const mapStateToProps = (state) => {
    const { assignments,
        studentAssignmentsLoading,
        studentAssignmentsError } = state.Assignments;
    return {
        assignments,
        studentAssignmentsLoading,
        studentAssignmentsError
    };
}

const mapDispatchToProps = {
    getStudentAssignments
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentAssignments))
