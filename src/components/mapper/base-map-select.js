import { useCallback } from 'react'
import {
  Dropdown, Menu, MenuButton, MenuItem,
} from '@mui/joy'
import { BASE_MAPS, useMap } from '@context'
import { Palette as MenuIcon } from '@mui/icons-material'

const options = BASE_MAPS.map(m => ({ key: m, label: m }))

export const BaseMapSelect = () => {
  const { setBaseMap } = useMap()

  const handleSelect = useCallback(key => () => {
    if (!BASE_MAPS.includes(key)) { return }
    setBaseMap(key)
  }, [])

  return (
    <Dropdown>
      <MenuButton>
        <MenuIcon />
      </MenuButton>
      <Menu>
        {
          options.map(option => (
            <MenuItem
              key={ option.key }
              onClick={ handleSelect(option.key) }
            >{ option.label }</MenuItem>
          ))
        }
      </Menu>
    </Dropdown>
  )
}
