
import React from 'react'
import {
    Button, Modal, ModalHeader, ModalBody, Table
} from 'reactstrap'

import Avatar from '@components/avatar'
import { DateTime } from '../../components/date-time';
import { useState } from 'react';
import { getProfileImageUrl } from '../../helpers/url_helper'
const StudentListModal = (props) => {

    const { students, isOpen, toggleModalState, onSelectedStudent } = props
    const [scrollInnerModal, setScrollInnerModal] = useState(isOpen)

    return (
        < Modal className="modal-lg" scrollable isOpen={scrollInnerModal} toggle={toggleModalState}>
            <ModalHeader toggle={toggleModalState}>Assign test to student</ModalHeader>
            <ModalBody>

                <Table responsive >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students && students.map((s, i) =>
                            <tr key={`student-list-${s.userId}`} >
                                <td>{i + 1}</td>
                                <td >
                                    <Avatar
                                        className='cursor-pointer'
                                        img={getProfileImageUrl(s.user.profilePicture)}
                                    />
                                    <span className='align-middle font-weight-bold ml-1'>
                                        {s.user.name}
                                    </span>
                                </td>
                                <td>{s.user.email}</td>
                                <td><DateTime dateTime={s.user.createdAt} type="date" /></td>

                                <td>
                                    <Button.Ripple color='flat-primary' onClick={e => { e.preventDefault(); onSelectedStudent(s) }}>
                                        Assign
                                    </Button.Ripple>
                                </td>


                            </tr>
                        )}
                    </tbody>
                </Table>

            </ModalBody>
        </Modal >

    )
}
export default StudentListModal