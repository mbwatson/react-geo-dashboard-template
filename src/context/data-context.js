import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { columns } from '@content/columns'
import testData from '@content/test-data-v2.json'

const DataContext = createContext({ })

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  const [sampleData, ] = useState({
    columns,
    data: testData,
  })

  const fetchData = async ({ pageIndex, pageSize }) => {
    await new Promise(r => setTimeout(r, 500))

    return {
      rows: sampleData.data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
      pageCount: Math.ceil(sampleData.data.length / pageSize),
    }
  }

  return (
    <DataContext.Provider value={{ fetchData, sampleData }}>
      { children }
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node,
}
