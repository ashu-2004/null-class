import React, { useCallback, useEffect, useRef } from "react";
import "./Showvideo.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const Showvideo = ({ setIsWatched, vid, videoRef }) => {
  const dispatch = useDispatch();
  const videowatched = useSelector((state) => state.watchVideoReducer);
  const hasHandledVideo = useRef(false);
  const prevWatchedState = useRef(null);

  const handleVideo = useCallback(() => {
    if (!hasHandledVideo.current && !videowatched.watchedVideos[vid._id]) {
      hasHandledVideo.current = true;
      setIsWatched(true);
      dispatch({ type: "WATCHED_VIDEO", payload: vid._id });
      dispatch({ type: "ALLOCATE_POINTS", payload: 5 });
    } else {
      console.log("Video already handled.");
    }
  }, [dispatch, vid._id, setIsWatched, videowatched.watchedVideos]);

  useEffect(() => {
    if (prevWatchedState.current !== videowatched) {
      prevWatchedState.current = videowatched; 
    }
  }, [videowatched]);

  return (
    <>
      <Link to={`/videopage/${vid._id}`}>
        <video
          src={`http://localhost:5000/${vid.filepath}`}
          ref={videoRef}
          onEnded={handleVideo}
          className="video_ShowVideo"
        />
      </Link>
      <div className="video_description">
        <div className="Chanel_logo_App">
          <div className="fstChar_logo_App">
            {vid?.uploader?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="video_details">
          <p className="title_vid_ShowVideo">{vid?.videotitle}</p>
          <pre className="vid_views_UploadTime">{vid?.uploader}</pre>
          <pre className="vid_views_UploadTime">
            {vid?.views} views <div className="dot"></div>
            {moment(vid?.createdat).fromNow()}
          </pre>
        </div>
      </div>
    </>
  );
};

export default React.memo(Showvideo);
