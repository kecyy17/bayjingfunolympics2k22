import { KeyboardArrowDownOutlined, KeyboardArrowRightOutlined, PersonOutlined } from "@mui/icons-material"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { firestore } from "../../../../firebase"
import { PieChartWrapper, LineCharts, WidgetWrapper } from "../../../General"
import "./MainDashboard.css"
import { ItemSummary } from "../ItemSummary"
import { RestrictedAdminContext } from "../../../../AllContext"
export const MainDashboard = () => {
    const {totalUserCount} = RestrictedAdminContext();
    const {liveCount, bannedCount, liveGames} = RestrictedAdminContext();
    const [watchHour, setWatchHour] = useState(0)
    // const watchHour = useRef(0);

    const data = [
        { label: 'New Users', y: totalUserCount},
        { label: 'Active Users', y: liveCount},
        { label: 'Blocked Users', y: bannedCount},
      ];

    const GenerateWidgetData = (xTitle, xLiveCount, xLink, Icon) => {
        return {
            title: xTitle,
            liveCount: xLiveCount,
            link: xLink,
            icon:(<Icon className='widget-icon' style = {{color: 'crimson', backgroundColor: 'rgba(218,165,32,0.2)'}}/>)
        }
    }

        
    const WatchCount = async() => {
        const queryRef =  collection(firestore, `watchCount`)
        await getDocs(queryRef).then((res)=>{
            let watchTimeInServer = 0;
            res.forEach((doc)=> {
                watchTimeInServer += Math.round(doc.data().watchTime);
                
            })
            if (watchTimeInServer > 60) {
                let temp = Math.round(watchTimeInServer/60)
                if ( temp < 60) {
                    setWatchHour(Math.floor(watchTimeInServer/60)+"m")
                } else {
                    setWatchHour(Math.floor((watchTimeInServer/60)/60)+"h")
                }
            } else {
                setWatchHour(Math.floor(watchTimeInServer)+"s")
            }
            
            // setWatchHour(hour)
        })
    }
    

    useEffect(()=>{
        // if(type != "live") 
        //     return
        WatchCount()
        const calculateWatchTime = setInterval(() => {
            WatchCount()
        }, 10000);
        return ()=> clearInterval(calculateWatchTime)
    },[])
    
    return (
        <div className="admin-dashboard-container">
            <div className="admin-upper-components">
                <WidgetWrapper widgetData={GenerateWidgetData("All Users", totalUserCount, "See all users", PersonOutlined)} />
                <WidgetWrapper widgetData={GenerateWidgetData("Online Users", liveCount, "See all users", PersonOutlined )} />
                <WidgetWrapper widgetData={GenerateWidgetData("Watch Hours", watchHour, "See all users", PersonOutlined )} />
            </div>
            <div className="admin-lower-graphs">
                <div className="admin-total-users">
                    <div className="admin-user-upper">
                        <h3>User Summary</h3>
                        <br/>
                        <PieChartWrapper data={data}/>
                    </div>
                </div>
            </div>
        </div>
    )
}