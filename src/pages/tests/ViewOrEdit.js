import React from 'react';

import {
    Row,
    Col,
} from 'reactstrap';
import { useState, useEffect } from 'react'
import '../../assets/scss/custom/components/_card.scss'
import ViewTest from './ViewTest';
import EditTest from './EditTest';


const ViewOrEdit = (props) => {

    const { test } = props.location.state;
    const [isView, setIsView] = useState(true)

    const onChangeView = () => {
        setIsView(!isView)
    }

    useEffect(() => { }, [isView])

    return (
        <>
            {
                test && (
                    isView ?
                        <ViewTest test={test} onChangeView={onChangeView} />
                        : <EditTest test={test} onChangeView={onChangeView} />
                )
            }

        </>);
};

export default ViewOrEdit


