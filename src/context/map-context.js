import { createContext, useContext, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocalStorage } from '@hooks'
import ncCityData from '@content/cities/nc.json'
import { ClusterLayer } from '@components/mapper'

const MapContext = createContext({ })
export const useMap = () => useContext(MapContext)

const RALEIGH_NC = { label: 'Raleigh, NC', longitude: -78.644257, latitude: 35.787743, zoom: 12 }

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null)
  const [viewState, setViewState] = useLocalStorage('view-state', RALEIGH_NC)

  //
  const layers = {
    'samples-cluster': ClusterLayer,
  }
  const [activeLayerIds, setActiveLayerIds] = useState(new Set())
  const showLayer = layerId => {
    const newIds = new Set([...activeLayerIds])
    newIds.add(layerId)
    setActiveLayerIds(newIds)
  }
  const hideLayer = layerId => {
    const newIds = new Set([...activeLayerIds])
    newIds.delete(layerId)
    setActiveLayerIds(newIds)
  }
  const toggleLayer = layerId => {
    if (activeLayerIds.has(layerId)) {
      hideLayer(layerId)
      return
    }
    showLayer(layerId)
  }

  //
  const [popupInfo, setPopupInfo] = useState(null)
  const closePopup = () => {
    setPopupInfo(null)
  }

  //
  const locationPresets = Object.keys(ncCityData.cities)
    .map(cityName => ({
      label: `${ cityName }, NC`,
      latitude: ncCityData.cities[cityName].lat,
      longitude: ncCityData.cities[cityName].long,
    }))

  return (
    <MapContext.Provider value={{
      mapRef,
      viewState: {
        current: viewState,
        set: setViewState,
      },
      locationPresets,
      popup: {
        info: popupInfo,
        set: setPopupInfo,
        close: closePopup,
      },
      layers: {
        available: { ...layers },
        active: [...activeLayerIds],
        toggle: toggleLayer,
        show: showLayer,
        hide: hideLayer,
      },
    }}>
      { children }
    </MapContext.Provider>
  )
}

MapProvider.propTypes = {
  children: PropTypes.node,
}
