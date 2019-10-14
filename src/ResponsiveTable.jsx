import React, { Fragment, useEffect, useState, useRef } from 'react'
import withSizes from 'react-sizes'
import {
  Icon, Image, Input, Grid
} from 'semantic-ui-react'
import CsvDownload from 'react-json-to-csv'
import PropTypes from 'prop-types'
import isEmpty from 'lodash.isempty'
import downloadImage from './assets/images/download.png'
import filterImage from './assets/images/filter.png'
import searchImage from './assets/images/search.png'
import { formatNumber } from './utils/Helpers'
import Header from './Header.jsx'
import Body from './Body.jsx'
import Pagination from 'nugo-pagination'
import 'semantic-ui-css/semantic.min.css'
import './Fonts.css'
import './ResponsiveTable.scss'

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 767,
  isTablet: width >= 767 && width <= 991,
  isDesktop: width > 991
})

function ResponsiveTable ({ columns, data, title, searchKey = 'name', searchPlaceholder, ...rest }) {
  const [dataFiltered, setDataFiltered] = useState([])
  const [searchFieldVisibility, setSearchFieldVisibility] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const inputSearchField = useRef(null)
  const tableHeader = useRef(null)
  const { pageSize, isMobile, isTablet, onRowClick } = rest

  const [responsivePagination, setResponsivePagination] = useState(pageSize)
  const mobileColumns = columns.filter(el => el.alwaysVisible)

  // Window resize
  useEffect(() => {
    if (isMobile || isTablet) {
      setResponsivePagination(5)
    }
  }, [isMobile, isTablet])

  const handleChangeFilter = (e, { value }) => {
    let dataTemp = [...data]

    if (!value) {
      setDataFiltered(dataTemp)
      return
    }

    var pattern = new RegExp('(' + value.replace(/[^\w\s]/gi, '') + ')', 'i')
    if (Array.isArray(searchKey)) {
      dataTemp = dataTemp.filter((item) => {
        const temp = []
        searchKey.map((key) => {
          const valid = pattern.exec(item[key])
          if (valid) {
            temp.push(valid)
          }
        })

        return !isEmpty(temp)
      })
    } else {
      dataTemp = dataTemp.filter((item) => {
        return pattern.exec(item[searchKey])
      })
    }

    setDataFiltered(dataTemp)
  }

  const handlerClearSearchField = (e, { name, value }) => {
    inputSearchField.current.value = null
    setDataFiltered([...data])
  }

  /**
   * Check for a click outside the search field element
   */
  function handleClickOutside (event) {
    const { name } = event.target

    if (name === 'searchIcon' || name === 'searchIconImage') {
      setSearchFieldVisibility(true)
      setTimeout(() => { inputSearchField.current.focus() }, 50)
    } else {
      if (inputSearchField.current && !inputSearchField.current.contains(event.target) && !inputSearchField.current.value) {
        setSearchFieldVisibility(false)
      }
    }
  }

  /**
   * Function to sort alphabetically an array of objects by some specific key.
   *
   * @param {String} property Key of the object to sort.
   */
  function dynamicSort (property, sortOrder) {
    let activeColumn = columns.filter(column => {
      return column.dataIndex === property
    })
    activeColumn = activeColumn[0]

    return function (a, b) {
      if (sortOrder === 'desc') {
        return activeColumn.sorter(b, a)
      } else {
        return activeColumn.sorter(a, b)
      }
    }
  }

  // Sort order callback
  const handleSortOrder = (activeColumn, sortOrder) => {
    const dataToSort = [...dataFiltered]
    const newData = dataToSort.sort(dynamicSort(activeColumn, sortOrder))
    setDataFiltered(newData)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setDataFiltered([...data])
  }, [data])

  const inputRender = (
    <Input
      icon
      placeholder={searchPlaceholder}
      className={`searchField ${!searchFieldVisibility && 'hide'}`}
      onChange={handleChangeFilter}
    >
      <input ref={inputSearchField} />
      <Icon name='search' />
      <Icon
        name='delete'
        className={`${(inputSearchField && inputSearchField.current && inputSearchField.current.value) ? 'link' : 'link hide'}`}
        onClick={handlerClearSearchField}
      />
    </Input>
  )

  const makeFilters = () => {
    if (isMobile) {
      return (
        <Grid columns="equal" textAlign="left" className="tableFilter">
          <Grid.Column mobile={16} tablet={6} computer={8} className="title">{`${title} (${!isEmpty(dataFiltered) ? formatNumber(dataFiltered.length, 0) : 0})`}</Grid.Column>
          <Grid.Column textAlign="left">
            <div className="icon filterIcon">
              <Image src={filterImage} className="filterIcon" />
            </div>
            <CsvDownload data={dataFiltered} filename="lista.csv" className="downloadIcon">
              <div className="icon">
                <Image src={downloadImage} />
              </div>
            </CsvDownload>
            {inputRender}
            <div className={`icon searchIcon ${searchFieldVisibility && 'hide'}`} name="searchIcon">
              <Image src={searchImage} className="searchIcon" name="searchIconImage" />
            </div>
          </Grid.Column>
        </Grid>
      )
    } else {
      return (
        <Grid columns="equal" textAlign="left" className="tableFilter">
          <Grid.Column mobile={16} tablet={6} computer={8} className="title">{`${title} (${!isEmpty(dataFiltered) ? formatNumber(dataFiltered.length, 0) : 0})`}</Grid.Column>
          <Grid.Column>
            {inputRender}
            <div className={`icon searchIcon ${searchFieldVisibility && 'hide'}`} name="searchIcon">
              <Image src={searchImage} className="searchIcon" name="searchIconImage" />
            </div>
            <div className="icon">
              <Image src={filterImage} className="filterIcon" />
            </div>
            <CsvDownload data={dataFiltered} filename="lista.csv" className="downloadIcon">
              <div className="icon">
                <Image src={downloadImage} />
              </div>
            </CsvDownload>
          </Grid.Column>
        </Grid>
      )
    }
  }

  const makeTable = () => {
    if (isEmpty(dataFiltered)) {
      return <></>
    }

    return (
      <table className="responsiveTable">
        <Header columns={isMobile ? mobileColumns : columns} sortOrderHandler={handleSortOrder} isMobile={isMobile} />
        <Body
          columns={isMobile ? mobileColumns : columns}
          data={dataFiltered}
          pageNumber={pageNumber}
          pageSize={responsivePagination}
          onClick={onRowClick}
        />
      </table>
    )
  }

  const handlePageChange = ({ currentPage }) => {
    setPageNumber(Math.ceil(currentPage))
    tableHeader.current.scrollIntoView({ behavior: 'smooth' })
  }

  const makePagination = () => {
    if (isEmpty(dataFiltered)) {
      return <></>
    }

    return (
      <div className="tablePagination">
        <Pagination
          totalRecords={dataFiltered.length}
          pageSize={responsivePagination}
          pageNeighbours={1}
          onPageChange={handlePageChange}
        />
      </div>
    )
  }

  return (
    <Fragment>
      <div ref={tableHeader}>{makeFilters()}</div>
      {makeTable()}
      {makePagination()}
    </Fragment>
  )
}

ResponsiveTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
  searchKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  searchPlaceholder: PropTypes.string.isRequired
}

export default withSizes(mapSizesToProps)(ResponsiveTable)
