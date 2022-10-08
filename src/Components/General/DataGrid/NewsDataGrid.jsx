import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import LoopIcon from '@mui/icons-material/Loop';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import "./WidgetWrapper.css"
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';


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
      borderBottom: `1px solid #5090d3 !important`,
      maxHeight: `120px !important`,
      minHeight: `120px !important`,
  },
  '.MuiDataGrid-row': {
      borderBottom: `1px solid #5090d3 !important`,
      maxHeight: `120px !important`,
      minHeight: `120px !important`,
  },
  '.MuiDataGrid-cellContent' :{
      color: `#b2bac2`
  },
  '& .MuiDataGrid-cell': {
      justifyContent: `center !important`,
      color: `#b2bac2`
  },
  '&.MuiDataGrid-cell, .MuiDataGrid-row': {
      borderBottom: `1px solid #5090d3 !important`
  },
  '&.MuiDataGrid-columnHeaderTitleContainerContent >span' : {
      marginLeft: `0 !important`
  },
  '.MuiTablePagination-displayedRows': {
      color: `#b2bac2;`
  },
  '.MuiDataGrid-columnHeaderTitle':{
      color: `#e7ebf0`
  },
  '.MuiButtonBase-root': {
      color: `#b2bac2 !important`
  },
  '&.MuiDataGrid-cell, .MuiDataGrid-row': {
      borderBottom: `1px solid #5090d3 !important`,
  },
  '&.MuiDataGrid-root':{
      border: `1px solid #5090d3`,
  },
  '.MuiDataGrid-columnHeaders':{
      borderBottom: `2px solid #5090d3 !important`
  },
  '.MuiDataGrid-footerContainer':{
      borderTop: `2px solid #5090d3 !important`
  }
}));


export default function NewsDataGrid({contentData, handleEdit, handleDelete}) {
    const HandleBan = async(uuid) => {
       const queryRef = query(collection(firestore, "users"), where("uuid", "==", uuid))
       await getDocs(queryRef).then(async(snap)=>{
        if(snap.docs.length > 0) {
          const updateRef = doc(firestore, "users", snap.docs[0].id)
          if(snap.docs[0].data().banned && snap.docs[0].data().banned === true) {
            await updateDoc(updateRef, {
              banned: false
            })
          } else {
            await updateDoc(updateRef, {
              banned: true
            })
          }
        }
       })
    }
    const columns= [
    { field: 'id', 
        headerName: 'ID', 
        flex: .3,
        width: 90,
        align: "center",
        headerAlign: 'center',
        renderCell: (index) => <p> {index.api.getRowIndex(index.row.postID) + 1 } </p>
    },
    {
      field: 'thumbnail',
      headerName: 'View',
      width: 120,
      flex: .8,
      editable: true,
      align: "center",
      headerAlign: 'center',
      renderCell: (params) => {
        return(
            <div className='thumb-img'>
                <img src={params.row.thumbnail}/>
            </div>
        )
      }
    },
    {
      field: 'newsTitle',
      headerName: 'Title',
      description: "Content Title",
      flex: 1,
      sortable: true,
      align: "center",
      headerAlign: 'center',
      width: 110
    },
    {
      field: 'newsDesc',
      headerName: 'Description',
      description: "Video Description",
      width: 150,
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: 'authorName',
      headerName: 'Author',
      description: "Author Description",
      width: 150,
      editable: true,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: 'eventType',
      headerName: 'Event',
      description: "Event",
      type: 'string',
      flex: .5,
      width: 80,
      editable: true,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: 'category',
      headerName: 'Category',
      description: "Category",
      flex: .5,
      sortable: true,
      align: "center",
      headerAlign: 'center',
      width: 80
    }, 
    {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        description: "Users status: Active, Banned or UnVerified",
        sortable: true,
        align: "center",
        headerAlign: 'center',
        width: 120,
        renderCell: (params) => {
            return(
              <div className='grid-action'>
                  <div onClick={()=>handleEdit(params.row.postID)}>
                      <EditOutlined />
                  </div>
                  <div onClick={()=>handleDelete(params.row.postID)}>
                      <DeleteOutline />
                  </div>
              </div>
            )
        }
      }
    ];
    
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row)=> row.postID}
        rows={contentData}
        columns={columns}
        components={{Toolbar: GridToolbar}}
      />
    </Box>
  );
}