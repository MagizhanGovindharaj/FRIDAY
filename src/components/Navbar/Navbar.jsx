import React, { useState } from 'react'
import "../Navbar/Navbar.scss"
import { RiMenuFold2Fill } from "react-icons/ri";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useSelector,useDispatch} from 'react-redux';
import { toggle } from '../ReduxStore/Menutoggle';

function Navbar() {
    const [menu,setMenu] = useState(true);
    const dispatch = useDispatch()
    let toogleBoolean = useSelector((state) => state.toggleMenu)
    console.log(toogleBoolean);
    const showMenu = ()=>{
        dispatch(toggle(false))
    }
    const hideMenu = ()=>{
        dispatch(toggle(true))
    }
  return (
    <nav className='navbar'>
        <div className='menubar_newchat'>
            {toogleBoolean?<RiMenuFold2Fill onClick={showMenu}/>:<RiMenuUnfold2Fill onClick={hideMenu}/>}
            <FiEdit />
        </div>
        <div className='ainame_username'>
            <h1>Friday</h1>
            <h2>M</h2>
        </div>
    </nav>
  )
}

export default Navbar