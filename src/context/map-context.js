import {
  createContext, useCallback, useContext, useMemo, useRef, useState,
} from 'react'
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

const tempLayers = [
  {
    'id': 'water-data',
    'source': 'mapbox-streets',
    'source-layer': 'water',
    'type': 'fill',
    'paint': {
      'fill-color': '#00ffff',
    }
  },
  {
    'id': 'terrain-data',
    'type': 'line',
    'source': 'mapbox-terrain',
    'source-layer': 'contour',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round',
    },
    'paint': {
      'line-color': '#ff69b4',
      'line-width': 1,
    },
  },
]

const RALEIGH_NC =     { label: 'Raleigh, NC',     longitude: -78.644257, latitude: 35.787743, zoom: 12 }
const CHAPEL_HILL_NC = { label: 'Chapel Hill, NC', longitude: -79.055473, latitude: 35.910259, zoom: 12 }
const DURHAM_NC =      { label: 'Durham, NC',      longitude: -78.898621, latitude: 35.994034, zoom: 12 }
const WILMINGTON_NC =  { label: 'Wilmington, NC',  longitude: -77.944710, latitude: 34.225727, zoom: 12 }

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null)
  const [baseMap, setBaseMap] = useLocalStorage('base-map', BASE_MAPS[0])
  const [viewState, setViewState] = useLocalStorage('view-state', RALEIGH_NC)
  const [layers, setLayers] = useState(tempLayers)

  const locationPresets = [
    CHAPEL_HILL_NC,
    DURHAM_NC,
    RALEIGH_NC,
    WILMINGTON_NC,
  ]

  const toggleLayer = useCallback(id => {
    console.log(id)
    const newLayers = [...layers]
    const index = newLayers.findIndex(layer => layer.id === id)
    if (index < 0) {
      return
    }
    newLayers[index].active = !newLayers[index].active
    setLayers([...newLayers])
  }, [layers])

  const activeLayers = useMemo(() => {
    return layers.filter(layer => !!layer.active)
  }, [layers])

  const layerIsActive = useCallback(id => {
    const index = activeLayers.findIndex(layer => layer.id === id)
    return index >= 0
  }, [activeLayers])

  return (
    <MapContext.Provider value={{
      mapRef,
      baseMap, setBaseMap,
      viewState: {
        current: viewState,
        set: setViewState,
      },
      layers: {
        all: layers,
        active: activeLayers,
        isActive: layerIsActive,
        toggle: toggleLayer,
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
