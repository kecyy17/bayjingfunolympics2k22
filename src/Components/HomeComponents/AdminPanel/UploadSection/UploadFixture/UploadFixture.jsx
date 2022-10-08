import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import "./UploadFixture.css"
import { fireStorage, firestore } from '../../../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { v4 as uuid} from "uuid"
import { BackDropFixed, CustomButtonModified, ProgressBar, SelectComponent } from '../../../../General';
import { CloudUploadOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';
import ContentDataGrid from '../../../../General/DataGrid/ContentDataGrid';
import NewsDataGrid from '../../../../General/DataGrid/NewsDataGrid';
import { positions } from '@mui/system';
import { DeleteContent } from '../../DeleteContent';
import FixtureDataGrid from '../../../../General/DataGrid/FixtureDataGrid';
import { DatePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';

export const UploadFixture = ({className, videoData}) => {
    const [uploadFile, setUploadFile] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [fixtureName, setFixtureName] = useState('');
    const [uploadNewsDesc, setUploadNewsDesc] = useState('');
    const [fixtureDate, setFixtureDate] = useState(new Date());
    const [uploadNewsEvent, setUploadNewsEvent] = useState('none');
    const [uploadNewsCategory, setUploadNewsCategory] = useState('none');
    const [thumbnailURL, setThumbnailURL] = useState('')
    const [postID, showPostID] = useState('')
    const [showUpload, setShowUpload] = useState(false);
    const [showBackDrop, setShowBackDrop] = useState(false)
    const [channel, setChannel] = useState("none")
    const uploadFileObject = useRef()
    const uploadURL = useRef();
    const params = useParams()

    const [fixtureData, setFixtureData] = useState([])
    // const womenGamesRef = collection(firestore, `/highlights`)
    const NavigateToPage = useNavigate()
    const QueryDocs = async(setData, docPath) => {
        const queryRef = query(collection(firestore, `${docPath}`))
        let vData = [];
        await getDocs(queryRef).then((snap)=> {
            snap.docs.forEach((doc)=> {
                vData.push(doc.data())
            })
            setData(vData)
        })
    }

    useEffect(()=>{
        if (!showUpload) { 
            CleanUpStates(0)
        }
        if ( fixtureData.length == 0 ) {
            QueryDocs(setFixtureData, "fixtures")
        }
    },[showUpload])

    const HandleEdit = async(postID) => {
        if (postID) {
            const docQuery = query(collection(firestore,'/fixtures'), where("postID", "==", params.postID? params.postID : postID))
            showPostID(postID)
            
            await getDocs(docQuery).then((snap)=>{
                setFixtureName(snap.docs[0].data().fixtureName)
                setUploadNewsEvent(snap.docs[0].data().eventType)
                setUploadNewsCategory(snap.docs[0].data().category)
                setFixtureDate(snap.docs[0].data().fixtureDate)
                setShowUpload(true)
            })
        } else {
            if (fixtureDate) {
                CleanUpStates(0)
                setShowUpload(false)
                showPostID("")
            }
        }
    }

    const AllEvents = [
        {
            optName: "None",
            ovtValue: "none"
        },
        {
            optName: "Basketball",
            optValue: "basketball"
        },
        {
            optName: "Cycling",
            optValue: "cycling"
        },
        {
            optName: "Javelin",
            optValue: "javelin"
        },
        {
            optName: "Football",
            optValue: "football"
        },
        {
            optName: "Sprinting",
            optValue: "sprinting"
        },
        {
            optName: "Ice Dancing",
            optValue: "icedancing"
        }
    ]
    const AllCategories = [
        {
            optName: "None",
            ovtValue: "none"
        },
        {
            optName: "Men",
            optValue: "men"
        },
        {
            optName: "Women",
            optValue: "women"
        }
    ]

    const SelectHighlightVideo = (e) => {
        if (e.target.files.length > 0) {
            setUploadFile(e.target.files[0].name)
            setUploadPercentage(0)
            uploadFileObject.current = e.target.files[0]
            uploadURL.current = URL.createObjectURL(uploadFileObject.current)
        } else {
            setUploadFile("")
            setUploadPercentage(0)
            uploadFileObject.current = ""
            uploadURL.current = ""
        }
    }

    const HandleEventChange = (e) => {
        setUploadNewsEvent(e.target.value)
    }
    
    const HandleCategoryChange = (e) => {
        setUploadNewsCategory(e.target.value)
    }

    const CleanUpStates = (uploadPercentage) => {
        setUploadPercentage(uploadPercentage);
        setUploadNewsEvent("none");
        setUploadNewsCategory("none");
        setFixtureName("");
        setUploadNewsDesc("");
        setUploadFile("")
	    setFixtureDate("")
        showPostID("")
        setThumbnailURL("")
        uploadFileObject.current = ""
        uploadURL.current = ""
    }

    // Update and upload the post
    const UploadNews = async(e) => {
        e.preventDefault()
        if (
                fixtureDate && 
                fixtureName && 
                uploadNewsEvent && uploadNewsEvent !== "none" &&
                uploadNewsCategory && uploadNewsCategory !== "none") {
            if ((params.postID || postID)) {
                setUploadPercentage(0)
                let tempGameData ={
                    postID: params.postID ? params.postID : postID,
                    fixtureDate: fixtureDate,
                    uploadedAt: serverTimestamp(),
                    fixtureName: fixtureName,
                    eventType: uploadNewsEvent,
                    category: uploadNewsCategory,
                }
                const fixQuery = query(collection(firestore, "fixtures"), where("postID", "==", params.postID ? params.postID : postID))
                await getDocs(fixQuery).then(async(snap)=>{
                    let docID = snap.docs[0].id
                    const docRef = doc(firestore,`fixtures`, docID)
                    await updateDoc(docRef, tempGameData).then((res)=> {
                        setUploadPercentage(100)
                        QueryDocs(setFixtureData, "fixtures")
                    },
                    (err)=>console.log("update err", err))
                })
            }else {
                let tempGameData ={
                    postID: uuid().split("-").at(-1),
                    fixtureDate: fixtureDate,
                    uploadedAt: serverTimestamp(),
                    fixtureName: fixtureName,
                    eventType: uploadNewsEvent,
                    category: uploadNewsCategory
                }
                const gameRef = collection(firestore, `fixtures`);
                await addDoc(gameRef,tempGameData).then(res => {
                    CleanUpStates(100);
                    QueryDocs(setFixtureData, "fixtures")
                },(err)=> console.log(err))
            }
        } else {
            // Upload Fail
        }
    }

    
    const HandleDeleteClick = async(delID) => {
        if(delID) {
            const delFix = query(collection(firestore, "fixtures"), where("postID", "==", delID))
            await getDocs(delFix).then(async(snap)=> {
                if (snap.docs.length > 0) {
                    await deleteDoc(doc(firestore, "fixtures", snap.docs[0].id)).then((res)=>{
                        QueryDocs(setFixtureData, "fixtures")
                        setShowBackDrop(false)
                    })
                }
            })
        }
    }

    const CancelBtnClick = () => {
        setShowBackDrop(false)
    }

    const HandleBackDrop = () => {
        setShowBackDrop(false)
    }

    const HandleDelete = async(postID) => {
        if(postID) {
            showPostID(postID)
            setShowBackDrop(true)
        }
    }

    const color = "#ffffff";
    return (
        <div className={`vid-upload-container ${className}`}>
            <BackDropFixed show={showBackDrop} 
                children={ 
                    <DeleteContent 
                        cancelBtnClick={CancelBtnClick}
                        deleteBtnClick={HandleDeleteClick}
                        deleteID={postID}
                    />
                    }
                handleClick={HandleBackDrop} 
                />
            <div className='upload-btn-wrapper'>
                <div className='upload-btn-cls' onClick={()=> setShowUpload(!showUpload)}>
                    <p>Upload Fixture</p>
                    {
                        showUpload ? 
                            <KeyboardArrowUpOutlined /> 
                            :
                            <KeyboardArrowDownOutlined />
                    }
                </div>
            </div>
            <div className={`fix-upload-main ${showUpload? '':'hide-upload'}`}>
                <div className="fix-upload-lower">
                    <h3>Add Fixture</h3>
                    <form className="vid-upload-form" onSubmit={UploadNews}>
                        <div className="vid-upload-input">
                            <label>Fixture Name</label>
                            <input className='vid__uploadTitle' onChange={(e)=>setFixtureName(e.target.value) } value={fixtureName} required></input>
                        </div>
                        <div className="vid-upload-input">
                            {console.log("newdate",fixtureDate)}
                            <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                <DatePicker
                                  label="Fixture Date"
                                  format="dd-MMM-yyyy"
                                  value={fixtureDate}
                                  onChange={(newValue) => {
                                    setFixtureDate(newValue.$d.toLocaleDateString());
                                  }}
                                  renderInput={(params) => <TextField {...params} 
                                    sx={{
                                      svg: { color },
                                      input: { color },
                                      label: { color }
                                    }}
                                   />}
                                />
                                
                            </LocalizationProvider>
                            
                        </div>
                        <div className="vid-upload-parted">
                            <SelectComponent label={`Events`} optData={AllEvents}  handleOnChange={HandleEventChange} defaultValue={uploadNewsEvent}/>
                            <SelectComponent label={`Category`} className={`upload-category`}  optData={AllCategories} handleOnChange={HandleCategoryChange} defaultValue={uploadNewsCategory}/>
                        </div>
                        <div className='vid__uploadFix'>
                            <CustomButtonModified btnLabel={`${params.postID || postID ? 'Update':'Post'}`} btnType={`submit`}/>
                        </div>
                        <div className='vid__progressBar'>
                            {
                                uploadPercentage ? <ProgressBar percentage={uploadPercentage} isUpdated={params.postID || postID ? true : false}/> : "" 
                            }
                        </div>
                    </form>
                </div>
            </div>
            <div className='content-grid'>
                <FixtureDataGrid contentData={fixtureData} handleEdit={HandleEdit} handleDelete={HandleDelete}/>
            </div>
        </div>
    )
}