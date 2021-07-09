import React from 'react';
import {
    CardBody,
    Table
} from 'reactstrap';
import { DateTime } from '../../components/date-time';
import PropTypes from 'prop-types';
import CardReload from '../../@core/components/card-reload';

import { Button } from 'reactstrap'
import { Home, Star, Check, Plus } from 'react-feather'

const TestList = (props) => {

    const { tests } = props;
    const { isTeacher } = props;

    console.log("TESTS HERE ==>", tests);

    const onSelectTests = (test) => {
        if (props.onSelect) {
            props.onSelect(test);
        }
    }

    const onNewTest = () => {
        if (props.onNewTest) {
            props.onNewTest()
        }
    }

    return (
        <CardReload
            title='Tests'>
            {
                isTeacher &&
                <div className='mr-2 text-right'>
                    <Button.Ripple outline color='primary' onClick={onNewTest}>
                        <Plus size={14} />
                        <span className='align-middle ml-25'>Add New Test</span>
                    </Button.Ripple>
                </div>
            }


            <CardBody>
                <Table responsive hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            {
                                isTeacher &&
                                <th>Created At</th>
                            }
                            {
                                !isTeacher &&
                                <th>Start Time</th>
                            }
                            {
                                !isTeacher &&
                                <th>End Time</th>
                            }
                            <th>Time Limit</th>
                            <th>Total Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isTeacher && tests && tests.map((t, i) =>
                            t.test &&
                            <tr key={t.test.testId} onClick={() => onSelectTests(t.test)}>
                                <td>{i + 1}</td>
                                <td>
                                    <span className='align-middle font-weight-bold'>
                                        {t.test.title}
                                    </span>
                                </td>
                                <td><DateTime dateTime={t.startTime} type="dateTime" /></td>
                                <td><DateTime dateTime={t.endTime} type="dateTime" /></td>
                                <td>{t.test.timeLimit / 60 / 60} mins</td>
                                <td>{t.test.totalMarks}</td>
                            </tr>
                        )}
                        {isTeacher && tests && tests.map((t, i) =>

                            <tr key={t.testId} onClick={() => onSelectTests(t)}>
                                <td>{i + 1}</td>
                                <td>
                                    <span className='align-middle font-weight-bold'>
                                        {t.title}
                                    </span>
                                </td>
                                <td><DateTime dateTime={t.createdAt} type="dateTime" /></td>
                                <td>{t.timeLimit / 60 / 60} mins</td>
                                <td>{t.totalMarks}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </CardBody>
        </CardReload>
    );
};


TestList.propTypes = {
    onSelect: PropTypes.func,
    tests: PropTypes.array.isRequired,
    onBack: PropTypes.func
}


export default TestList;



