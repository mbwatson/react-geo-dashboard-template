import {
  Card, Divider, Typography,
} from '@mui/joy'
import { useMap } from '@context'

export const ViewStatePanel = () => {
  const { viewState } = useMap()

  return (
    <Card sx={{
      position: 'absolute',
      zIndex: 9,
      bottom: '8rem', right: '2rem',
      maxWidth: '200px',
      '.MuiTypography-root': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    }}>
      <Typography level="title-sm">View State</Typography>
      <Divider />
      <Typography level="body-sm">
        longitude: { viewState.longitude }
      </Typography>
      <Typography level="body-sm">
        latitude: { viewState.latitude }
      </Typography>
      <Typography level="body-sm">
        zoom: { viewState.zoom }
      </Typography>
    </Card>
  )
}
