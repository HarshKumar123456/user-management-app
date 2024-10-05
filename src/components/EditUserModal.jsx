import React, { useState } from 'react';
import axios from 'axios';

const EditUserModal = ({ user, updateUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: {
      street: user.address.street,
      city: user.address.city,
    },
    company: user.company.name,
    website: user.website,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name || formData.name.length < 3) {
      formErrors.name = 'Name is required and must be at least 3 characters.';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is required and must be a valid email address.';
    }
    if (!formData.phone) {
      formErrors.phone = 'Phone number is required.';
    }
    if (!formData.address.street || !formData.address.city) {
      formErrors.address = 'Both street and city are required.';
    }
    return formErrors;
  };

  const handleUpdateUser = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const updatedUser = {
      ...user,
      ...formData,
      address: {
        ...formData.address,
      },
    };

    axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, updatedUser)
      .then((response) => {
        console.log(response);
        
        updateUser(response.data);
        setIsOpen(false);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        alert("Some error occured while updating user.");
      });
  };

  return (
    <>
      <button className="bg-yellow-500 text-white px-4 py-2 rounded mx-1" onClick={() => setIsOpen(true)}>Edit</button>
      {isOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto z-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md max-h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  className="border rounded w-full py-2 px-3"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Phone:</label>
                <input
                  type="tel"
                  className="border rounded w-full py-2 px-3"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Street:</label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3"
                  value={formData.address.street}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-gray-700">City:</label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3"
                  value={formData.address.city}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Company Name (Optional):</label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-700">Website (Optional):</label>
                <input
                  type="url"
                  className="border rounded w-full py-2 px-3"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleUpdateUser}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUserModal;
