import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateUserModal = ({ addUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: {
      street: '',
      city: '',
    },
    company: '',
    website: '',
  });
  const [errors, setErrors] = useState({});

  // Automatically generate the username based on the name
  useEffect(() => {
    if (formData.name) {
      const formattedUsername = `USER-${formData.name.toLowerCase().replace(/\s+/g, '')}`;
      setFormData((prevData) => ({ ...prevData, username: formattedUsername }));
    }
  }, [formData.name]);

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name || formData.name.length < 3) {
      formErrors.name = 'Name is required and must be at least 3 characters.';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is required and must be a valid email address.';
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = 'Phone number is required and must be 10 digits.';
    }
    if (!formData.address.street || !formData.address.city) {
      formErrors.address = 'Both street and city are required.';
    }
    if (formData.company && formData.company.length < 3) {
      formErrors.company = 'Company name must be at least 3 characters.';
    }
    if (formData.website && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.website)) {
      formErrors.website = 'Website must be a valid URL.';
    }
    return formErrors;
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const userData = {
      ...formData,
      id: Date.now(),
    };

    axios.post('https://jsonplaceholder.typicode.com/users', userData)
      .then((response) => {
        addUser(response.data);
        setIsOpen(false);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        alert("Some error occured while creating user.");
      });
  };

  return (
    <>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsOpen(true)}>Add User</button>
      {isOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto z-50">
          <div className="h-fit overflow-y-auto bg-white p-8 rounded-lg shadow-md w-full max-w-md max-h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Create User</h2>
            <form className="space-y-4" onSubmit={handleCreateUser}>
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
                <label className="block text-gray-700">Username:</label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3 bg-gray-200"
                  value={formData.username}
                  readOnly
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Address:</label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Street"
                  value={formData.address.street}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                />
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3 mt-2"
                  placeholder="City"
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
                {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Website (Optional):</label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
                {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
              </div>

              <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Create</button>
                <button className="ml-2 bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUserModal;
