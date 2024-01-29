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
  },
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
    'circle-radius': 10,
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
    features: data.sample.data.map(sample => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [sample.location.long, sample.location.lat],
      },
      properties: { ...sample },
    })),
  }

  const handleClickMap = event => {
    // get the feature of the click target
    const feature = event?.features?.[0]
    
    // if no feature layer is present, bail out now.
    if (!feature) {
      handleClosePopup()
      return
    }

    // we have a feature layer.
    // we may want different behavior whether
    // the user clicks a cluster or a single point.

    // if we have a cluster...
    if (feature.layer.id === clusterLayer.id) {
      // with the source data...
      const clusterSource = mapRef.current.getSource('samples')
      // ...and the id of the clicked-on cluster,
      const { cluster_id } = feature.properties
      // we'll identify the samples that comprise it.
      clusterSource.getClusterLeaves(cluster_id, 100, 0, function(error, aFeatures){
        const samples = aFeatures.map(f => f.properties.id)
        setPopupInfo({
          lat: feature.geometry.coordinates[1],
          long: feature.geometry.coordinates[0],
          title: 'SAMPLES',
          data: samples,
        })
      })
      return
    }

    // we have a single point.
    if (feature.layer.id === unclusteredPointLayer.id) {
      setPopupInfo({
        lat: feature.geometry.coordinates[1],
        long: feature.geometry.coordinates[0],
        title: 'SAMPLE',
        data: feature.properties.id,
      })
    }
  }

  const handleClosePopup = () => {
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
        color: 'black',
        minWidth: '300px',
        minHeight: '300px',
        overflow: 'hidden',
        'pre': {
          maxHeight: '200px',
          overflow: 'auto'
        }
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
                  <strong>{ popupInfo.title }</strong>
                  <pre>
                    { JSON.stringify(popupInfo.data, null, 2) }
                  </pre>

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
