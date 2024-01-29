import { createContext, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { useLocalStorage } from '@hooks'
import ncCityData from '@content/cities/nc.json'

const MapContext = createContext({ })
export const useMap = () => useContext(MapContext)

const RALEIGH_NC = { label: 'Raleigh, NC', longitude: -78.644257, latitude: 35.787743, zoom: 12 }

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null)
  const [viewState, setViewState] = useLocalStorage('view-state', RALEIGH_NC)

  const locationPresets = Object.keys(ncCityData.cities)
    .map(cityName => ({
      label: `${ cityName }, NC`,
      latitude: ncCityData.cities[cityName].lat,
      longitude: ncCityData.cities[cityName].long,
      zoom: 12,
    }))

  return (
    <MapContext.Provider value={{
      mapRef,
      viewState: {
        current: viewState,
        set: setViewState,
      },
      locationPresets,
    }}>
      { children }
    </MapContext.Provider>
  )
}

MapProvider.propTypes = {
  children: PropTypes.node,
}
