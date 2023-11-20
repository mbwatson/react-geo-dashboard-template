import { useCallback } from 'react'
import {
  Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem,
} from '@mui/joy'
import { Room as LocationMarker } from '@mui/icons-material'
import { useMap } from '@context'

export const LocationSelect = () => {
  const { mapRef, locationPresets } = useMap()

  const handleSelect = useCallback(({ longitude, latitude, zoom }) => () => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom,
      duration: 2000,
    })
  }, [])

  return (
    <Dropdown>
      <MenuButton>
        <LocationMarker />
      </MenuButton>
      <Menu>
        {
          locationPresets.map(({ latitude, longitude, zoom, label }) => (
            <MenuItem
              key={ label }
              onClick={ handleSelect({ latitude, longitude, zoom }) }
            >
              <ListItemDecorator><LocationMarker /></ListItemDecorator>
              { label }
            </MenuItem>
          ))
        }
      </Menu>
    </Dropdown>
  )
}
