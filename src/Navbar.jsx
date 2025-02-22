import React, { useState, useEffect, useRef } from "react";
import { FaFileExport, FaRegSquare, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import xlsx from "json-as-xlsx";

const Navbar = ({ setSelect, select, info, setMultiSelect, handleDelete, multiSelect }) => {
  const dropdownStyle={ position: "absolute", top: "50px", right: "10px", background: "#fff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", zIndex: 1000, padding: "10px"};
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const exportFile = () => {
    const columns = Object.keys(info[0]).map((key) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: key,
    }));
    const formatedInfo = [{ sheet: "Sheet1", columns, content: info }];
    const settings = {
      fileName: "MySpreadsheet",
      extraLength: 3,
      writeMode: "writeFile",
      writeOptions: {},
      RTL: true,
    };
    xlsx(formatedInfo, settings);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
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
        <FaFileExport onClick={exportFile} className="nav-buttons" />
        <FaPlus onClick={() => setShowDropdown(!showDropdown)} className="nav-buttons" />
        {showDropdown && (
          <div ref={dropdownRef} className="shadow" style={dropdownStyle}>
            <p>Column Choosing</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
