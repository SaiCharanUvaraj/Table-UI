import React, { useState } from 'react';
import './App.css';
import data from './db.json';
import Form from './Form';
import Navbar from './Navbar';
import { FaEllipsisV, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const App = () => {
  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }



  const [info,setInfo]=useState(data);
  const [add, setAdd] = useState(false);
  const [select, setSelect] = useState(false);

  const [searchValues, setSearchValues] = useState({name: "", user: "", owner: "", domain: "", status: "", version: "", os: ""});
  const [page, setPage] = useState({start:0, end:1});

  const pageRanges = [];
  for (let i = 0; i <= info.length; i += 6)
    pageRanges.push(i);
  if (pageRanges[pageRanges.length - 1] !== info.length)
    pageRanges.push(info.length);

  const handleSearchChange = (e, key) => {
    setSearchValues({ ...searchValues, [key]: e.target.value });
  };

  const handleNextPageChange = ()=>{
    if(page.end===pageRanges.length-1)
      return
    const nextPage={start:page.start+1,end:page.end+1}
    setPage(nextPage)
  }

  const handlePrevPageChange = ()=>{
    if(page.start===0)
      return
    const nextPage={start:page.start-1,end:page.end-1}
    setPage(nextPage)
  }

  const pagedData = info.slice(pageRanges[page.start],pageRanges[page.end])

  const filteredData = pagedData.filter((item) =>
    Object.keys(searchValues).every((key) =>
      item[key].toLowerCase().includes(searchValues[key].toLowerCase())
    )
  );

  return (
    <div>
      <Navbar setForm={setAdd} select={select} setSelect={setSelect} info={info}/>
      <div className='table'>
        <div className='row' style={{ backgroundColor: "lightblue" }}>
          {["name", "user", "owner", "domain", "status", "version", "os"].map((key) => (
            <div key={key} className='column'>
              <p className='header'>{capitalize(key)}</p>
              {select &&
                <input
                  type="text"
                  placeholder={`Search ${capitalize(key)}`}
                  value={searchValues[key]}
                  onChange={(e) => handleSearchChange(e, key)}
                  className="search-input"
                />
              }
            </div>
          ))}
          <div className='column'>
            <p className='header'>Action</p>
          </div>
        </div>
        {filteredData.map((item, index) => (
          <div key={index} className='row' style={{ backgroundColor: index % 2 === 0 ? "ghostwhite" : "lightgray" }}>
            <p className='text'>{capitalize(item.name)}</p>
            <p className='text'>{capitalize(item.user)}</p>
            <p className='text'>{capitalize(item.owner)}</p>
            <p className='text'>{capitalize(item.domain)}</p>
            <p className='text'>{capitalize(item.status)}</p>
            <p className='text'>{capitalize(item.version)}</p>
            <p className='text'>{capitalize(item.os)}</p>
            <p className='text'><FaEllipsisV /></p>
          </div>
        ))}
        <div className='paging'>
          <div style={{display:"flex",gap:"1rem"}}>
            <FaArrowLeft onClick={handlePrevPageChange} />
            <FaArrowRight onClick={handleNextPageChange} />
          </div>
          <p>{pageRanges[page.start]+1} to {pageRanges[page.end]}</p>
        </div>
      </div>
      <div style={{display:"grid",justifyContent:"center",alignContent:"center"}}>
      {add && <Form setForm={setAdd} info={info} setInfo={setInfo}/>}
      </div>
    </div>
  );
};

export default App;