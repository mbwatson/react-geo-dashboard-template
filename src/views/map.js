import { useState } from 'react'
import { FullscreenPage } from '@components/layout'
import { Mapper, ControlPanel } from '@components/mapper'
import { useAppContext, useMap } from '@context'
import { Layer, Popup, Source } from 'react-map-gl'

const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'nc-cities',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#007abc', 25, '#19a7bc', 50, '#3ebca3'],
    'circle-radius': ['step', ['get', 'point_count'], 25, 100, 50, 200, 40]
  }
}

const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'nc-cities',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['literal', ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']],
    'text-size': 12,
  },
  paint: {
    'text-color': '#fff',
  },
}

const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'nc-cities',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#66bc94',
    'circle-radius': 5,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#66bc94'
  }
}

export const MapView = () => {
  const { data, windowSize } = useAppContext()
  const { mapRef } = useMap()
  const [popupInfo, setPopupInfo] = useState(null)

  const geojson = {
    type: 'FeatureCollection',
    features: data.sample.data.map(({ location }) => ({
      type: 'Feature', geometry: { type: 'Point', coordinates: [location.long, location.lat] }
    })),
  }

  const handleClickMap = event => {
    // get the feature of the click target
    const feature = event?.features?.[0]
    
    // if no feature layer is present, bail out now.
    if (!feature) {
      console.log('no samples found at the clicked location')
      handleClosePopup()
      return
    }

    // we have a feature layer.
    // we may want different behavior whether
    // the user clicks a cluster or a single point.

    // if we have a cluster...
    if (feature.layer.id === clusterLayer.id) {
      const clusterSource = mapRef.current.getSource('samples')
      console.log({ clusterSource })
      const clusterId = feature.properties.cluster_id
      clusterSource.getClusterChildren(clusterId, function(error, aFeatures){
        console.log(aFeatures)
      })
      setPopupInfo({
        lat: feature.geometry.coordinates[1],
        long: feature.geometry.coordinates[0],
        text: 'cluster details',
      })
      return
    }

    // we have a single point.
    if (feature.layer.id === unclusteredPointLayer.id) {
      setPopupInfo({
        lat: feature.geometry.coordinates[1],
        long: feature.geometry.coordinates[0],
        text: 'sample details',
      })
    }
  }

  const handleClosePopup = () => {
    console.log('closing popup')
    setPopupInfo(null)
  }

  return (
    <FullscreenPage sx={{
      '.mapboxgl-popup': { 
        position: 'absolute',
        top: '10px',
        left: 0,
        willChange: 'transform',
        zIndex: 999,
        backgroundColor: 'transparent',
        minWidth: '300px',
        minHeight: '300px',
        color: 'black',
      },
      '.mapboxgl-popup-tip': {
        width: '1rem',
        height: '1rem',
        margin: 'auto',
        borderWidth: 0,
        backgroundColor: '#ccc',
        transform: 'rotate(45deg) translate(0.4rem, 0.4rem)',
      },
      '.mapboxgl-popup-content': {
        borderRadius: 5,
        p: 1,
        backgroundColor: '#ccc',
      },
    }}>
      {
        !windowSize.height || !windowSize.width
        ? 'LOADING'
        : (
          <Mapper
            height={ windowSize.height }
            width={ windowSize.width }
            interactiveLayerIds={ [clusterLayer.id, unclusteredPointLayer.id] }
            onClick={ handleClickMap }
          >
            <Source
              id="samples"
              type="geojson"
              data={ geojson }
              cluster={ true }
              clusterMaxZoom={ 14 }
              clusterRadius={ 50 }
            >
              <Layer { ...clusterLayer } />
              <Layer { ...clusterCountLayer } />
              <Layer { ...unclusteredPointLayer } />
            </Source>
            {
              !!popupInfo && (
                <Popup
                  anchor="top"
                  tipSize={ 50 }
                  longitude={ popupInfo.long }
                  latitude={ popupInfo.lat }
                  onClose={ handleClosePopup }
                >
                  { popupInfo.text }
                  <br />
                  <a href="#">view in table</a>
                </Popup>
              )
            }
          </Mapper>
        )
      }
      <ControlPanel />
    </FullscreenPage>
  )
}
