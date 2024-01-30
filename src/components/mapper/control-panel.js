import {
  Card,
  List,
  ListDivider,
  ListItem,
} from '@mui/joy'
import { LayerSelect } from './layer-select'
import { LocationSelect } from './location-select'

export const ControlPanel = () => {

  return (
    <Card sx={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: '2rem',
      left: '2rem',
      right: '2rem',
      overflow: 'hidden',
      px: 0.5, py: 1, pr: 1,
      overflowX: 'auto',
      '.MuiList-root': { p: 0 },
      '.MuiButton-root': { gap: 1 },
    }}>
      <List orientation="horizontal" size="sm" sx={{ flex: 1 }}>
        <ListItem role="none">
          <LayerSelect />
        </ListItem>

        <ListDivider />

        <ListItem role="none">
          <LocationSelect />
        </ListItem>
        
      </List>

    </Card>
  )
}
