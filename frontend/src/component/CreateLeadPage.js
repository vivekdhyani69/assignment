import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateLeadPage.css'; // Import CSS for styling

const CreateLeadPage = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [price, setprice] = useState('');
  // const [product, setProduct] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve token from local storage

    try {
    
      await axios.post( 'http://localhost:5000/api/leads/createLeads', { title, name, price, userId : userData?._id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate(`/home`)
    } catch (err) {
      setError('Failed to create lead');
      console.error(err);
    }
  };

  return (
    <div className="create-lead-container">
      <h2>Create New Books</h2>
      <form onSubmit={handleSubmit} className="create-lead-form">
        <input
          // type="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book-Title"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Author Name"
          required
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          placeholder="Price"
          required
        />
        {/* <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        >
          <option value="" disabled>Select a product</option>
          <option value="Digital Dreams">Digital Dreams</option>
          <option value="Idea Emporium">Idea Emporium</option>
          <option value="Gizmo Generation">Gizmo Generation.</option>
        </select> */}
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Book</button>
      </form>
    </div>
  );
};

export default CreateLeadPage;
