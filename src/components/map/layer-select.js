import {
  Dropdown, ListDivider, ListItemDecorator, Menu, MenuButton, MenuItem,
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
      <Menu placement="top-start" offset={ 10 }>
        
        <MenuItem onClick={ handleSelect('samples-cluster') }>
          <ListItemDecorator>
            <DatasetLayerIcon color={ layers.active.includes('samples-cluster') ? 'primary' : 'default' } />
          </ListItemDecorator>
          Samples, Cluster
        </MenuItem>
        
        <ListDivider />
        
        <MenuItem onClick={ handleSelect('counties') }>
          <ListItemDecorator>
            <DatasetLayerIcon color={ layers.active.includes('counties') ? 'primary' : 'default' } />
          </ListItemDecorator>
          County boundaries
        </MenuItem>

        <MenuItem onClick={ handleSelect('congressional') }>
          <ListItemDecorator>
            <DatasetLayerIcon color={ layers.active.includes('congressional') ? 'primary' : 'default' } />
          </ListItemDecorator>
          Congressional distrcits
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
