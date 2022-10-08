import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '.MuiDataGrid-cell': {
        maxHeight: `40px !important`,
        minHeight: `40px !important`,
        borderBottom: `1px solid #5090d3 !important`
    },
    '.MuiDataGrid-row': {
        maxHeight: `40px !important`,
        minHeight: `40px !important`,
        borderBottom: `1px solid #5090d3 !important`
    },
    '.MuiDataGrid-cellContent' :{
        color: `#b2bac2`
    },
    '& .MuiDataGrid-cell': {
        justifyContent: `center !important`
    },
    '&.MuiDataGrid-columnHeaderTitleContainerContent >span' : {
        marginLeft: `0 !important`
    },
    '.MuiTablePagination-displayedRows': {
        color: `#b2bac2;`
    },
    '.MuiButtonBase-root': {
        color: `#b2bac2 !important`
    },
    '&.MuiDataGrid-cell, .MuiDataGrid-row': {
        maxHeight: `40px !important`,
        minHeight: `40px !important`,
        borderBottom: `1px solid #5090d3 !important`
    },
    '.MuiDataGrid-virtualScrollerContent':{
        height: `210px !important`
    },
    
    '&.MuiDataGrid-root':{
        border: `1px solid #5090d3`,
        backgroundColor: `rgb(19, 47, 76)`,
        height: `300px`
    },
    '.MuiDataGrid-columnHeaders':{
        borderBottom: `2px solid #5090d3 !important`
    },
    '.MuiDataGrid-footerContainer':{
        borderTop: `2px solid #5090d3 !important`
    }
}));

const columns = [
    {
      field: 'country',
      headerName: '',
      width: 30,
      editable: true,
      renderHeader: () => (
        <span role="img" aria-label="enjoy">
            🌐
          </span>
      )
    },
    {
      field: 'gold',
      headerName: 'Gold',
      type: 'number',
      width: 40,
      editable: true,
      renderHeader: () => (
        <span role="img" aria-label="enjoy">
            🥇
          </span>
      )
    },
    {
      field: 'silver',
      headerName: 'Silver',
      type: 'number',
      width: 40,
      editable: true,
      renderHeader: () => (
        <span role="img" aria-label="enjoy">
            🥈
          </span>
      )
    },
    {
      field: 'bronze',
      headerName: 'Bronze',
      type: 'number',
      width: 40,
      editable: true,
      renderHeader: () => (
        <span role="img" aria-label="enjoy">
            🥉
          </span>
      )
    },
    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      width: 40,
      editable: true,
      renderHeader: () => (
        <span role="img" aria-label="enjoy">
            🧮
          </span>
      )
    },
  ];
  

  const rows = [
    { id: 1, country: 'US', gold: 20, silver: 30, bronze: 40, total: 90 },
    { id: 2, country: 'CH', gold: 10, silver: 20, bronze: 35, total: 65 },
    { id: 3, country: 'UK', gold: 5, silver: 10, bronze: 15, total: 30 },
    { id: 4, country: 'CA', gold: 4, silver: 5, bronze: 11, total: 20 },
    { id: 5, country: 'AU', gold: 1, silver: 5, bronze: 14, total: 20 }
  
  ];

export const StandingsMini = () => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StyledDataGrid
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
