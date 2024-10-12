import React, { useEffect, useState } from "react";
import "../Menubar/Menubar.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../ReduxStore/Menutoggle";

function Menubar({ day, allData }) {
  const isMenuToggled = useSelector((state) => state.toggleMenu);
  const [tabviewmenu, setTabViewMenu] = useState(null);
  const dispatch = useDispatch();

  const showMenu = () => {
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
    // Set the initial view mode based on screen size
    updateViewMode();

    // Add event listener for resizing the window
    window.addEventListener("resize", updateViewMode);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", updateViewMode);
  }, [allData]); // You can keep `allData` as the dependency if it's needed

  return (
    <>
      {!isMenuToggled ? (
        <div
          className="menubar"
          style={
            day && tabviewmenu
              ? { backgroundColor: "#ececec" }
              : day
              ? { backgroundColor: "white" }
              : { backgroundColor: "#0f0e0e" }
          }
        ></div>
      ) : (
        <div className="menubar_transistion"></div>
      )}
      {!isMenuToggled && (
        <div
          className="mobileview_background"
          onClick={showMenu}
          style={
            day
              ? { backgroundColor: "rgba(220, 220, 220, 0.393)" }
              : { backgroundColor: "#ffffff0d" }
          }
        ></div>
      )}
    </>
  );
}

export default Menubar;
