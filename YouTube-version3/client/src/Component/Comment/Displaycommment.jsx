import React, { useState, useEffect } from "react";
import "./Comment.css";
import { useSelector, useDispatch } from "react-redux";
import { editcomment, deletecomment } from "../../action/comment";
import { useTranslation } from "react-i18next";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

const Displaycomment = ({
  cid,
  commentbody,
  userid,
  commenton,
  usercommented,
}) => {
  const [edit, setEdit] = useState(false);
  const [cmtBody, setCmtBody] = useState("");
  const [cmtId, setCmtId] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [translatedComment, setTranslatedComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(0);
  const [dislikedCount, setDislikedCount] = useState(0);
  const [disliked, setDisliked] = useState(false);
  const dispatch = useDispatch();
    const currentuser = useSelector(state => state.currentuserreducer);
  const { t, i18n } = useTranslation();

  const cityToLanguageMap = {
    "New York": "en",
    Paris: "fr",
    Madrid: "es",
    Berlin: "de",
    Lisbon: "pt",
    Rome: "it",
    Milan: "it",
  };

  const languages = ["en", "fr", "es", "de", "it", "pt"];
  const cities = Object.keys(cityToLanguageMap);

  useEffect(() => {
    setTranslatedComment(i18n.t(commentbody));
  }, [commentbody, i18n.language]);

  const handleEdit = (ctId, ctBdy) => {
    setEdit(true);
    setCmtId(ctId);
    setCmtBody(ctBdy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cmtBody) {
      alert(t("Please type your comment!"));
    } else {
      dispatch(editcomment({ id: cmtId, commentbody: cmtBody }));
      setCmtBody("");
    }
    setEdit(false);
  };

  const handleDelete = (id) => {
    dispatch(deletecomment(id));
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    const language = cityToLanguageMap[city];
    setSelectedLanguage(language);
    if (i18n.changeLanguage) {
      i18n.changeLanguage(language);
    }
  };

  const handleLanguageSelect = (language) => {
    if (i18n.changeLanguage) {
      i18n.changeLanguage(language);
      setSelectedLanguage(language);
    }
  };

  const translateText = (text) => {
    if (text) {
      setTranslatedComment(i18n.t(text));
    }
  };

  const toggleLike = () => {
    setLiked((prevLiked) => {
      if (prevLiked) {
        setLikedCount((prevCount) => prevCount + 1);
        if (disliked) {
          setDisliked(false);
          setDislikedCount((prevCount) => prevCount - 1);
        }
      } else {
        setLikedCount((prevCount) => prevCount - 1);
      }
      return !prevLiked;
    });
  };

  const toggleDislike = () => {
    setDisliked((prevDisliked) => {
      if (!prevDisliked) {
        setDislikedCount((prevCount) => prevCount + 1); 
        if (liked) {
          setLiked(false);
          setLikedCount((prevCount) => prevCount - 1); 
        }
      } else {
        setDislikedCount((prevCount) => prevCount - 1); 
      }
      return !prevDisliked;
    });
  };

  return (
    <>
      {edit ? (
        <form className="comments_sub_form_commments" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setCmtBody(e.target.value)}
            placeholder={t("Edit comment...")}
            value={cmtBody}
            className="comment_ibox"
          />
          <input
            type="submit"
            value={t("Change")}
            className="comment_add_btn_comments"
          />
        </form>
      ) : (
        <p className="comment_body">{translatedComment || commentbody}</p>
      )}

      <p className="usercommented">
        {" "}
        - {usercommented} {t("commented")} {commenton}
      </p>

      {currentuser?.result?._id === userid && (
        <p className="EditDel_DisplayCommendt">
          <div className="display-city-language">
            <i onClick={() => handleEdit(cid, commentbody)}>Edit</i>&nbsp;
            <i onClick={() => handleDelete(cid)}>Delete</i>&nbsp;
            <br />
            <div className="display-likes-dislikes">
              <span onClick={toggleLike}>
                {liked ? (
                  <AiFillLike size={22} className="btns_videoPage" />
                ) : (
                  <AiOutlineLike size={22} className="btns_videoPage" />
                )}
                <span>{likedCount}</span> 
              </span>
              <span onClick={toggleDislike}>
                {disliked ? (
                  <AiFillDislike size={22} className="btns_videoPage" />
                ) : (
                  <AiOutlineDislike size={22} className="btns_videoPage" />
                )}
                <span>{dislikedCount}</span> 
              </span>
            </div>
            <select
              className="option"
              onChange={(e) => handleCitySelect(e.target.value)}
              value={selectedCity}
            >
              <option value="">City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {t(city)}
                </option>
              ))}
            </select>
            <select
              className="option"
              onChange={(e) => handleLanguageSelect(e.target.value)}
              value={selectedLanguage}
            >
              <option value="">Language</option>
              {languages.map((lang, index) => (
                <option key={index} value={lang}>
                  {t(lang)}
                </option>
              ))}
            </select>
          </div>
        </p>
      )}
    </>
  );
};

export default Displaycomment;