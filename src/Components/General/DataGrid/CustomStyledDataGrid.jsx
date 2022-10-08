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
import { Unpublished } from '@mui/icons-material';


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
      borderBottom: `1px solid #5090d3 !important`
  },
  '.MuiDataGrid-row': {
      borderBottom: `1px solid #5090d3 !important`
  },
  '.MuiDataGrid-cellContent' :{
      color: `#b2bac2`
  },
  '& .MuiDataGrid-cell': {
      justifyContent: `center !important`,
      color: `#b2bac2`
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
      borderBottom: `1px solid #5090d3 !important`
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

export default function CustomStyledDataGrid({usersData}) {
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
        flex: 1,
        width: 90,
        align: "center",
        headerAlign: 'center',
        renderCell: (index) => <p> {index.api.getRowIndex(index.row.uuid) + 1 } </p>
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 150,
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: 'userName',
      headerName: 'Username',
      width: 150,
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: 'email',
      headerName: 'Email',
      description: "Users Email",
      flex: 2,
      sortable: true,
      align: "center",
      headerAlign: 'center',
      width: 160
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150,
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: 'userType',
      headerName: 'User Type',
      type: 'string',
      flex: 1,
      width: 110,
      editable: true,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: 'country',
      headerName: 'Country',
      description: "Users country",
      flex: 1,
      sortable: true,
      align: "center",
      headerAlign: 'center',
      width: 160,
      renderCell: (params) => {
        return (
            params.row.country === "" ? 
                            <p>N/A</p>: 
                            <p>{params.row.country}</p>
        )
      }
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1.5,
        description: "Users status: Active, Banned or UnVerified",
        sortable: true,
        align: "center",
        headerAlign: 'center',
        width: 160,
        renderCell: (params) => {
            return (
                params.row.status === "Verified" ? 
                  params.row.banned && params.row.banned === true ?
                    <div className="cell-circle" style={{border: "none"}}>
                      <ReportProblemIcon htmlColor='#F0541E'/>
                      <p style={{color:'#F0541E'}}>{"Blocked"}</p>
                    </div>
                  :
                    <div className="cell-circle" style={{border: "none"}}>
                        <DoneIcon htmlColor='#2DF106'/>
                        <p style={{color:'#2DF106'}}>{params.row.status}</p>
                    </div>:
                params.row.status === "UnVerified" ? 
                  params.row.banned && params.row.banned === true ?
                    <div className="cell-circle" style={{border: "none"}}>
                        <BlockIcon htmlColor='#ff0000'/>
                        <p style={{color:'#ff0000'}}>{"Blocked"}</p>
                    </div>
                    :
                    <div className="cell-circle" style={{border: "none"}}>
                        <Unpublished htmlColor='#9ecdff'/>
                        <p style={{color:'#9ecdff'}}>{params.row.status}</p>
                    </div> : "N/A"
            )
        }
    }, {
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
            <div className='field-button-flex'>
              <div className={`field-button ${params.row.banned && params.row.banned === true ? "banned" : "unbanned"}`} onClick={()=>HandleBan(params.row.uuid)}>
                <BlockIcon sx={{width:"24px !important"}} />
              </div>
              <div className={`field-button ${params.row.banned && params.row.banned === true ? "unbanned-green" : "banned-green"}`} onClick={()=>HandleBan(params.row.uuid)}>
                <BlockIcon sx={{width:"24px !important"}} />
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
        getRowId={(row)=> row.uuid}
        rows={usersData}
        columns={columns}
        components={{Toolbar: GridToolbar}}
      />
    </Box>
  );
}