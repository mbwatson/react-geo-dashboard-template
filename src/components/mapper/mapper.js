import { Fragment } from 'react'
import PropTypes from 'prop-types'
import Map from 'react-map-gl'
import { useMap } from '@context'
import { ViewStatePanel } from './view-state-panel'

export const Mapper = ({ height, width, children }) => {
  const {
    baseMap, mapRef, viewState,
  } = useMap()

  return (
    <Fragment>
      <Map
        style={{ width, height }}
        ref={ mapRef }
        reuseMaps
        skipOnMount
        mapLib={ import('mapbox-gl') }
        { ...viewState.current }
        onMove={ event => viewState.set(event.viewState) }
        mapStyle={ `mapbox://styles/mapbox/${ baseMap }` }
        source="mapbox://mvvatson.clkpnbbi50bu62dp5dxh26pee-5d8sq"
        mapboxAccessToken={ process.env.MAPBOX_TOKEN }
      >{ children }</Map>
      <ViewStatePanel />
    </Fragment>
  )
}

Mapper.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  width: PropTypes.number,
}
