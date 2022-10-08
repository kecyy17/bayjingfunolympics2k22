import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import "./UploadNews.css"
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
export const UploadNews = ({className, videoData}) => {
    const [uploadFile, setUploadFile] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [uploadNewsTitle, setUploadNewsTitle] = useState('');
    const [uploadNewsDesc, setUploadNewsDesc] = useState('');
    const [authorName, setAuthorName] = useState('');
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

    const [newsData, setNewsData] = useState([])
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
        if ( newsData.length == 0 ) {
            QueryDocs(setNewsData, "news")
        }
    },[showUpload])

    const HandleEdit = async(postID) => {
        if (postID) {
            const docQuery = query(collection(firestore,'/news'), where("postID", "==", params.postID? params.postID : postID))
            showPostID(postID)
            
            await getDocs(docQuery).then((snap)=>{
                setUploadNewsTitle(snap.docs[0].data().newsTitle)
                setUploadNewsDesc(snap.docs[0].data().newsDesc)
                setUploadNewsEvent(snap.docs[0].data().eventType)
                setUploadNewsCategory(snap.docs[0].data().category)
                setAuthorName(snap.docs[0].data().authorName)
                setThumbnailURL(snap.docs[0].data().thumbnail)
                setShowUpload(true)
            })
        } else {
            if (authorName) {
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
        setUploadNewsTitle("");
        setUploadNewsDesc("");
        setUploadFile("")
	    setAuthorName("")
        showPostID("")
        setThumbnailURL("")
        uploadFileObject.current = ""
        uploadURL.current = ""
    }

    // Update and upload the post
    const UploadNews = async(e) => {
        e.preventDefault()
        if (
                uploadNewsDesc && 
                uploadNewsTitle && 
                uploadNewsEvent && uploadNewsEvent !== "none" &&
                uploadNewsCategory && uploadNewsCategory !== "none") {
            if (authorName && (params.postID || postID)) {
                setUploadPercentage(0)
                let tempGameData ={
                    postID: params.postID ? params.postID : postID,
                    authorName: authorName,
                    uploadedAt: serverTimestamp(),
                    newsTitle: uploadNewsTitle,
                    newsDesc: uploadNewsDesc,
                    eventType: uploadNewsEvent,
                    category: uploadNewsCategory,
                    thumbnail: thumbnailURL
                }
                const videoQuery = query(collection(firestore, "news"), where("postID", "==", params.postID ? params.postID : postID))
                await getDocs(videoQuery).then(async(snap)=>{
                    let docID = snap.docs[0].id
                    const docRef = doc(firestore,`news`, docID)
                    await updateDoc(docRef, tempGameData).then((res)=> {
                        setUploadPercentage(100)
                        QueryDocs(setNewsData, "news")
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
                                postID: uuid().split("-").at(-1),
                                authorName: authorName,
                                uploadedAt: serverTimestamp(),
                                newsTitle: uploadNewsTitle,
                                newsDesc: uploadNewsDesc,
                                eventType: uploadNewsEvent,
                                category: uploadNewsCategory,
                                thumbnail: url
                            }
                            const gameRef = collection(firestore, `news`);
                            await addDoc(gameRef,tempGameData).then(res => {
                                CleanUpStates(100);
                                QueryDocs(setNewsData, "news")
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
            const deleteVid = query(collection(firestore, "news"), where("postID", "==", delID))
            await getDocs(deleteVid).then(async(snap)=> {
                if (snap.docs.length > 0) {
                    await deleteDoc(doc(firestore, "news", snap.docs[0].id)).then((res)=>{
                        QueryDocs(setNewsData, "news")
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
                    <p>Upload News</p>
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
                                        <div className={`vid-upload-info-lower ${params.postID || postID ? 'vid-fix-back' : ''}`}>
                                            <p>{uploadFile}</p>
                                            {
                                                params.postID  || showUpload ? 
                                                <label className='vid-upload-file-info' htmlFor="uploadFileInfo" onChange={SelectHighlightVideo}>
                                                    <input name="" type="file" id="uploadFileInfo" accept='image/*' hidden />
                                                    Select Image
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
                    <div className={`vid-upload-info-lower ${params.postID || postID ? 'vid-fix-back' : ''}`}>
                        <p>{uploadFile}</p>
                        {
                            params.postID || postID || uploadFileObject.current ? 
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
                    <h3>News Article</h3>
                    <form className="vid-upload-form" onSubmit={UploadNews}>
                        <div className="vid-upload-input">
                            <label>News Title</label>
                            <input className='vid__uploadTitle' onChange={(e)=>setUploadNewsTitle(e.target.value) } value={uploadNewsTitle} required></input>
                        </div>
                        <div className="vid-upload-input">
                            <label>News Content</label>
                            <textarea className='vid__uploadDesc'  rows={6} onChange={(e)=>setUploadNewsDesc(e.target.value)} value={uploadNewsDesc} required></textarea>
                        </div>
                        <div className="vid-upload-input">
                            <label>Author</label>
                            <input className='vid__uploadTitle' value={authorName} onChange={(e)=>setAuthorName(e.target.value)} required></input>
                        </div>
                        <div className="vid-upload-parted">
                            <SelectComponent label={`Events`} optData={AllEvents}  handleOnChange={HandleEventChange} defaultValue={uploadNewsEvent}/>
                            <SelectComponent label={`Category`} className={`upload-category`}  optData={AllCategories} handleOnChange={HandleCategoryChange} defaultValue={uploadNewsCategory}/>
                        </div>
                        <div className='vid__uploadNews'>
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
                <NewsDataGrid contentData={newsData} handleEdit={HandleEdit} handleDelete={HandleDelete}/>
            </div>
        </div>
    )
}