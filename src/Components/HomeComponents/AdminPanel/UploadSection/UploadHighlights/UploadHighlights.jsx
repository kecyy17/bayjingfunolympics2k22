import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import "./UploadHighlights.css"
import { fireStorage, firestore } from '../../../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { v4 as uuid} from "uuid"
import { BackDrop, BackDropFixed, CustomButtonModified, ProgressBar, ReactPlayerWrapper, SelectComponent } from '../../../../General';
import { CloudUploadOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';
import ContentDataGrid from '../../../../General/DataGrid/ContentDataGrid';
import { DeleteContent } from '../../DeleteContent';
export const UploadHighlights = ({className, videoData}) => {
    const [uploadFile, setUploadFile] = useState('');
    const [showUpload, setShowUpload] = useState(false);
    const [uploadThumb, setUploadThumb] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [uploadVideoTitle, setUploadVideoTitle] = useState('');
    const [uploadVideoDesc, setUploadVideoDesc] = useState('');
    const [thumbURL, setThumbURL] = useState('')
    const [uploadVideoEvent, setUploadVideoEvent] = useState('none');
    const [uploadVideoCategory, setUploadVideoCategory] = useState('none');
    const [videoURL, setVideoURL] = useState()
    const [postID, showPostID] = useState('')
    const [showBackDrop, setShowBackDrop] = useState(false)
    const uploadFileObject = useRef()
    const uploadThumbObject = useRef()
    const updatedThumbURL = useRef("")
    const uploadURL = useRef();
    const params = useParams()
    const NavigateToPage = useNavigate()


    const [highlightData, setHighlightData] = useState([])
    // const womenGamesRef = collection(firestore, `/highlights`)
    
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

    const HandleEdit = async(postID) => {
        if (postID) {
            const docQuery = query(collection(firestore,'/highlights'), where("videoID", "==", params && params.videoID? params.videoID : postID))
            showPostID(postID)
            await getDocs(docQuery).then((snap)=>{
                setUploadVideoTitle(snap.docs[0].data().videoTitle)
                setUploadVideoDesc(snap.docs[0].data().videoDesc)
                setUploadVideoEvent(snap.docs[0].data().eventType)
                setUploadVideoCategory(snap.docs[0].data().category)
                setThumbURL(snap.docs[0].data().thumbnail)
                setVideoURL(snap.docs[0].data().videoURL)
                setShowUpload(true)
            })
        } else {
            if (videoURL) {
                CleanUpStates(0)
                setShowUpload(false)
                showPostID("")
            }
        }
    }

    const HandleDelete = async(postID) => {
        if(postID) {
            showPostID(postID)
            setShowBackDrop(true)
        }
    }

    useEffect(()=>{
        if (!showUpload) { 
            CleanUpStates(0)
        }
        if ( highlightData.length == 0 ) {
            QueryDocs(setHighlightData, "highlights")
        }
    },[showUpload])

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
    const Channels = [
        {
            optName: "None",
            ovtValue: "none"
        },
        {
            optName: "Fox Sports",
            optValue: "foxsports"
        },
        {
            optName: "Olympic Channel",
            optValue: "olympicchannel"
        },
        {
            optName: "ESPN",
            optValue: "espn"
        },
        {
            optName: "NBC Sports",
            optValue: "nbcsports"
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

    const SelectThumbnail = (e) => {
        if (e.target.files.length > 0) {
            setUploadThumb(e.target.files[0].name)
            setUploadPercentage(0)
            uploadThumbObject.current = e.target.files[0]
        } else {
            setUploadFile("")
            setUploadPercentage(0)
            uploadThumbObject.current = ""
        }
    }

    const HandleEventChange = (e) => {
        setUploadVideoEvent(e.target.value)
    }
    
    const HandleCategoryChange = (e) => {
        setUploadVideoCategory(e.target.value)
    }

    const CleanUpStates = (uploadPercentage) => {
        setUploadPercentage(uploadPercentage);
        setUploadVideoEvent("none");
        setUploadVideoCategory("none");
        setUploadVideoTitle("");
        setUploadVideoDesc("");
        setUploadFile("")
        setUploadThumb("")
        setVideoURL("")
        setThumbURL("")
        setShowUpload(false)
        uploadFileObject.current = ""
        uploadThumbObject.current = ""
        uploadURL.current = ""
    }

    const UploadVideo = async(e) => {
        e.preventDefault()
        if (
                uploadVideoDesc && 
                uploadVideoTitle && 
                uploadVideoEvent && uploadVideoEvent !== "none" &&
                uploadVideoCategory && uploadVideoCategory !== "none") {
            if (videoURL && (params.videoID || postID)) {
                
                if (uploadThumbObject.current) {
                    const fireStorageRef = ref(fireStorage, `/files/${uploadThumbObject.current.name}`)
                    const fireUploadTask = uploadBytesResumable(fireStorageRef, uploadThumbObject.current)
                    fireUploadTask.on("state_changed", (snapshot)=> {
                        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        setUploadPercentage(prog === 100 ? 99: prog)
                    },
                    (err)=>console.log(err),
                    ()=>{
                        getDownloadURL(fireUploadTask.snapshot.ref)
                            .then(async (url) =>{
                                let tempGameData ={
                                    videoID: params.videoID ? params.videoID : postID,
                                    videoURL: videoURL,
                                    uploadedAt: serverTimestamp(),
                                    videoTitle: uploadVideoTitle,
                                    videoDesc: uploadVideoDesc,
                                    eventType: uploadVideoEvent,
                                    category: uploadVideoCategory,
                                    thumbnail: url
                                }
                                const videoQuery = query(collection(firestore, "highlights"), where("videoID", "==", params.videoID ? params.videoID : postID))
                                await getDocs(videoQuery).then(async(snap)=>{
                                    let docID = snap.docs[0].id
                                    const docRef = doc(firestore,`highlights`, docID)
                                    await updateDoc(docRef, tempGameData).then((res)=> {
                                        setUploadPercentage(100)
                                        setThumbURL(url)
                                        QueryDocs(setHighlightData, "highlights")
                                    },
                                    (err)=>console.log("update err", err))
                                })
                             }
                            )
                        }
                    )
                } else if(thumbURL) {
                    setUploadPercentage(0)
                    let tempGameData ={
                        videoID: params.videoID ? params.videoID : postID,
                        videoURL: videoURL,
                        uploadedAt: serverTimestamp(),
                        videoTitle: uploadVideoTitle,
                        videoDesc: uploadVideoDesc,
                        eventType: uploadVideoEvent,
                        category: uploadVideoCategory,
                        thumbnail: thumbURL
                    }
                    
                    const videoQuery = query(collection(firestore, "highlights"), where("videoID", "==", params && params.videoID ? params.videoID : postID))
                    await getDocs(videoQuery).then(async(snap)=>{
                        let docID = snap.docs[0].id
                        const docRef = doc(firestore,`highlights`, docID)
                        await updateDoc(docRef, tempGameData).then((res)=> {
                            setUploadPercentage(100)
                            QueryDocs(setHighlightData, "highlights")
                        },
                        (err)=>console.log("update err", err))
                    })
                } else {
                    console.log("thumbnail not found");
                }
            }else {
                if (!uploadFileObject.current ) return;
                const fireStorageRef = ref(fireStorage, `/files/${uploadFileObject.current.name}`)
                const fireUploadTask = uploadBytesResumable(fireStorageRef, uploadFileObject.current)
                fireUploadTask.on("state_changed", (snapshot)=> {
                    const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setUploadPercentage(prog === 100 ? 99: prog)
                },
                (err)=>console.log(err),
                ()=>{
                    getDownloadURL(fireUploadTask.snapshot.ref)
                        .then(url =>{
                            const fireThumbStorageRef = ref(fireStorage, `/thumb/${uploadThumbObject.current.name}`)
                            const fireThumbUploadTask = uploadBytesResumable(fireThumbStorageRef, uploadThumbObject.current)
                            fireThumbUploadTask.on("state_changed", (snapshot) =>{
                            }, (err)=> console.log("thumb err", err),
                            ()=>{
                                getDownloadURL(fireThumbUploadTask.snapshot.ref)
                                .then(async(thumbURL) => {
                                    let tempGameData ={
                                        videoID: uuid().split("-").at(-1),
                                        videoURL: url,
                                        uploadedAt: serverTimestamp(),
                                        videoTitle: uploadVideoTitle,
                                        videoDesc: uploadVideoDesc,
                                        eventType: uploadVideoEvent,
                                        category: uploadVideoCategory,
                                        thumbnail: thumbURL,
                                        likeCount: 0,
                                        dislikeCount: 0
                                    }
                                    const gameRef = collection(firestore, `highlights`);
                                    await addDoc(gameRef,tempGameData).then(res => {
                                        CleanUpStates(100);
                                        QueryDocs(setHighlightData, "highlights")
                                    },(err)=> console.log(err))
                                })
                            })
                            
                        })
                    }
                )
            }
        } else {
            console.log("upload Fail")
        }
    }


    const HandleBackDrop = () => {
        setShowBackDrop(false)
    }

    const HandleDeleteClick = async(delID) => {
        if(delID) {
            const deleteVid = query(collection(firestore, "highlights"), where("videoID", "==", delID))
            await getDocs(deleteVid).then(async(snap)=> {
                if (snap.docs.length > 0) {
                    await deleteDoc(doc(firestore, "highlights", snap.docs[0].id)).then((res)=>{
                        QueryDocs(setHighlightData, "highlights")
                        setShowBackDrop(false)
                    })
                }
            })
        }
    }

    const CancelBtnClick = () => {
        console.log("cancle btn click")
        setShowBackDrop(false)
    }

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
                    <p>Upload Highlight</p>
                    {
                        showUpload ? 
                            <KeyboardArrowUpOutlined /> 
                            :
                            <KeyboardArrowDownOutlined />
                    }
                </div>
            </div>
            
            <div className={`vid-upload-main ${showUpload? '':'hide-upload'}`}>
                <div className="vid-upload-upper">
                    <h3>Upload Highlights</h3>
                    <form className="vid-upload-form" onSubmit={UploadVideo}>
                        <div className="vid-upload-input">
                            <label>Title</label>
                            <input className='vid__uploadTitle' onChange={(e)=>setUploadVideoTitle(e.target.value) } value={uploadVideoTitle} required></input>
                        </div>
                        <div className="vid-upload-input">
                            <label>Description</label>
                            <textarea className='vid__uploadDesc'  rows={6} onChange={(e)=>setUploadVideoDesc(e.target.value)} value={uploadVideoDesc} required></textarea>
                        </div>
                        <div className="vid-upload-parted">
                            <SelectComponent label={`Events`} optData={AllEvents}  handleOnChange={HandleEventChange} defaultValue={uploadVideoEvent}/>
                            <SelectComponent label={`Category`} className={`upload-category`}  optData={AllCategories} handleOnChange={HandleCategoryChange} defaultValue={uploadVideoCategory}/>
                        </div>
                        <div className='vid-upload-video'>
                            <CustomButtonModified btnLabel={`${videoURL? 'Update':'Upload'}`} btnType={`submit`}/>
                        </div>
                        <div className='vid__progressBar'>
                            {
                                uploadPercentage ? <ProgressBar percentage={uploadPercentage} isUpdated={videoURL ? true : false}/> : "" 
                            }
                        </div>
                    </form>
                </div>
                <div className="vid-upload-lower">
                {
                        !params.postID || !postID ?
                            !uploadFileObject.current ?
                                !videoURL ?
                                    <div className='vid-upload-upper-sec'>
                                        <div className='vid-round-keyup-wrapper'>
                                            <div className="vid-rounded-keyup">
                                                <CloudUploadOutlined sx={{width: 70, height: 70, color: "gray"}}/>
                                            </div> 
                                        </div>
                                        <div className={`vid-upload-info-lower ${videoURL ? 'vid-fix-back' : ''}`}>
                                            <p>{uploadFile}</p>
                                            {
                                                params.videoID || postID || uploadFileObject.current ? 
                                                    ""
                                                :
                                                    <label className='vid-upload-file-info' htmlFor="uploadFileInfo" onChange={SelectHighlightVideo}>
                                                        <input name="" type="file" id="uploadFileInfo" accept='video/*' hidden />
                                                        Select Video
                                                    </label>
                                            }
                                        </div> 
                                    </div> 
                                    :
                                    <div className='vid-upload-upper-sec vid-upload-player'> 
                                        <ReactPlayerWrapper width="100%"
                                                        height="100%" 
                                                        url={videoURL ? videoURL : uploadURL.current}
                                                        // thumb={thumbURL}
                                                        control={true}
                                                        />
                                    </div>
                            :
                            <div className='vid-upload-upper-sec vid-upload-player'> 
                                <ReactPlayerWrapper width="100%"
                                                height="100%" 
                                                url={videoURL ? videoURL : uploadURL.current}
                                                // thumb={thumbURL}
                                                control={true}
                                                />
                            </div>
                            :
                        <div className='vid-upload-upper-sec vid-upload-player'> 
                            <ReactPlayerWrapper width="100%"
                                            height="100%" 
                                            url={videoURL ? videoURL : uploadURL.current}
                                            control={true}
                                            // thumb={thumbURL}
                                            />
                        </div>
                    }
                    <div className={`vid-upload-info-lower ${videoURL ? 'vid-fix-back' : ''}`}>
                            <p>{uploadFile}</p>
                            {
                                uploadFileObject.current ? 
                                <div className='vid-upload-thumbnail'>
                                    <label className='vid-upload-thumb-info vid-upload-info-fix' htmlFor="uploadThumbInfo" onChange={SelectThumbnail}>
                                        <input name="" type="file" id="uploadThumbInfo" accept='image/*' hidden />
                                        Select Thumbnail
                                    </label>
                                    <p>{uploadThumb}</p>
                                    <label className='vid-upload-file-info' htmlFor="uploadFileInfo" onChange={SelectHighlightVideo}>
                                        <input name="" type="file" id="uploadFileInfo" accept='video/*' hidden />
                                        Change Video
                                    </label>
                                </div>
                                : ""
                            }
                    </div> 
                    
                </div>
            </div>
            <div className='content-grid'>
                <ContentDataGrid contentData={highlightData} handleEdit={HandleEdit} handleDelete={HandleDelete}/>
            </div>
        </div>
    )
}