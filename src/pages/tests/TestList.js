import React from 'react';
import {
    CardBody,
    Table
} from 'reactstrap';
import { DateTime } from '../../components/date-time';
import PropTypes from 'prop-types';
import CardReload from '../../@core/components/card-reload';

const TestList = (props) => {

    const { tests } = props;
    const onSelectTests = (test) => {
        if (props.onSelect) {
            props.onSelect(test);
        }
    }

    return (
        <CardReload
            title='Tests'>
            <CardBody>
                <Table responsive hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Time Limit</th>
                            <th>Total Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests && tests.map((t, i) =>
                            <tr key={t.testId} onClick={() => onSelectTests(t)}>
                                <td>{i + 1}</td>
                                <td>
                                    <span className='align-middle font-weight-bold'>
                                        {t.title}
                                    </span>
                                </td>
                                <td><DateTime dateTime={t.createdAt} type="date" /></td>
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



