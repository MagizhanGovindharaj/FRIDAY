import React, { useState } from "react";
import "../Navbar/Navbar.scss";
import { RiMenuFold2Fill } from "react-icons/ri";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../ReduxStore/Menutoggle";

function Navbar({day}) {
  const dispatch = useDispatch();
  let toogleBoolean = useSelector((state) => state.toggleMenu);

  const showMenu = () => {
    dispatch(toggle(false));
  };

  const hideMenu = () => {
    dispatch(toggle(true));
  };

  return (
    <>
      {toogleBoolean ? (
        <nav className="navbar" >
          <div className="menubar_newchat" >
            <RiMenuFold2Fill onClick={showMenu} style={day?{color:"#212121"}:{color:"white"}} />
            <FiEdit style={day?{color:"#212121"}:{color:"white"}} />
          </div>
          <div className="ainame_username" style={day?{backgroundColor:"white"}:{backgroundColor:"#212121",color:"white"}}>
            <h1>Friday</h1>
            <h2>M</h2>
          </div>
        </nav>
      ) : (
        <nav className="navbar_menu" >
          <div className="menubar_newchat_menu" >
            <RiMenuUnfold2Fill onClick={hideMenu} style={day?{color:"#212121"}:{color:"white"}}/>
            <FiEdit style={day?{color:"#212121"}:{color:"white"}} />
          </div>
          <div className="ainame_username_menu" style={day?{backgroundColor:"white"}:{backgroundColor:"#212121",color:"white"}}>
            <h1>Friday</h1>
            <h2>M</h2>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
