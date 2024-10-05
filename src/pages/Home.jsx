import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import CreateUserModal from '../components/CreateUserModal';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users'));

    if (savedUsers && savedUsers.length > 0) {
      setUsers(savedUsers);
      setLoading(false);
    } else {
      // Fallback to API call if localStorage is empty
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          setUsers(response.data);
          localStorage.setItem('users', JSON.stringify(response.data)); // Save API response to localStorage
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
          setLoading(false);
          alert("Some error occured while getting users.");
        });
    }
  }, []);

  const updateLocalStorage = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const addUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    updateLocalStorage(updatedUsers);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    updateLocalStorage(updatedUsers);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    console.log("After deletion we got array update: ");
    console.log(updatedUsers);


    updateLocalStorage(updatedUsers);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">User Management Application | <a className='underline underline-offset-2' href="http://portfolio-harsh-kumar.vercel.app/">
        Harsh Kumar
      </a>
      </h1>
      <p className="text-xl mb-4">Click on User's Name to view details.</p>

      <CreateUserModal addUser={addUser} />
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <UserTable users={users} updateUser={updateUser} deleteUser={deleteUser} />
      )}
    </div>
  );
};

export default Home;
