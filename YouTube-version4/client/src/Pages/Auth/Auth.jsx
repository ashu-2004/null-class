import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { setcurrentuser } from "../../action/currentuser";
import { getUserPoints } from "../../Api/index";

const Auth = ({ user, setauthbtn, seteditcreatechanelbtn }) => {
  const dispatch = useDispatch();
  const [points, setPoints] = useState(0);

 
  const logout = () => {
    dispatch(setcurrentuser(null));
    localStorage.clear();
    googleLogout();
  };

  useEffect(() => {
    if (user) {
      const userId = user.result._id;
      getUserPoints(userId)
        .then((response) => {
          if (response.data.success) {
            setPoints(response.data.points);
          }
        })
        .catch((error) => {
          console.error("Error fetching points:", error);
        });
    }
  }, [user]);

  return (
    <div className="Auth_container" onClick={() => setauthbtn(false)}>
      <div className="Auth_container2">
        <p className="User_Details">
          <div className="Chanel_logo_App">
            <p className="fstChar_logo_App">
              {user?.result.name
                ? user.result.name.charAt(0).toUpperCase()
                : user.result.email.charAt(0).toUpperCase()}
            </p>
          </div>
          <div className="email_auth">{user?.result.email}</div>
        </p>
        <div className="btns_Auth">
          {user?.result.name ? (
            <>
              <Link to={`/channel/${user?.result?._id}`} className="btn_Auth">
                Your Channel
              </Link>
            </>
          ) : (
            <>
              <input
                type="submit"
                className="btn_Auth"
                value="Create Your Own Channel"
                onClick={() => seteditcreatechanelbtn(true)}
              />
            </>
          )}
          
          <p>Points allocated are: {points}</p>
          <div>
            <div className="btn_Auth" onClick={() => logout()}>
              <BiLogOut />
              Log Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
