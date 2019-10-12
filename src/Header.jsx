import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

function Header ({ columns, sortOrderHandler, isMobile }) {
  const [activeColumn, setActiveColumn] = useState([])
  const [sortOrder, setSortOrder] = useState('descend')

  const handleSortClick = (columnIndex) => {
    let newSortOrder = ''
    if (activeColumn === columnIndex) {
      newSortOrder = sortOrder === 'descend' ? 'ascend' : 'descend'
    } else {
      newSortOrder = 'descend'
    }
    setActiveColumn(columnIndex)
    setSortOrder(newSortOrder)

    sortOrderHandler(columnIndex, newSortOrder === 'descend' ? 'desc' : 'asc')
  }

  useEffect(() => {
    const activeColumn = columns.filter(column => {
      return column.defaultSortOrder
    })

    setActiveColumn(activeColumn[0].dataIndex)
    setSortOrder(activeColumn[0].defaultSortOrder)

    // call the sort order callback to the default sort
    sortOrderHandler(activeColumn[0].dataIndex, activeColumn[0].defaultSortOrder === 'descend' ? 'desc' : 'asc')
  }, [])

  const make = () => columns && columns.map(column => {
    const columnTitle = (typeof column.title === 'function') ? column.title() : column.title
    const sortIcon = (column.dataIndex === activeColumn) && (sortOrder === 'descend' ? <Icon name='angle down' size='large' /> : <Icon name='angle up' size='large' />)
    return (
      <th
        scope="col"
        key={column.dataIndex}
        style={{ width: isMobile ? column.mobileWidth : column.width && column.width }}
        className={column.dataIndex === activeColumn ? 'active' : ''}
      >
        <div onClick={() => handleSortClick(column.dataIndex)}>
          <Fragment>
            {columnTitle}
            {sortIcon}
          </Fragment>
        </div>
      </th>
    )
  })

  return (
    <thead>
      <tr>
        {make()}
      </tr>
    </thead>
  )
}

Header.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  sortOrderHandler: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
}

export default Header
