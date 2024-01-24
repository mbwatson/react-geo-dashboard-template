import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { columns } from '@content/columns'
import testData from '@content/test-data.json'

const DataContext = createContext({ })

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  const [sampleData, ] = useState({
    columns,
    data: testData,
  })

  return (
    <DataContext.Provider value={{ sampleData }}>
      { children }
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node,
}
