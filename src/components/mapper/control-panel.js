import {
  Button,
  Card,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemDecorator,
} from '@mui/joy'
import {
  Add as AddIcon,
} from '@mui/icons-material'
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
          <ListItemButton
            role="menuitem"
            slots={{ root: Button }}
            slotProps={{ root: { variant: 'soft' } }}
            aria-label="nothing"
          >
            <ListItemDecorator>
              <AddIcon />
            </ListItemDecorator>
            Add {/* add sample layers, by dataset, by date, by...? */}
          </ListItemButton>
        </ListItem>

        <ListDivider />

        <ListItem role="none">
          <LocationSelect />
        </ListItem>
        
      </List>

    </Card>
  )
}
