import React, { useState } from 'react';
import './App.css';
import data from './db.json';
import Navbar from './Navbar';
import {FaArrowLeft, FaArrowRight, FaRegSquare, FaSort, FaSortUp, FaSortDown, FaCheckSquare, FaTrash } from "react-icons/fa";

export const App = () => {
  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /*useStates .... */
  const [info, setInfo] = useState(data);
  const [select, setSelect] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchValues, setSearchValues] = useState({ name: "", user: "", owner: "", domain: "", status: "", version: "", os: "" });
  const [page, setPage] = useState({ start: 0, end: 1 });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedColumns,setSelectedColumns]=useState(Object.keys(info[0]));

  /* sorting functionalities.... */
  const handleSort = (key) => {
    setSortConfig((prev) => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc', }));
  };

  let sortedData = [...info];

  if (sortConfig.key) 
    {
      sortedData.sort((a, b) => {
        const valueA = a[sortConfig.key].toLowerCase();
        const valueB = b[sortConfig.key].toLowerCase();
        if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });
  }

  /* Paging functionalities... */
  const pageRanges = [];
  for (let i = 0; i <= info.length; i += 10)
    pageRanges.push(i);
  if (pageRanges[pageRanges.length - 1] !== info.length)
    pageRanges.push(info.length);

  const handleNextPageChange = () => {
    if (page.end === pageRanges.length - 1) return;
    setPage({ start: page.start + 1, end: page.end + 1 });
  };

  const handlePrevPageChange = () => {
    if (page.start === 0) return;
    setPage({ start: page.start - 1, end: page.end - 1 });
  };

  const pagedData = sortedData.slice(pageRanges[page.start], pageRanges[page.end]);

  /* Searching functionalities... */
  const handleSearchChange = (e, key) => {
    setSearchValues({ ...searchValues, [key]: e.target.value });
  }; 

  const filteredData = pagedData.filter((item) =>
    Object.keys(searchValues).every((key) =>
      item[key].toLowerCase().includes(searchValues[key].toLowerCase())
    )
  );

  /*indexing final data ... */
  const finalData = filteredData.map((item, index) => ({...item,
    index
  }));
  const indexedData=info.map((item, index) => ({...item,
    index
  }));

  /* Multi selecting functionalities ... */
  const handleChoose = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleRemoveChoose = (item) => {
    setSelectedItems(selectedItems.filter(i => i !== item));
  };

  /*Multi selection delete..... */
  const handleDelete = () => {
    if (selectedItems.length === 0) return;
    alert(`${selectedItems.length} will be deleted!`);
    setInfo(indexedData.filter(item => !selectedItems.includes(item.index)));
    setSelectedItems([]);
    setMultiSelect(false);
  };

  /*column choosing funtionalities... */
  const columns=Object.keys(info[0]);

  return (
    <div>
      <Navbar select={select} setSelect={setSelect} info={info} setMultiSelect={setMultiSelect} handleDelete={handleDelete} multiSelect={multiSelect} columns={columns} selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} setInfo={setInfo} />
      <div className='table'>
        <div className='row' style={{ backgroundColor: "lightblue" }}>
          {selectedColumns.map((key) => (
            <div key={key} className='column' style={{ cursor: "pointer" }}>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-start", alignItems: "center" }} className="sortable-header" onClick={() => handleSort(key)}>
                <p className='header'>{capitalize(key)}</p>
                {sortConfig.key === key ? (sortConfig.direction === 'asc' ? <button style={{ cursor: "pointer" }}>sort-desc</button> : <button style={{ cursor: "pointer" }}>sort-asc</button>):""}
                {sortConfig.key === key ? ( sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown /> ) : ( <FaSort className='sort-icon' /> )}
              </div>
              {select &&
                <input type="text" placeholder={`Search ${capitalize(key)}`} value={searchValues[key]} onChange={(e) => handleSearchChange(e, key)} style={{width:"80%",height:"1.5rem"}}/>
              }
            </div>
          ))}
          <div className='column'>
            <p className='header' style={{textAlign:"center"}}>Action</p>
          </div>
        </div>
        {finalData.map((item) => (
          <div key={item.index} className='row' style={{ backgroundColor: item.index % 2 === 0 ? "ghostwhite" : "lightgray" }} 
          onClick={()=>setSortConfig({ key: null, direction: 'asc' })}>
            <p className='text' style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {multiSelect && !selectedItems.includes(item.index) &&
                <FaRegSquare color="blue" onClick={() => handleChoose(item.index)} />
              }
              {multiSelect && selectedItems.includes(item.index) &&
                <FaCheckSquare color="blue" onClick={() => handleRemoveChoose(item.index)} />
              }
              {capitalize(item.name)}
            </p>
            {selectedColumns.filter((key)=>key!=columns[0]).map((key) => (
              <p key={key} className='text'>{capitalize(item[key])}</p>))
            }
            
            <p className='text' style={{textAlign:"center"}}><FaTrash /></p>
          </div>
        ))}
        <div className='paging'>
          <p className='bold-large'>{pageRanges[page.start] + 1} - {pageRanges[page.end]} of {info.length}</p>
          <div className='bold-large' style={{ display: "flex", gap: "1rem" }}>
            <FaArrowLeft onClick={handlePrevPageChange} />
            <FaArrowRight onClick={handleNextPageChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;