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

import '../../assets/scss/custom/components/_card.scss'
import CustomPagination from '../pagination';
const TestList = (props) => {

    const {count, limit ,  tests, isTeacher, fetchTests, isReloading ,onPageChange} = props;

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
    const onSelectPage = (page) =>{
        if(onPageChange)
           onPageChange(page)
    }



    return (
        <CardReload className="p-0 test-list"
            title='Tests'
            onReload={fetchTests}
            isReloading={isReloading}>
            {
                isTeacher &&
                <div className="text-right">
                    <Button.Ripple className='btn-header' color='primary' onClick={onNewTest}>
                        <Plus size={14} />
                        <span className='align-middle ml-25'>Add Test</span>
                    </Button.Ripple>
                </div>
            }

            <CardBody>
                <Table responsive hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Created At</th>
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
                                <td><DateTime dateTime={t.createdAt} type="dateTime" /></td>
                                <td>{t.timeLimit / 60} mins</td>
                                <td>{t.totalMarks}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <CustomPagination pages={Math.ceil(count / limit || 20)} onSelect={onSelectPage}/>
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



