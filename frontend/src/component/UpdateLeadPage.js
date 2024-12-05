import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateLeadPage.css'; // Import CSS for styling

const UpdateLeadPage = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [title, settitle] = useState('');
  const [name, setName] = useState('');
  const [price, setprice] = useState('');
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/leads/getSpecificLead/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const leadData = response.data.leads;
        setLead(leadData);
        settitle(leadData.title);
        setName(leadData.name);
        setprice(leadData.price);
       
      } catch (err) {
        setError('Failed to fetch lead details');
        console.error(err);
      }
    };

    fetchLead();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve token from local storage

   
try {
      await axios.put(`http://localhost:5000/api/leads/update/${id}`, { title, name, price }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Update lead successfully")
      navigate(`/home`); // Redirect to home page or other relevant page
    } catch (err) {
      setError('Failed to update lead');
      console.error(err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="update-lead-container">
      <h2>Update Book</h2>
      {lead && (
        <form onSubmit={handleSubmit} className="update-lead-form">
          <input
            type="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="title"
            required
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            placeholder="price"
            required
          />
        
          {error && <p className="error">{error}</p>}
          <button type="submit">Update Book</button>
        </form>
      )}
    </div>
  );
};

export default UpdateLeadPage;
