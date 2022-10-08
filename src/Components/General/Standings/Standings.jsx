import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'SN', width: 40 },
  {
    field: 'country',
    headerName: 'Country',
    width: 100,
    editable: true,
  },
  {
    field: 'gold',
    headerName: 'Gold',
    type: 'number',
    width: 70,
    editable: true,
  },
  {
    field: 'silver',
    headerName: 'Silver',
    type: 'number',
    width: 80,
    editable: true,
  },
  {
    field: 'bronze',
    headerName: 'Bronze',
    type: 'number',
    width: 80,
    editable: true,
  },
  {
    field: 'total',
    headerName: 'Total',
    type: 'number',
    width: 80,
    editable: true,
  },
];




const rows = [
  { id: 1, country: 'USA', gold: 20, silver: 30, bronze: 40, total: 90 },
  { id: 2, country: 'China', gold: 10, silver: 20, bronze: 35, total: 65 },
  { id: 3, country: 'UK', gold: 5, silver: 10, bronze: 15, total: 30 },
  { id: 4, country: 'Canada', gold: 4, silver: 5, bronze: 11, total: 20 },
  { id: 5, country: 'Australia', gold: 1, silver: 5, bronze: 14, total: 20 }

];

export default function Standings() {
  return (
    <Box sx={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
