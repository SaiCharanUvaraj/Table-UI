import React, { useEffect, useRef, useState } from "react";
import "./NavProfile.css";

const NavProfile = () => {
  const dropdownRef = useRef(null);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const dropdownStyle = {
    position: "absolute",
    top: "60px",
    right: "10px",
    background: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    zIndex: 1000,
    padding: "15px 10px",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setTimeout(() => {
      setProfileDropdown((prev) => !prev);
    }, 200);
  };

  return (
    <div className="nav">
      <p>Logo</p>
      <div>
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile-icon" className="img" onClick={handleProfileClick} style={{width: "45px",height: "45px",cursor:"pointer"}}/>
        {profileDropdown && (
          <div ref={dropdownRef} style={dropdownStyle}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"15px"}}>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile-icon" onClick={handleProfileClick} style={{width: "60px",height: "60px"}}/>
                <div style={{display:"grid",gap: "10px" }}>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                        <div style={{fontSize:"medium",fontFamily:"Calibri"}}>Sai Charan</div>
                        <div style={{backgroundColor:"#317bde",color:"white",borderRadius: "50px", padding:"2px 5px",fontSize:"smaller",fontWeight:"lighter",fontFamily:"Calibri"}}>Student</div>
                    </div>
                    <div style={{fontSize:"medium",fontFamily:"Calibri"}}>saicharanuvi01@gmail.com</div>
                    <div className="link">My Account</div>
                </div>
            </div>
            <div style={{display:"grid",margin: "20px 0"}}>
                <div className="list">Help</div>
                <div className="list">Blogs</div>
                <div className="list">FAQ</div>
                <div className="list">Contact</div>
            </div>
            <hr style={{ border: "1px solid #f0f0f0" }} />
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"10px"}}>
                <button className="button">Sign Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default NavProfile;