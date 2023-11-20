import { ContentPage } from '@components/layout'
import { Card, CardContent, Divider, Grid, Typography } from '@mui/joy'
import { useAppContext } from '@context'

const Item = () => {
  const { loadSomething, preferences } = useAppContext()

  return (
    <Card
      onClick={ loadSomething }
      sx={{
        p: 1,
        textAlign: 'center',
        borderRadius: 'sm',
        height: '400px',
        border: '1px solid',
        borderColor: preferences.colorMode.light ? 'primary.200' : 'primaryDark.700',
        backgroundColor: preferences.colorMode.light ? 'primary.100' : 'primaryDark.800',
        transition: 'border-color 250ms',
        '&:hover': {
          borderColor: preferences.colorMode.light ? 'primary.500' : 'primaryDark.400',
          cursor: 'pointer',
        }
      }}
    >
      <Typography level="title-lg">Lorem Ipsum</Typography>
      <Divider />
      <CardContent>
        ...
      </CardContent>
    </Card>
  )
}

export const HomeView = () => {
  return (
    <ContentPage>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={ 12 } sm={ 8 }>
          <Item />
        </Grid>
        <Grid xs={ 12 } sm={ 4 }>
          <Item />
        </Grid>
        <Grid xs={ 12 } sm={ 4 }>
          <Item />
        </Grid>
        <Grid xs={ 12 } sm={ 4 }>
          <Item />
        </Grid>
        <Grid xs={ 12 } sm={ 4 }>
          <Item />
        </Grid>
        <Grid xs={ 12 } sm={ 4 }>
          <Item />
        </Grid>
        <Grid xs={ 12 } sm={ 8 }>
          <Item />
        </Grid>
        <Grid xs={ 12 } sm={ 8 }>
          <Item />
        </Grid>
        <Grid xs={ 12 } sm={ 4 }>
          <Item />
        </Grid>
      </Grid>
    </ContentPage>
  )
}