import React from 'react';
import {
    CardBody,
    Table
} from 'reactstrap';
import { DateTime } from '../../components/date-time';
import PropTypes from 'prop-types';
import CardReload from '../../@core/components/card-reload';

const AttemptList = (props) => {

    const { attempts } = props;

    const onSelectAttempt = (attempt) => {
        if (props.onSelect) {
            props.onSelect(attempt);
        }
    }

    return (
        <CardReload
            title='Attempts'>
            <CardBody>
                <Table responsive hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Started At</th>
                            <th>Submitted At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attempts && attempts.map((a, i) =>
                            <tr key={a.attemptId} onClick={() => onSelectAttempt(a)}>
                                <td>{i + 1}</td>
                                <td><DateTime dateTime={a.createdAt} type="datetime" /></td>
                                <td><DateTime dateTime={a.submittedAt} type="datetime" /></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </CardBody>
        </CardReload>
    );
};


AttemptList.propTypes = {
    onSelect: PropTypes.func,
    attempts: PropTypes.array.isRequired,
    onBack: PropTypes.func
}


export default AttemptList;



