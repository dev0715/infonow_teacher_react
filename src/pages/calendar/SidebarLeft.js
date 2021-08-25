// ** React Imports
import React, { Fragment } from 'react'

import { useHistory } from 'react-router-dom'

// ** Custom Components
import classnames from 'classnames'
import { CardBody, Button, CustomInput } from 'reactstrap'

// ** illustration import
import illustration from '@src/assets/images/pages/calendar-illustration.png'
import { ArrowLeft } from 'react-feather'

// ** Filters Checkbox Array
const filters = [
  { label: 'Personal', color: 'danger', className: 'custom-control-danger mb-1' },
  { label: 'Business', color: 'primary', className: 'custom-control-primary mb-1' },
  { label: 'Family', color: 'warning', className: 'custom-control-warning mb-1' },
  { label: 'Holiday', color: 'success', className: 'custom-control-success mb-1' },
  { label: 'ETC', color: 'info', className: 'custom-control-info' }
]

const SidebarLeft = props => {

  const history = useHistory()
  // ** Props
  const { handleAddEventSidebar, toggleSidebar, updateFilter, updateAllFilters, store, dispatch } = props


  return (
    <Fragment>
      <div className='sidebar-wrapper'>
        <CardBody className='card-body  my-sm-0 mb-3'>
          <Button.Ripple color='flat-primary'
            className="btn btn-icon"
            onClick={() => history.goBack()}
          >
            <ArrowLeft />
          </Button.Ripple>
        </CardBody>
        <CardBody>
          <h5 className='section-label mb-1'>
            <span className='align-middle'>Filter</span>
          </h5>
          <CustomInput
            type='checkbox'
            className='mb-1'
            label='View All'
            id='view-all'
          // checked={store.selectedCalendars.length === filters.length}
          // onChange={e => dispatch(updateAllFilters(e.target.checked))}
          />
          <div className='calendar-events-filter'>
            {filters.length &&
              filters.map(filter => {
                return (
                  <CustomInput
                    type='checkbox'
                    key={filter.label}
                    id={filter.label}
                    label={filter.label}
                    // checked={store.selectedCalendars.includes(filter.label)}
                    className={classnames({
                      [filter.className]: filter.className
                    })}
                  // onChange={e => dispatch(updateFilter(filter.label))}
                  />
                )
              })}
          </div>
        </CardBody>
      </div>
      <div className='mt-auto'>
        <img className='img-fluid' src={illustration} alt='illustration' />
      </div>
    </Fragment>
  )
}

export default SidebarLeft
