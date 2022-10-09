import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import "./UploadLive.css"
import { fireStorage, firestore } from '../../../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { v4 as uuid} from "uuid"
import { BackDropFixed, CustomButtonModified, ProgressBar, SelectComponent } from '../../../../General';
import { CloudUploadOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';
import ContentDataGrid from '../../../../General/DataGrid/ContentDataGrid';
import { DeleteContent } from '../../DeleteContent';
export const UploadLive = ({className, videoData}) => {
    const [uploadFile, setUploadFile] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [uploadVideoTitle, setUploadVideoTitle] = useState('');
    const [uploadVideoDesc, setUploadVideoDesc] = useState('');
    const [uploadStreamURL, setUploadStreamURL] = useState('');
    const [uploadVideoEvent, setUploadVideoEvent] = useState('none');
    const [uploadVideoCategory, setUploadVideoCategory] = useState('none');
    const [thumbnailURL, setThumbnailURL] = useState()
    const [showUpload, setShowUpload] = useState(false);
    const [showBackDrop, setShowBackDrop] = useState(false)
    const [channel, setChannel] = useState("none")
    const [postID, showPostID] = useState('')
    const uploadFileObject = useRef()
    const uploadURL = useRef();
    const params = useParams()
    const NavigateToPage = useNavigate()

    const [liveData, setLiveData] = useState([])
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
            const docQuery = query(collection(firestore,'/lives'), where("videoID", "==", params.postID? params.postID : postID))
            showPostID(postID)
            await getDocs(docQuery).then((snap)=>{
                setUploadVideoTitle(snap.docs[0].data().videoTitle)
                setUploadVideoDesc(snap.docs[0].data().videoDesc)
                setUploadVideoEvent(snap.docs[0].data().eventType)
                setUploadVideoCategory(snap.docs[0].data().category)
                setUploadStreamURL(snap.docs[0].data().videoURL)
                setThumbnailURL(snap.docs[0].data().thumbnail)
                setShowUpload(true)
            })
        } else {
            if (uploadStreamURL) {
                CleanUpStates(0)
                setShowUpload(false)
                showPostID("")
            }
        }
    }

    useEffect(()=>{
        if (!showUpload) { 
            CleanUpStates(0)
        }
        if ( liveData.length == 0 ) {
            QueryDocs(setLiveData, "lives")
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

    const HandleEventChange = (e) => {
        setUploadVideoEvent(e.target.value)
    }
    
    const HandleCategoryChange = (e) => {
        setUploadVideoCategory(e.target.value)
    }

    const HandleChannelChange = (e) => {
        setChannel(e.target.value)
    }

    const CleanUpStates = (uploadPercentage) => {
        setUploadPercentage(uploadPercentage);
        setUploadVideoEvent("none");
        setUploadVideoCategory("none");
        setUploadVideoTitle("");
        setUploadVideoDesc("");
        setUploadFile("")
	    setUploadStreamURL("")
        setThumbnailURL("")
        uploadFileObject.current = ""
        uploadURL.current = ""
    }

    const UploadVideo = async(e) => {
        e.preventDefault()
        if (
                uploadVideoDesc && 
                uploadVideoTitle && 
                channel && 
                uploadVideoEvent && uploadVideoEvent !== "none" &&
                uploadVideoCategory && uploadVideoCategory !== "none") {
            if (uploadStreamURL && (params.videoID || postID)) {
                console.log("uploading...", postID)
                setUploadPercentage(0)
                let tempGameData ={
                    videoID: params.videoID ? params.videoID : postID,
                    videoURL: uploadStreamURL,
                    uploadedAt: serverTimestamp(),
                    videoTitle: uploadVideoTitle,
                    videoDesc: uploadVideoDesc,
                    eventType: uploadVideoEvent,
                    category: uploadVideoCategory,
                    thumbnail: thumbnailURL,
                    channelName: channel
                }
                const videoQuery = query(collection(firestore, "lives"), where("videoID", "==", params && params.videoID ? params.videoID : postID))
                await getDocs(videoQuery).then(async(snap)=>{
                    let docID = snap.docs[0].id
                    const docRef = doc(firestore,`lives`, docID)
                    await updateDoc(docRef, tempGameData).then((res)=> {
                        setUploadPercentage(100)
                        QueryDocs(setLiveData, "lives")
                    },
                    (err)=>console.log("update err", err))
                })
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
                        .then(async(url) =>{
                            let tempGameData ={
                                videoID: uuid().split("-").at(-1),
                                videoURL: uploadStreamURL,
                                uploadedAt: serverTimestamp(),
                                videoTitle: uploadVideoTitle,
                                videoDesc: uploadVideoDesc,
                                eventType: uploadVideoEvent,
                                category: uploadVideoCategory,
                                thumbnail: url,
                                channelName: channel,
                                likeCount: 0,
                                dislikeCount: 0
                            }
                            const gameRef = collection(firestore, `lives`);
                            await addDoc(gameRef,tempGameData).then(res => {
                                CleanUpStates(100);
                                QueryDocs(setLiveData, "lives")
                            },(err)=> console.log(err))
                        })
                    }
                )
            }
        } else {
            console.log("upload Fail")
        }
    }

    const HandleDeleteClick = async(delID) => {
        if(delID) {
            const deleteVid = query(collection(firestore, "lives"), where("videoID", "==", delID))
            await getDocs(deleteVid).then(async(snap)=> {
                if (snap.docs.length > 0) {
                    await deleteDoc(doc(firestore, "lives", snap.docs[0].id)).then((res)=>{
                        QueryDocs(setLiveData, "lives")
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
                    <p>Upload Live</p>
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
                    {
                        !params.postID || !postID ?
                            !uploadFileObject.current ?
                                !thumbnailURL ?
                                    <div className='vid-upload-upper-sec'>
                                        <div className='vid-round-keyup-wrapper'>
                                            <div className="vid-rounded-keyup">
                                                <CloudUploadOutlined sx={{width: 70, height: 70, color: "gray"}}/>
                                            </div> 
                                        </div>
                                        <div className={`vid-upload-info-lower ${params.videoID ? 'vid-fix-back' : ''}`}>
                                            <p>{uploadFile}</p>
                                            {
                                                params.videoID || uploadFileObject.current ? 
                                                    <label className='vid-upload-file-info' htmlFor="uploadFileInfo" onClick={()=> NavigateToPage(`/admin-panel/live/all`)}>
                                                        {/* <input name="" type="file" id="uploadFileInfo" accept='video/*' hidden /> */}
                                                        Back
                                                    </label>
                                                :
                                                    <label className='vid-upload-file-info' htmlFor="uploadFileInfo" onChange={SelectHighlightVideo}>
                                                        <input name="" type="file" id="uploadFileInfo" accept='image/*' hidden />
                                                        Select Image
                                                    </label>
                                            }
                                        </div> 
                                    </div> :
                                    <div className='vid-upload-upper-sec vid-upload-player'> 
                                        <img src={uploadURL.current ? uploadURL.current : thumbnailURL}/>
                                    </div>
                                :
                            <div className='vid-upload-upper-sec vid-upload-player'>  
                                <img src={uploadURL.current ? uploadURL.current : thumbnailURL} />
                            </div>
                            :
                            <div className='vid-upload-upper-sec vid-upload-player'> 
                                <img src={thumbnailURL ? thumbnailURL : uploadURL.current} />
                            </div>
                    }
                    <div className={`vid-upload-info-lower ${params.videoID ? 'vid-fix-back' : ''}`}>
                        <p>{uploadFile}</p>
                        {
                            params.videoID || uploadFileObject.current ? 
                            <label className='vid-upload-file-info' htmlFor="uploadFileInfo" onChange={SelectHighlightVideo}>
                                <input name="" type="file" id="uploadFileInfo" accept='image/*' hidden />
                                Change Image
                            </label>
                            :
                            ""
                        }
                    </div> 
                </div>
                <div className="vid-upload-lower">
                    <h3>Add Live Video</h3>
                    <form className="vid-upload-form" onSubmit={UploadVideo}>
				        <div className="vid-upload-input">
                            <label>Stream URL</label>
                            <input className='vid__uploadTitle' value={uploadStreamURL} onChange={(e)=>setUploadStreamURL(e.target.value)} required></input>
                        </div>
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
                            <SelectComponent label={`Broadcast Channels`} optData={Channels}  handleOnChange={HandleChannelChange} defaultValue={channel}/>
                        </div>
                        <div className='vid-upload-video'>
                            <CustomButtonModified btnLabel={`${params.videoID || postID? 'Update':'Upload'}`} btnType={`submit`}/>
                        </div>
                        <div className='vid__progressBar'>
                            {
                                uploadPercentage ? <ProgressBar percentage={uploadPercentage} isUpdated={params.videoID ? true : false}/> : "" 
                            }
                        </div>
                    </form>
                </div>
            </div>
            <div className='content-grid'>
                <ContentDataGrid contentData={liveData} handleEdit={HandleEdit} handleDelete={HandleDelete}/>
            </div>
        </div>
    )
}