import React, { useCallback, useEffect, useRef } from "react";
import "./Videopage.css";
import moment from "moment";
import Likewatchlatersavebtns from "./Likewatchlatersavebtns";
import { useParams, Link } from "react-router-dom";
import Comment from "../../Component/Comment/Comment";
import { viewvideo } from "../../action/video";
import { addtohistory } from "../../action/history";
import { useSelector, useDispatch } from "react-redux";
import { updatePoints, getUserPoints } from "../../Api/index";
import { setUser, logoutUser } from "../../action/user";

const Videopage = () => {
  const { vid } = useParams();
  const dispatch = useDispatch();
  const vids = useSelector((state) => state.videoreducer);
  const currentuser = useSelector((state) => state.currentuserreducer);
  const videowatched = useSelector((state) => state.watchVideoReducer);

  const vv = vids?.data.find((q) => q._id === vid);
  const hasHandledVideo = useRef(false);

  useEffect(() => {
    if (currentuser?.result?._id) {
      const userId = currentuser.result._id;
      getUserPoints(userId)
        .then((response) => {
          dispatch(setUser(userId, response.data.points));
        })
        .catch((error) => {
          console.error("Failed to fetch user points:", error);
        });
    }
  }, [currentuser, dispatch]);

  // Handle video watched logic
  const handleVideo = useCallback(() => {
    if (!hasHandledVideo.current && !videowatched.watchedVideos[vid]) {
      hasHandledVideo.current = true;
      dispatch({ type: "WATCHED_VIDEO", payload: vid });
      dispatch({ type: "ALLOCATE_POINTS", payload: 5 });

      const userId = currentuser?.result?._id;
      if (userId) {
        updatePoints(userId, 5)
          .then((response) => {
            console.log("Points updated successfully:", response.data.points);
            dispatch(setUser(userId, response.data.points));
          })
          .catch((error) => {
            console.error("Failed to update points:", error);
          });
      }
    } else {
      console.log("Video is already handled");
    }
  }, [dispatch, vid, videowatched.watchedVideos, currentuser]);

  useEffect(() => {
    if (currentuser) {
      dispatch(
        addtohistory({
          videoid: vid,
          viewer: currentuser?.result._id,
        })
      );
    }
    dispatch(viewvideo({ id: vid }));
  }, [vid, currentuser, dispatch]);

  return (
    <div className="container_videoPage">
      <div className="container2_videoPage">
        <div className="video_display_screen_videoPage">
          <video
            src={`http://localhost:5000/${vv?.filepath}`}
            className="video_ShowVideo_videoPage"
            onEnded={handleVideo}
            controls
          ></video>
          <div className="video_details_videoPage">
            <div className="video_btns_title_VideoPage_cont">
              <p className="video_title_VideoPage">{vv?.title}</p>
              <div className="views_date_btns_VideoPage">
                <div className="views_videoPage">
                  {vv?.views} views <div className="dot"></div>{" "}
                  {moment(vv?.createdat).fromNow()}
                </div>
                <Likewatchlatersavebtns vv={vv} vid={vid} />
              </div>
            </div>
            <Link to={"/"} className="chanel_details_videoPage">
              <b className="chanel_logo_videoPage">
                <p>{vv?.uploader.charAt(0).toUpperCase()}</p>
              </b>
              <p className="chanel_name_videoPage">{vv.uploader}</p>
            </Link>
            <div className="comments_VideoPage">
              <h2>
                Comments
              </h2>
              <Comment videoid={vv?._id} />
            </div>
          </div>
        </div>
        <div className="moreVideoBar">More videos</div>
      </div>
    </div>
  );
};

export default Videopage;
