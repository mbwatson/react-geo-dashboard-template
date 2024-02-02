import {
  Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem,
} from '@mui/joy'
import {
  Biotech as DatasetLayerIcon,
  Layers as LayersIcon,
} from '@mui/icons-material'
import { useMap } from '@context'

export const LayerSelect = () => {
  const { layers } = useMap()

  const handleSelect = layerId => () => {
    layers.toggle(layerId)
  }

  return (
    <Dropdown>
      <MenuButton
        variant="soft"
        color="primary"
        startDecorator={ <LayersIcon /> }
      >Layers</MenuButton>
      <Menu>
        <MenuItem onClick={ handleSelect('samples-cluster') }>
          <ListItemDecorator>
            <DatasetLayerIcon color={ layers.active.includes('samples-cluster') ? 'primary' : 'default' } />
          </ListItemDecorator>
          All Samples, Cluster
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
