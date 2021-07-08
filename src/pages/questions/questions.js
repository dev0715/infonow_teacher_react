
import React from 'react';
import Objective from './objective';
import Subjective from './subjective';

export const Questions = props => {
    const question = props.question;
    const answer = props.answer;
    const number = props.number || '';

    // console.log("QUESTIONS ==>", question);
    // console.log("ATTEMPT ==>", answer);

    return (
        <>  {
            question.type == 1 ?
                <Objective question={question}
                    answer={answer}
                    number={number} />
                :
                <Subjective question={question}
                    answer={answer}
                    number={number} />

        }

        </>
    )
}

export default Questions