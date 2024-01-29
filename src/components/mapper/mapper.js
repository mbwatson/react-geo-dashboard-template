import { Fragment } from 'react'
import PropTypes from 'prop-types'
import Map from 'react-map-gl'
import { useAppContext, useMap } from '@context'
import { ViewStatePanel } from './view-state-panel'

export const Mapper = ({ height, width, children, showViewState = true, ...props }) => {
  const { mapRef, viewState } = useMap()
  const { preferences } = useAppContext()

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
        mapStyle={ `mapbox://styles/mapbox/${ preferences.colorMode.current }-v11` }
        { ...props }
        source="mapbox://mvvatson.clkpnbbi50bu62dp5dxh26pee-5d8sq"
        mapboxAccessToken={ process.env.MAPBOX_TOKEN }
      >{ children }</Map>
      { showViewState && <ViewStatePanel /> }
    </Fragment>
  )
}

Mapper.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  width: PropTypes.number,
  showViewState: PropTypes.bool,
}
