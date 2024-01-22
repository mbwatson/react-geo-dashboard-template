import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import sample from '@content/sample-data'

const DataContext = createContext({ })

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  const [sampleData, ] = useState({ ...sample })

  return (
    <DataContext.Provider value={{ sampleData }}>
      { children }
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node,
}
