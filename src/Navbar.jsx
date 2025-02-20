import React from 'react'
import info from './db.json';
import { FaSearch,FaSort,FaList} from 'react-icons/fa';

const Navbar = ({setForm,setSelect,select,info}) => {
  return (
    <div className='navbar'>
      <p className='text' style={{fontWeight:"600"}}>Table Devices: {info.length}</p>
      <div className='operators'>
        <FaSearch onClick={()=>setSelect(!select)} />
        <FaSort />
        <FaList />
        <button className='btn' style={{color:"cornflowerblue"}}>Scan all</button>
        <button className='btn' style={{backgroundColor:"cornflowerblue",color:"white"}} onClick={()=>setForm(true)}>Add device</button>
      </div>
    </div>
  )
}

export default Navbar