import React, { useState } from 'react';
import './App.css';
import info from './db.json';
import Form from './Form';
import Navbar from './Navbar';
import { FaEllipsisV } from "react-icons/fa";

export const App = () => {
  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const [add, setAdd] = useState(false);
  const [select, setSelect] = useState(false);

  const [searchValues, setSearchValues] = useState({name: "", user: "", owner: "", domain: "", status: "", version: "", os: ""});
  const [page, setPage] = useState({start:0, end:5});

  const handleSearchChange = (e, key) => {
    setSearchValues({ ...searchValues, [key]: e.target.value });
  };
  const handleNextPageChange = ()=>{
    if(info.length-page.start<=5)
      return
    const nextPage={start:page.start+5,end:page.end+5}
    if(nextPage.end>info.length)
      nextPage.end=info.length;
    setPage(nextPage)
  }
  const handlePrevPageChange = ()=>{
    if(page.end<=5)
      return
    const nextPage={start:page.start-5,end:page.end-5}
    if(nextPage.start<0)
      nextPage.start=0;
    setPage(nextPage)
  }

  const pagedData = info.slice(page.start,page.end)

  const filteredData = pagedData.filter((item) =>
    Object.keys(searchValues).every((key) =>
      item[key].toLowerCase().includes(searchValues[key].toLowerCase())
    )
  );

  return (
    <div>
      <Navbar setForm={setAdd} select={select} setSelect={setSelect} handlePrevPageChange={handlePrevPageChange} handleNextPageChange={handleNextPageChange}  />
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
          <div key={index} className='row' style={{ backgroundColor: item.bg }}>
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
      </div>

      {add && <Form setForm={setAdd}/>}
    </div>
  );
};

export default App;