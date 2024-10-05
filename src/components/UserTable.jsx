import React from 'react';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import { Link } from 'react-router-dom';

const UserTable = ({ users, updateUser, deleteUser }) => {
  return (
    <table className="border border-2 border-red-500 table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-[#2c3e50] text-white">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index} className={`${index % 2 === 0 ? 'bg-[#16a085]' : 'bg-[#2c3e50]'}`}>
            <td className="border px-4 py-2 text-white underline underline-offset-2">
              <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </td>
            <td className="border px-4 py-2 text-white">{user.email}</td>
            <td className="border px-4 py-2">
              <EditUserModal user={user} updateUser={updateUser} />
              <DeleteUserModal userId={user.id} deleteUser={deleteUser} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
