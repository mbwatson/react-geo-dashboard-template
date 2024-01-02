import { useCallback } from 'react'
import {
  Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem,
} from '@mui/joy'
import {
  Add as AddIcon,
  Circle as BulletIcon,
} from '@mui/icons-material'
import { useMap } from '@context'

export const LayerSelect = () => {
  const { layers } = useMap()

  const handleSelect = useCallback(id => () => {
    layers.toggle(id)
  }, [])

  return (
    <Dropdown>
      <MenuButton
        color="primary"
        variant="soft"
        startDecorator={ <AddIcon /> }
      >Layer</MenuButton>

      <Menu sx={{
        '.MuiListItemDecorator-root': {
          filter: 'opacity(0.5)',
        },
        '.MuiMenuItem-root:hover': {
          '.MuiListItemDecorator-root': {
            filter: 'opacity(1.0)',
          }
        },
      }}>
        {
          layers.all.map(({ id }) => (
            <MenuItem
              key={ `layer-${ id }` }
              onClick={ handleSelect(id) }
            >
              <ListItemDecorator>
                <BulletIcon color={ layers.isActive(id) ? 'success' : 'plain' } />
              </ListItemDecorator>
              { id }
            </MenuItem>
          ))
        }
      </Menu>
    </Dropdown>
  )
}
