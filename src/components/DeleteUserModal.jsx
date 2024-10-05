import React, { useState } from 'react';
import axios from 'axios';

const DeleteUserModal = ({ userId, deleteUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = () => {
    setLoading(true);
    axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        deleteUser(userId);
        setIsOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        setLoading(false);
        alert("Some error occured while deleting user.");
      });
  };

  return (
    <>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mx-1"
        onClick={() => setIsOpen(true)}
      >
        Delete
      </button>

      {isOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-6">
              <button
                className={`bg-red-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleDeleteUser}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
              <button
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUserModal;
