import { createContext, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { useLocalStorage } from '@hooks'

const MapContext = createContext({ })
export const useMap = () => useContext(MapContext)

export const BASE_MAPS = [
  'dark-v11',
  'light-v11',
  'navigation-day-v1',
  'navigation-night-v1',
  'outdoors-v12',
  'satellite-v9',
  'satellite-streets-v12',
  'streets-v12',
]

const RALEIGH_NC =     { label: 'Raleigh, NC',     longitude: -78.644257, latitude: 35.787743, zoom: 12 }
const CHAPEL_HILL_NC = { label: 'Chapel Hill, NC', longitude: -79.055473, latitude: 35.910259, zoom: 12 }
const DURHAM_NC =      { label: 'Durham, NC',      longitude: -78.898621, latitude: 35.994034, zoom: 12 }
const WILMINGTON_NC =  { label: 'Wilmington, NC',  longitude: -77.944710, latitude: 34.225727, zoom: 12 }

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null)
  const [baseMap, setBaseMap] = useLocalStorage('base-map', BASE_MAPS[0])
  const [viewState, setViewState] = useLocalStorage('view-state', RALEIGH_NC)

  const locationPresets = [
    CHAPEL_HILL_NC,
    DURHAM_NC,
    RALEIGH_NC,
    WILMINGTON_NC,
  ]

  return (
    <MapContext.Provider value={{
      mapRef,
      baseMap, setBaseMap,
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
