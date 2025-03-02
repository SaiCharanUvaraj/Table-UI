import React, { useState } from 'react';
import './Table.css';
import data from './db.json';
import Navbar from './Navbar';
import {FaArrowLeft, FaArrowRight, FaRegSquare, FaSort, FaSortUp, FaSortDown, FaCheckSquare, FaTrash } from "react-icons/fa";

export const Table = () => {
  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /*useStates .... */
  const [info, setInfo] = useState(data);
  const [select, setSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchValues, setSearchValues] = useState({ name: "", user: "", owner: "", domain: "", status: "", version: "", os: "" });
  const [page, setPage] = useState({ start: 0, end: 1 });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedColumns,setSelectedColumns]=useState(Object.keys(info[0]));
  const [pageRows,setPageRows]=useState(10);

  const columns=Object.keys(info[0]);

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns.length+1}, 1fr)`,
    backgroundColor: "gainsboro",
    padding: "0.1rem",
    paddingLeft:"1.5rem",
    border: "0.5px lightgrey solid"
  };

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
  for (let i = 0; i <= info.length; i += pageRows)
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

  const incPageRows =() =>{
    if(pageRows===15)
      return;
    setPageRows(pageRows+1);
  }
  const decPageRows =() =>{
    if(pageRows===5)
      return;
    setPageRows(pageRows-1);
  }

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
    const updatedInfo=indexedData.filter(item => !selectedItems.includes(item.index));
    setInfo(updatedInfo.map(({ index, ...rest }) => rest));
    setSelectedItems([]);
  };

  const handleActionDelete =(key)=>{
    alert("The item will be deleted!");
    const updatedInfo=indexedData.filter(item => item.index!==key);
    setInfo(updatedInfo.map(({ index, ...rest }) => rest));
  }

  return (
    <div>
      <Navbar select={select} setSelect={setSelect} info={info} handleDelete={handleDelete} columns={columns} selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} setInfo={setInfo} />
      <div className='table'>
        <div className='row' style={{ ...rowStyle, backgroundColor: "#f1f4fb" }}>
          {selectedColumns.map((key) => (
            <div key={key} className='column'>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-start", alignItems: "center" }} className="sortable-header">
                {key===columns[0]?
                  <div style={{display:"flex",alignItems:"center", gap: "1rem"}}>
                    <FaRegSquare color='#717276'/>
                    <p className='header' onClick={() => handleSort(key)} style={{ cursor: "pointer" }}>{capitalize(key)}</p>
                  </div>
                  :
                  <p className='header' onClick={() => handleSort(key)} style={{ cursor: "pointer" }}>{capitalize(key)}</p>}
                {sortConfig.key === key ? (sortConfig.direction === 'asc' ? <button style={{ cursor: "pointer" }}>sort-desc</button> : <button style={{ cursor: "pointer" }}>sort-asc</button>):""}
                {sortConfig.key === key ? ( sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown /> ) : ( <FaSort className='sort-icon' /> )}
              </div>
              {select &&
                <input type="text" placeholder={`Search ${capitalize(key)}`} value={searchValues[key]} onChange={(e) => handleSearchChange(e, key)} style={{width:"80%",height:"1.5rem",marginBottom:"0.5rem"}}/>
              }
            </div>
          ))}
          <div className='column'>
            <p className='header' style={{textAlign:"center"}}>Action</p>
          </div>
        </div>
        {finalData.map((item) => (
          <div key={item.index} className='row' style={{...rowStyle, backgroundColor: item.index % 2 === 0 ? "#ffffff" : "#F0F0F0" }} 
          onClick={()=>setSortConfig({ key: null, direction: 'asc' })}>
            <p className='text hover-container' style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {!selectedItems.includes(item.index) &&
                <FaRegSquare color="blue" className='hover-icon' onClick={() => handleChoose(item.index)} style={{ cursor: "pointer" }}/>
              }
              {selectedItems.includes(item.index) &&
                <FaCheckSquare color="blue" onClick={() => handleRemoveChoose(item.index)} style={{ cursor: "pointer" }}/>
              }
              {capitalize(item.name)}
            </p>
            {selectedColumns.filter((key)=>key!=columns[0]).map((key) => (
              <p key={key} className='text'>{capitalize(item[key])}</p>))
            }
            <p className='text' style={{textAlign:"center"}}><FaTrash onClick={()=>handleActionDelete(item.index)} style={{ cursor: "pointer" }}/></p>
          </div>
        ))}
      </div>
      <div className='paging'>
        <p className='bold-large'>Rows per Page: {pageRows}</p>
        <div style={{display:"grid"}} className='bold-large'>
          <FaSortUp onClick={incPageRows} style={{ cursor: "pointer" }} />
          <FaSortDown onClick={decPageRows} style={{ cursor: "pointer" }} />
        </div>
        <p className='bold-large'>{pageRanges[page.start] + 1} - {pageRanges[page.end]} of {info.length}</p>
        <div className='bold-large' style={{ display: "flex", gap: "1rem" }}>
          <FaArrowLeft onClick={handlePrevPageChange} style={{ cursor: "pointer" }} />
          <FaArrowRight onClick={handleNextPageChange} style={{ cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
};

export default Table;