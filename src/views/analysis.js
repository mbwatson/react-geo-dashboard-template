import { useCallback, useState } from 'react'
import { Box, Button, ButtonGroup, Checkbox, Dropdown, Input, Menu, List, ListItem, MenuButton, Option, Select, Sheet } from '@mui/joy'
import { useAppContext } from '@context'
import { ContentPage } from '@components/layout'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useQuery } from 'react-query'

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.group({
    id: 'study',
    header: () => <span>Study</span>, footer: () => <span>Study</span>,
    columns: [
      {
        accessorKey: 'study.dataset',
        header: () => <span>Dataset</span>, footer: () => <span>Dataset</span>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'study.medium',
        header: () => <span>Medium</span>, footer: () => <span>Medium</span>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'study.sampleCount',
        header: () => <span>Sample #</span>, footer: () => <span>Sample #</span>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'study.targetOrNta',
        header: () => <span>Target / NTA</span>, footer: () => <span>Target / NTA</span>,
        cell: info => info.getValue(),
      },
    ]
  }),
  columnHelper.group({
    id: 'temporal',
    header: () => <span>Temporal</span>, footer: () => <span>Temporal</span>,
    columns: [
      {
        accessorKey: 'temporal.sampleDate',
        cell: info => new Date(info.getValue()).toLocaleDateString(),
        header: () => <span>Sample Date</span>, footer: () => <span>Sample Date</span>,
      },
      {
        accessorKey: 'temporal.analysisDate',
        cell: info => new Date(info.getValue()).toLocaleDateString(),
        header: () => <span>Analysis Date</span>, footer: () => <span>Analysis Date</span>,
      },
    ],
  }),
  columnHelper.group({
    id: 'chem-id',
    header: () => <span>Chemical Identity</span>, footer: () => <span>Chemical Identity</span>,
    columns: [
      {
        accessorKey: 'chemicalId.chemicalName',
        cell: info => info.getValue(),
        header: () => <span>Chemical Name</span>, footer: () => <span>Chemical Name</span>,
      },
      {
        accessorKey: 'chemicalId.dtxsID',
        cell: info => info.getValue(),
        header: () => <span>DTXS ID</span>, footer: () => <span>DTXS ID</span>,
      },
      {
        accessorKey: 'chemicalId.chemicalFormula',
        cell: info => info.getValue(),
        header: () => <span>Chemical Formula</span>, footer: () => <span>Chemical Formula</span>,
      },
    ],
  }),
  columnHelper.group({
    id: 'nt-rel-chem-id',
    header: () => <span>Nontargeted-relevant Chemical Identity</span>,
    footer: () => <span>Nontargeted-relevant Chemical Identity</span>,
    enableHiding: true,
    columns: [
      {
        accessorKey: 'nontargetedChemicalId.molecularMass',
        cell: info => info.getValue(),
        header: () => <span>Molecular Mass</span>, footer: () => <span>Molecular Mass</span>,
      },
      {
        accessorKey: 'nontargetedChemicalId.retentionTime',
        cell: info => info.getValue(),
        header: () => <span>Retention Time</span>, footer: () => <span>Retention Time</span>,
      },
      {
        accessorKey: 'nontargetedChemicalId.idConfidenceLevel',
        cell: info => info.getValue(),
        header: () => <span>ID Confidence Level</span>, footer: () => <span>ID Confidence Level</span>,
      },
    ],
  }),
  columnHelper.group({
    id: 'quantitation',
    header: () => <span>Quantitation</span>, footer: () => <span>Quantitation</span>,
    columns: [
      {
        accessorKey: 'quantitation.abundance',
        cell: info => info.getValue(),
        header: () => <span>Abundance</span>, footer: () => <span>Abundance</span>,
      },
      {
        accessorKey: 'quantitation.units',
        cell: info => info.getValue(),
        header: () => <span>Units</span>, footer: () => <span>Units</span>,
      },
      {
        accessorKey: 'quantitation.mrlOrDl',
        cell: info => info.getValue(),
        header: () => <span>MRL / DL</span>, footer: () => <span>MRL / DL</span>,
      },
    ],
  }),
]


export const AnalysisView = () => {
  const { data } = useAppContext()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [columnVisibility, setColumnVisibility] = useState({ })
  const [sorting, setSorting] = useState([])

  const dataQuery = useQuery(
    ['sample-data', pagination],
    () => data.fetch(pagination),
    { keepPreviousData: true }
  )

  const handleChangePageSize = (event, newPageSize) => {
    table.setPageSize(newPageSize)    
  }

  const table = useReactTable({
    data: dataQuery.data?.rows ?? [],
    columns,
    pageCount: dataQuery.data?.pageCount ?? -1,
    state: {
      columnVisibility,
      pagination,
      sorting,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    debugTable: true,
  })

  const Pagination = useCallback(() => (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      gap: 2,
      py: 2,
      'span': { alignSelf: 'center' },
      'input': { alignSelf: 'stretch', width: '4rem' },
      'select': { alignSelf: 'stretch' },
    }}>
      {/* page navigation buttons */}
      <ButtonGroup variant="soft">
        <Button
          onClick={ () => table.setPageIndex(0) }
          disabled={ !table.getCanPreviousPage() }
        >FIRST</Button>
        <Button
          onClick={ () => table.previousPage() }
          disabled={ !table.getCanPreviousPage() }
        >PREV</Button>
        <Button
          onClick={ () => table.nextPage() }
          disabled={ !table.getCanNextPage() }
        >NEXT</Button>
        <Button
          onClick={ () => table.setPageIndex(table.getPageCount() - 1) }
          disabled={ !table.getCanNextPage() }
        >LAST</Button>
      </ButtonGroup>

      <span className="summary">
        Page { table.getState().pagination.pageIndex + 1 } {' '}
        of { table.getPageCount() }
      </span>

      <span>|</span>

      {/* jump to page */}
      <span className="page-jump">
        Go to page:
      </span>
      <Input
        type="number"
        defaultValue={table.getState().pagination.pageIndex + 1}
        onChange={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          table.setPageIndex(page)
        }}
        variant="soft"
      />

      {/* page size select */}
      <Select
        value={ table.getState().pagination.pageSize }
        onChange={ handleChangePageSize }
        variant="soft"
      >
        {[10, 25, 50, 100].map(size => (
          <Option key={ size } value={ size }>{ size } per page</Option>
        ))}
      </Select>

      {/* column visibility select */}
      <Dropdown>
        <MenuButton variant="soft">COLUMNS</MenuButton>
        <Menu>
          <List>
            {
              table.getAllLeafColumns().map(column => {
                console.log(column)
                return (
                  <ListItem key={ column.id }>
                    <Checkbox
                      label={ column.id }
                      checked={ column.getIsVisible() }
                      onChange={ column.getToggleVisibilityHandler() }
                      variant="soft"
                    />
                  </ListItem>
                )
              })
            }
          </List>
        </Menu>
      </Dropdown>
    </Box>
  ), [pagination])


  return (
    <ContentPage maxWidth="100vh">
      <Sheet sx={{
        mt: '4.5rem',
        width: '100%',
        overflow: 'scroll',
        table: {
          width: '100%',
          border: '1px solid #333',
        },
        'thead tr:nth-of-type(2)': {
          cursor: 'pointer',
        },
        tbody: {
          borderBqottom: '1px solid #333',
        },
        th: {
          borderBottom: '1px solid #333',
          borderRight: '1px solid #333',
          p: 1,
        },
        td: {
          borderBottom: '1px solid #333',
          borderRight: '1px solid #333',
        },
        'tr:first-of-type th': { fontSize: '100%' },
        'tr:nth-of-type(2) th': { fontSize: '75%' },
        tfoot: {
          color: '#666',
        },
        'tfoot th': {
          fontWeight: 'normal',
        },
        'tfoot tr:first-of-type th': { fontSize: '75%' },
        'tfoot tr:nth-of-type(2) th': { fontSize: '100%' },
      }}>
        <Pagination />

        <Box>{ dataQuery.isFetching ? 'Loading...' : '' }</Box>

        <table className={ dataQuery.isFetching ? 'loading' : 'loaded' }>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {
                      header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          { flexRender(header.column.columnDef.header, header.getContext()) }
                          {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted()] ?? null }
                        </div>
                      )
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )})}
              </tr>
            ))}
          </tbody>
          
          <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>          
        </table>

      </Sheet>
    </ContentPage>
  )
}

