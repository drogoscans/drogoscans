import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditUserForm from './editUserForm';
import DeleteUserDialog from './deleteUserDialog';
import { User } from '@/types';
import { Button } from '@/components/ui/button'; // Import the Button component

interface UserTableProps {
  users: User[];
  handleEditUser: (userId: string, data: Partial<User>) => void;
  handleDeleteUser: (userId: string) => void;
  currentPage: number; // Add currentPage as a prop
  perPage: number; // Add perPage as a prop
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  handleEditUser,
  handleDeleteUser,
  currentPage,
  perPage,
}) => {
  // Calculate the starting number for the current page
  const startNumber = (currentPage - 1) * perPage;

  return (
    <Table className="w-full table-fixed">
      <TableCaption>A list of your users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No.</TableHead>
          <TableHead className="w-[150px] truncate">Username</TableHead>
          <TableHead className="w-[250px] truncate">Email</TableHead>
          <TableHead className="w-[100px] truncate">Role</TableHead>
          <TableHead className="w-[200px] truncate">Created At</TableHead>
          <TableHead className="w-[150px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{startNumber + index + 1}</TableCell>
            <TableCell className="truncate">{user.username || 'N/A'}</TableCell>
            <TableCell className="truncate">{user.email}</TableCell>
            <TableCell className="truncate">{user.role}</TableCell>
            <TableCell className="truncate">{new Date(user.createdAt).toLocaleString()}</TableCell>
            <TableCell className="flex space-x-2">
              {/* Edit User Form Dialog Trigger */}
              <EditUserForm user={user} onSubmit={(data) => handleEditUser(user.id, data)} />
              
              {/* Delete User Dialog Trigger */}
              <DeleteUserDialog
                userId={user.id}
                userEmail={user.email || user.username}
                onDelete={handleDeleteUser}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
