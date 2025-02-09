import React, { useState, useEffect, useRef } from "react";
import "./Comment.css";
import moment from "moment";
import { updateCommentReaction } from "../../action/comment";
import { useSelector, useDispatch } from "react-redux";
import { editcomment, deletecomment } from "../../action/comment";
import { updateReaction } from "../../Api/index";
import axios from 'axios';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
const API_endpoints = `https://api.openweathermap.org/data/2.5/weather?`;
const API_key = `6be42835076e47d1e06a1daa59357c90`;

const DisplayComment = ({
  cid,
  commentbody,
  userid,
  commenton,
  usercommented,
}) => {
  const [edit, setEdit] = useState(false);
  const [cmtnody, setCommentBody] = useState("");
  const [cmtid, setCmntId] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [city, setCity] = useState({});
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [likes, setLikes] = useState(
    () => JSON.parse(localStorage.getItem(`likes-${cid}`)) || 0
  );
  const [dislikes, setDislikes] = useState(
    () => JSON.parse(localStorage.getItem(`dislikes-${cid}`)) || 0
  );

  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.currentuserreducer);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Geolocation Error: ", error);
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      let finalApiEndPoint = `${API_endpoints}lat=${latitude}&lon=${longitude}&appid=${API_key}`;

      axios
        .get(finalApiEndPoint)
        .then((response) => {
          setCity(response.data);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  }, [latitude, longitude]);

  const handleEdit = (ctid, ctbdy) => {
    setEdit(true);
    setCmntId(ctid);
    setCommentBody(ctbdy);
  };

  const handleDelete = (id) => {
    dispatch(deletecomment(id));
  };

  const handleTranslation = async () => {
    if (selectedLanguage === currentLanguage) {
      alert("Please select a different language for translation.");
      return;
    }

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        translatedText || commentbody
      )}&langpair=${currentLanguage}|${selectedLanguage}`
    );
    const data = await response.json();

    setTranslatedText(data.responseData.translatedText);
    setCurrentLanguage(selectedLanguage);
  };

  useEffect(() => {
    if (dislikes >= 2) {
      dispatch(deletecomment(cid));
    }
  }, [dislikes, dispatch, cid]);

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/comment/${cid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch comment data");
        }
        const data = await response.json();
  
        const comment = data.data.find((item) => item._id === cid);
  
        if (comment) {
          setLikes(comment.likes || 0);
          setDislikes(comment.dislikes || 0);
          localStorage.setItem(`likes-${cid}`, JSON.stringify(comment.likes || 0));
          localStorage.setItem(`dislikes-${cid}`, JSON.stringify(comment.dislikes || 0));
        } else {
          console.error("Comment not found in the fetched data");
        }
      } catch (error) {
        console.error("Error fetching comment data:", error);
      }
    };
  
    fetchCommentData();
  }, [cid]);
  
  const [likefill, setlikefill] = useState(false);
  const [dislikefill, setdislikefill] = useState(false);

const handleLikes = async () => {
  try {
    if (dislikefill) {
      const response = await updateReaction(cid, "dislike", -1);
      setDislikes(response.data.dislikes);
      localStorage.setItem(`dislikes-${cid}`, JSON.stringify(response.data.dislikes));
      setdislikefill(false);
    }

    const action = likefill ? -1 : 1;
    const response = await updateReaction(cid, "like", action);
    setLikes(response.data.likes);
    localStorage.setItem(`likes-${cid}`, JSON.stringify(response.data.likes));
    setlikefill(!likefill);
  } catch (error) {
    console.error("Error updating likes:", error);
  }
};

const handleDisLikes = async () => {
  try {
    if (likefill) {
      const response = await updateReaction(cid, "like", -1);
      setLikes(response.data.likes);
      localStorage.setItem(`likes-${cid}`, JSON.stringify(response.data.likes));
      setlikefill(false);
    }

    const action = dislikefill ? -1 : 1;
    const response = await updateReaction(cid, "dislike", action);
    setDislikes(response.data.dislikes);
    localStorage.setItem(`dislikes-${cid}`, JSON.stringify(response.data.dislikes));
    setdislikefill(!dislikefill);
  } catch (error) {
    console.error("Error updating dislikes:", error);
  }
};


  return (
    <>
      {edit ? (
        <>
          <form className="comments_sub_form_comments">
            <input
              type="text"
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Edit comments.."
              value={cmtnody}
              className="comment_ibox"
            />
            <input type="submit" value="Change" className="comment_add_btn" />
          </form>
        </>
      ) : (
        <p className="comment_body">{translatedText || commentbody}</p>
      )}

      <p className="usercommented">
        {" "}
        - {usercommented} commented {moment(commenton).fromNow()} from {city.name}
      </p>

      {currentuser?.result?._id === userid && (
        <p className="EditDel_DisplayCommendt">
          <i onClick={() => handleEdit(cid, commentbody)}>Edit</i>
          <i onClick={() => handleDelete(cid)}>Delete</i>
          &nbsp;
          {likefill ? (
            <AiFillLike
              size={22}
              className="btns_videoPage"
              onClick={() => handleLikes()}
            >
            </AiFillLike>
          ) : (
            <AiOutlineLike
              size={22}
              className="btns_videoPage"
              onClick={() => handleLikes()}
            >
            </AiOutlineLike>
          )}
          <span>{likes}</span>
          {dislikefill ? (
            <AiFillDislike
              size={22}
              className="btns_videoPage"
              onClick={() => handleDisLikes()}
            >
            </AiFillDislike>
          ) : (
            <AiOutlineDislike
              size={22}
              className="btns_videoPage"
              onClick={() => handleDisLikes()}
            >
            </AiOutlineDislike>
          )}
          <span>{dislikes}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <select
            className="option"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="mr">Marathi</option>
            <option value="es">Spanish</option>
            <option value="bn">Bengali</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="ja">Japanese</option>
            <option value="zh">Yue Chinese</option>
            <option value="vi">Vietnamese</option>
            <option value="bho">Bhojpuri</option>
            <option value="gu">Gujarati</option>
            <option value="it">Italian</option>
          </select>
          <i className="option" onClick={handleTranslation}>
            Translate
          </i>
        </p>
      )}
    </>
  );
};

export default DisplayComment;