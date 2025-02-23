import React, { useState, useEffect, useRef } from "react";
import { FaFileExport, FaRegSquare, FaTrash, FaSearch, FaPlus, FaList, FaCheckSquare } from "react-icons/fa";
import Form from './Form';
import exportFile from "./ExportFile.js";

const Navbar = ({ setSelect, select, info, setMultiSelect, handleDelete, multiSelect, columns, selectedColumns,setSelectedColumns, setInfo}) => {
  const dropdownStyle = {
    position: "absolute",
    top: "50px",
    right: "10px",
    background: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    zIndex: 1000,
    padding: "10px",
  };

  const [colDropdown, setColDropdown] = useState(false);
  const [addDropdown, setAddDropdown] = useState(false);
  const dropdownRef = useRef(null);

  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  }

  const removeColumns=(item) =>{
    if(item===columns[0])
      return
    const newColumns=selectedColumns.filter((x)=>item!=x);
    setSelectedColumns(newColumns);
  }
  const addColumns=(item) =>{
    const newColumns=[...selectedColumns,item];
    setSelectedColumns(newColumns);
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
        <FaRegSquare onClick={() => setMultiSelect(!multiSelect)} className="nav-buttons" />
        <FaFileExport onClick={() => exportFile(info)} className="nav-buttons" />
        
        <FaList onClick={() => setColDropdown(!colDropdown)} className="nav-buttons" />
        {colDropdown && (
          <div ref={dropdownRef} className="shadow" style={dropdownStyle}>
            <p className="bold-large">Choose Columns</p>
            <div style={{maxHeight: columns.length > 4 ? "200px" : "auto", overflowY: columns.length > 4 ? "auto" : "hidden"}}>
              {columns.map((item, index) => (
                <div style={{display:"flex", alignItems:"center",gap:"0.5rem"}} key={index}>
                  {selectedColumns.includes(item) && <FaCheckSquare onClick={()=>removeColumns(item)} />}
                  {!selectedColumns.includes(item) && <FaRegSquare onClick={()=>addColumns(item)} />}
                  <p>{capitalize(item)}</p>
                </div>
              ))}
            </div>
            <p>{columns.length} columns chosen</p>
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
