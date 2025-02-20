import React, { useState } from 'react';

const Form = ({ setForm, info, setInfo }) => {
    const [formData, setFormData] = useState({
        name: "",
        user: "",
        owner: "",
        domain: "",
        status: "",
        version: "",
        os: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newData = {...formData, [name]: value};
        setFormData(newData);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const newData = [...info, formData];
        setInfo(newData);
        alert("Item added");
        setForm(false);
    };

    return (
        <div>
            <p style={{ fontSize: "xx-larger", textAlign: "center", fontWeight: "bold" }}>Add a device</p>
            <form className='form'>
                <input type="text" name="name" className="input" placeholder='Device name' value={formData.name} onChange={handleChange} />
                <input type="text" name="user" className="input" placeholder='User name' value={formData.user} onChange={handleChange} />
                <input type="text" name="owner" className="input" placeholder='Ownership' value={formData.owner} onChange={handleChange} />
                <input type="text" name="domain" className="input" placeholder='Domain Name' value={formData.domain} onChange={handleChange} />
                <input type="text" name="status" className="input" placeholder='Status' value={formData.status} onChange={handleChange} />
                <input type="text" name="version" className="input" placeholder='Agent Version' value={formData.version} onChange={handleChange} />
                <input type="text" name="os" className="input" placeholder='OS Name' value={formData.os} onChange={handleChange} />
                <button className='btn' onClick={handleAdd}>
                    Add
                </button>
            </form>
        </div>
    );
};

export default Form;
