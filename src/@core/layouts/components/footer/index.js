import React from 'react';
// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        COPYRIGHT © 2018-{new Date().getFullYear()}{' '}
        <a href='https://infonow.ro' target='_blank' rel='noopener noreferrer'>
          InfoNow
        </a>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
      </span>
      {/* <span className='float-md-right d-none d-md-block'>
        Made with
        <Heart size={14} />{'  '}
        by <a href='https://efsol.com.pk' target='_blank' rel='noopener noreferrer'>
          Efsol
        </a>
      </span> */}
    </p>
  )
}

export default Footer
