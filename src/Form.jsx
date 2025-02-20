import React from 'react'

const Form = ({setForm}) => {
    const handleAdd =(e)=>{
        e.preventDefault();
        setForm(false);
        alert("Item added");
    }
  return (
    <div>
        <p style={{fontSize:"larger"}}>Add a device</p>
        <form className='form'>
            <input type="text" className="input" placeholder='Device name' />
            <input type="text" className="input" placeholder='User name' />
            <input type="text" className="input" placeholder='Ownership' />
            <input type="text" className="input" placeholder='Domain Name' />
            <input type="text" className="input" placeholder='Status' />
            <input type="text" className="input" placeholder='Agent Version' />
            <input type="text" className="input" placeholder='OS Name' />
            <button className='btn' onClick={handleAdd}>
                Add
            </button>
        </form>
    </div>
  )
}

export default Form