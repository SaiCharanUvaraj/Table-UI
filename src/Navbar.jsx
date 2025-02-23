import React, { useState, useEffect, useRef } from "react";
import { FaFileExport, FaRegSquare, FaTrash, FaSearch, FaPlus, FaList, FaCheckSquare } from "react-icons/fa";
import Form from './Form';
import exportFile from "./ExportFile.js";

const Navbar = ({ setSelect, select, info, handleDelete, columns, selectedColumns,setSelectedColumns, setInfo}) => {
  const dropdownStyle = {
    position: "absolute",
    top: "50px",
    right: "10px",
    width: "300px",
    background: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    zIndex: 1000,
    padding: "10px",
  };

  const [colDropdown, setColDropdown] = useState(false);
  const [addDropdown, setAddDropdown] = useState(false);
  const [wantedColumns,setWantedColumns]=useState([])
  const dropdownRef = useRef(null);

  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  }

  const selectColumns=(item) =>{
    if(item===columns[0])
      return
    const cols=[...wantedColumns,item]
    setWantedColumns(cols);
  }

  const deSelectColumns=(item) =>{
    if(item===columns[0])
      return
    const cols=wantedColumns.filter((x)=>item!=x);
    setWantedColumns(cols);
  }

  const applyColumns =()=>{
    if(wantedColumns.length===0)
      return;
    let cols = columns.filter(item => wantedColumns.includes(item));
    cols=[columns[0],...cols];
    setSelectedColumns(cols);
  }

  const resetColumns =()=>{
    setSelectedColumns(columns);
    setWantedColumns([]);
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setColDropdown(false);
        setAddDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar" style={{ position: "relative" }}>
      <p className="text" style={{ fontWeight: "600" }}>
        Table Devices: {info.length}
      </p>
      <div className="operators">
        <FaSearch onClick={() => setSelect(!select)} className="nav-buttons" />
        <FaTrash onClick={handleDelete} className="nav-buttons" />
        <FaFileExport onClick={() => exportFile(info)} className="nav-buttons" />
        
        <FaList onClick={() => setColDropdown(!colDropdown)} className="nav-buttons" />
        {colDropdown && (
          <div ref={dropdownRef} className="shadow" style={dropdownStyle}>
            <p className="bold-large">Choose Columns</p>
            <div style={{maxHeight: columns.length > 4 ? "200px" : "auto", overflowY: columns.length > 4 ? "auto" : "hidden"}}>
              {columns.map((item, index) => (
                <div style={{display:"flex", alignItems:"center",gap:"0.5rem"}} key={index}>
                  {wantedColumns.includes(item) && <FaCheckSquare onClick={()=>deSelectColumns(item)} />}
                  {!wantedColumns.includes(item) && <FaRegSquare onClick={()=>selectColumns(item)} />}
                  <p>{capitalize(item)}</p>
                </div>
              ))}
            </div>
            <div style={{display:"flex",alignItems:"center", gap: "0.1rem"}}>
              <p style={{fontSize:"small"}}>{wantedColumns.length} columns</p>
              <button onClick={applyColumns} className="btn">Apply</button>
              <button onClick={resetColumns} className="btn">Reset</button>
            </div>
          </div>
        )}

        <FaPlus onClick={() => setAddDropdown(!addDropdown)} className="nav-buttons" />
        {addDropdown && (
          <div ref={dropdownRef} className="shadow" style={dropdownStyle}>
            <Form info={info} setInfo={setInfo} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
