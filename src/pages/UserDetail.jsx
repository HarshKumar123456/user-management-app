import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    const localUser = savedUsers?.find(user => user.id === Number(id));

    if (localUser) {
      setUser(localUser);
      setLoading(false);
    } else {
      // Fetch from API if not found in localStorage
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          setLoading(false);
          alert("Some error occured while getting user details.");
        });
    }
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  if (!user) return <p className="text-center text-lg">User not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <p className="mb-2">Email: {user.email}</p>
      <p className="mb-2">Phone: {user.phone}</p>
      <p className="mb-2">Address: {user.address.street}, {user.address.city}</p>
      <p className="mb-2">Company: {user.company?.name}</p>
      <p className="mb-2">Website: {user.website}</p>
    </div>
  );
};

export default UserDetail;
