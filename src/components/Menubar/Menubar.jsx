import React from "react";
import "../Menubar/Menubar.scss";
import { useSelector } from "react-redux";


function Menubar({day}) {
  let toogleBoolean = useSelector((state) => state.toggleMenu);

  return (
    <>
      {!toogleBoolean ? (
        <div className="menubar" style={day?{backgroundColor:"rgba(220, 220, 220, 0.393)"}:{backgroundColor:"#0f0e0e"}}>
        </div>
      ):(<div className="menubar_transistion"></div>)}
    </>
  );
}

export default Menubar;
