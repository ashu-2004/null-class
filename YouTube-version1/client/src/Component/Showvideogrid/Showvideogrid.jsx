import React from 'react'
import "./Showvideogrid.css"
import Showvideo from '../Showvideo/Showvideo'
const Showvideogrid = ({setIsWatched,vid,videoRef,isWatched}) => {
  return (
    <div className="Container_ShowVideoGrid">
        {
            vid?.reverse().map(vi=>{
                return(
                    <div  key={vi._id} className="video_box_app">
                        <Showvideo videoRef={videoRef} isWatched={isWatched} setIsWatched={setIsWatched} vid={vi}/>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Showvideogrid