import { useMemo, useState } from 'react'
import { Box, Button, Card, Slider, Stack, Table } from '@mui/joy'
import { FullscreenPage } from '@components/layout'
import { counties } from '@content/nc-counties'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const years = [...counties.reduce((acc, county) => {
  if (acc.has(county.established)) {
    return acc
  }
  acc.add(Number(county.established))
  return acc
}, new Set())]

const minYear = Math.min(...years)
const maxYear = Math.max(...years)

export const AnalysisView = () => {
  const [letterFilters, setLetterFilters] = useState([])
  const [yearFilters, setYearFilters] = useState([minYear, maxYear])
  
  const filteredCounties = useMemo(() => {
    let newCounties = [...counties]
      .filter(county => yearFilters[0] <= county.established && county.established <= yearFilters[1])
    if (letterFilters.length > 0) {
      newCounties = newCounties.filter(county => letterFilters.includes(county.name[0]))
    }
    return newCounties
  }, [letterFilters, yearFilters])

  const handleClickLetter = event => {
    const { letter } = event.target.dataset
    if (!letter) return

    let _filters = [...letterFilters]
    if (letterFilters.includes(letter)) {
      _filters = _filters.filter(l => l !== letter)
      setLetterFilters(_filters)
      return
    }
    _filters.push(letter)
    setLetterFilters(_filters)
  }

  const handleChangeYears = (event, newValues) => {
    setYearFilters(newValues)
  }

  return (
    <FullscreenPage>
      <Stack
        direction="row"
        gap={ 2 }
        p={ 2 }
        sx={{
          width: '100%',
          mt: '4.5rem', height: 'calc(100% - 4.5rem)',
          '.sidebar': {
            flex: '0 0 300px',
            overflow: 'auto',
          },
          '.main-content': {
            flex: 1,
            overflow: 'auto',
          },
        }}
      >
        <Card
          className="sidebar"
          variant="soft"
        >
          {
            alphabet
              .filter(letter => counties
                .some(county => county
                  .name
                  .startsWith(letter)))
              .map(letter => (
                <Button
                  key={ `button-${ letter }` }
                  data-letter={ letter }
                  onClick={ handleClickLetter }
                  variant={ letterFilters.includes(letter) ? 'solid' : 'soft' }
                >{ letter }</Button>
              ))
          }
          <Slider
            sx={{ maxWidth: '95%', margin: 'auto' }}
            aria-label="Year selection"
            value={ yearFilters }
            step={ 1 }
            min={ minYear }
            max={ maxYear }
            onChange={ handleChangeYears }
            valueLabelDisplay="on"
            marks={ years.map(y => ({ value: +y, label: null })) }
          />
        </Card>
        <Box className="main-content">
          <Card variant="soft">
            <Table
              aria-label="north carolina counties and years established"
              variant="plain"
              hoverRow
            >
              <thead>
                <tr>
                  <td>County</td>
                  <td>Year established</td>
                </tr>
              </thead>
              <tbody>
                {
                  filteredCounties.map(({ name, established }) => (
                    <tr key={ `row-${ name }` }>
                      <td>{ name }</td>
                      <td>{ established }</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Card>

          <Box component="pre" sx={{ fontSize: '75%', overflow: 'hidden' }}>
            { JSON.stringify(filteredCounties, ['name', 'established'], 2) }
          </Box>
        </Box>
      </Stack>

    </FullscreenPage>
  )
}