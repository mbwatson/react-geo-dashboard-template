import { Sheet } from '@mui/joy'
import { useAppContext } from '@context'
import { FullscreenPage } from '@components/layout'
import DataTable from 'react-data-table-component'

export const AnalysisView = () => {
  const { preferences, sampleData } = useAppContext()

  const columns = sampleData.columns
    .map(heading => ({
      name: heading,
      selector: row => row[heading],
      sortable: true,
      reorder: true,
    }))

  return (
    <FullscreenPage>
      <Sheet sx={{
        mt: '4.5rem',
        width: '100%',
      }}>
        <DataTable
          title="Sample Data"
          columns={ columns }
          data={ sampleData.data }
          theme={
            // DataTable wants "default" or "dark", and
            // useColorScheme returns "light" or "dark".
            preferences.colorMode.current === 'dark' ? 'dark' : 'default'
          }
          highlightOnHover
          responsive
        />
      </Sheet>
    </FullscreenPage>
  )
}

