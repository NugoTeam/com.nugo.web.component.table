import React from 'react'
import PropTypes from 'prop-types'
import slice from 'lodash.slice'

function Body ({ columns, data, pageNumber, pageSize, onClick }) {
  const makeCell = (item) => columns && columns.map(column => (
    <td data-label={column.dataIndex} key={column.dataIndex}>{column.render ? column.render(item[column.dataIndex], item) : item[column.dataIndex]}</td>
  ))

  const make = () => data && slice(data, (pageNumber - 1) * pageSize, (pageNumber - 1) * pageSize + pageSize).map(item => {
    if (typeof onClick === 'function') {
      return (
        <tr key={item.id} onClick={() => (onClick(item))} style={{ cursor: 'pointer' }}>
          {makeCell(item)}
        </tr>
      )
    }

    return (
      <tr key={item.id}>
        {makeCell(item)}
      </tr>
    )
  })

  return (
    <tbody>
      {make()}
    </tbody>
  )
}

Body.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  pageNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onClick: PropTypes.func
}

Body.defaultProps = {
  onClick: null
}

export default Body
