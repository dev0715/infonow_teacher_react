import React from 'react';
import {
    CardBody,
    Table
} from 'reactstrap';
import { DateTime } from '../../components/date-time';
import PropTypes from 'prop-types';
import CardReload from '../../@core/components/card-reload';
import { Button } from 'reactstrap'
import { Plus } from 'react-feather'

import { titleCase } from '../../helpers/HelperFunctions';
import '../../assets/scss/custom/components/_card.scss'

const AssignmentList = (props) => {

    const { assignments, isTeacher, fetchAssignments, isReloading } = props;

    const onSelectAssignment = (assignment) => {
        if (props.onSelect) {
            props.onSelect(assignment);
        }
    }

    const onNewAssignments = () => {
        if (props.onNewAssignment) {
            props.onNewAssignment()
        }
    }



    return (
        <CardReload className="p-0 test-list"
            title='Assignments'
            onReload={fetchAssignments}
            isReloading={isReloading}>
            {
                isTeacher &&
                <div className="text-right">
                    <Button.Ripple className='btn-header' color='primary' onClick={onNewAssignments}>
                        <Plus size={14} />
                        <span className='align-middle ml-25'>New Assignment</span>
                    </Button.Ripple>
                </div>
            }

            <CardBody>
                <Table responsive hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>title</th>
                            <th>Type</th>
                            <th>Created At</th>
                            <th>Total Marks</th>
                        </tr>
                    </thead>
                    <tbody>

                        {assignments && assignments.map((a, i) =>

                            <tr key={"assignment-" + i} onClick={() => onSelectAssignment(a)}>
                                <td>{i + 1}</td>
                                <td>
                                    <span className='align-middle font-weight-bold'>
                                        {a.title}
                                    </span>
                                </td>
                                <td>{titleCase(a.type)}</td>
                                <td><DateTime dateTime={a.createdAt} type="dateTime" /></td>
                                <td>{a.totalMarks}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </CardBody>
        </CardReload>
    );
};


AssignmentList.propTypes = {
    onSelect: PropTypes.func,
    assignments: PropTypes.array.isRequired,
    onBack: PropTypes.func
}


export default AssignmentList;



