import React, { useEffect, useState } from "react";
import "../Navbar/Navbar.scss";
import { RiMenuFold2Fill } from "react-icons/ri";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { TbUserSquare } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../ReduxStore/Menutoggle";

function Navbar({ day }) {
  const dispatch = useDispatch();
  const [tabviewmenu, setTabViewMenu] = useState(null);
  let toogleBoolean = useSelector((state) => state.toggleMenu);

  const showMenu = () => {
    dispatch(toggle(false));
  };

  const hideMenu = () => {
    dispatch(toggle(true));
  };

  const updateViewMode = () => {
    if (window.innerWidth > 810) {
      setTabViewMenu(true); 
    } else {
      setTabViewMenu(false);
    }
  };

  useEffect(() => {
    updateViewMode();
    window.addEventListener("resize", updateViewMode);
    return () => window.removeEventListener("resize", updateViewMode);
  }, []);
  return (
    <>
      {toogleBoolean ? (
        <nav
          className="navbar"
          style={
            day ? { backgroundColor: "white" } : { backgroundColor: "#212121" }
          }
        >
          <div
            className="menubar_newchat"
            style={
              day
                ? { backgroundColor: "white" }
                : { backgroundColor: "#212121" }
            }
          >
            <RiMenuFold2Fill
              onClick={showMenu}
              style={day ? { color: "#212121" } : { color: "white" }}
            />
            <FiEdit
              style={day ? { color: "#212121" } : { color: "white" }}
              className="editicon"
            />
          </div>
          <div
            className="ainame_username"
            style={
              day
                ? { backgroundColor: "white" }
                : { backgroundColor: "#212121", color: "white" }
            }
          >
            <h1>Friday</h1>
            <TbUserSquare className="userlogin" />
          </div>
        </nav>
      ) : (
        <nav className="navbar_menu">
          <div
            className="menubar_newchat_menu"
            style={
              day && tabviewmenu
                ? { backgroundColor: "#ececec" }
                : day
                ? { backgroundColor: "white" }
                : { backgroundColor: "#0f0e0e" }
            }
          >
            <RiMenuUnfold2Fill
              onClick={hideMenu}
              style={day ? { color: "#212121" } : { color: "white" }}
            />
            <FiEdit style={day ? { color: "#212121" } : { color: "white" }} />
          </div>
          <div
            className="ainame_username_menu"
            style={
              day
                ? { backgroundColor: "white" }
                : { backgroundColor: "#212121", color: "white" }
            }
          >
            <h1>Friday</h1>
            <TbUserSquare className="userlogin" />
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
