'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { createUser, deleteUser, getAllUsers, updateUser } from '@/lib/users/user.action';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CreateUserForm from './_components/createUserForm';
import EditUserForm from './_components/editUserForm';
import DeleteUserDialog from './_components/deleteUserDialog'; // Import DeleteUserDialog
import { useToast } from "@/hooks/use-toast"; // Import useToast hook
import { Toaster } from '@/components/ui/toaster';

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast(); // Destructure toast from useToast

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      startTransition(async () => {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users.",
      });
    }
  };

  const handleCreateUser = async (data: any) => {
    try {
      await createUser(data);
      fetchUsers(); // Refresh user list after creation
      toast({
        variant: "default",
        title: "Success",
        description: "User created successfully.",
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create user.",
      });
    }
  };

  const handleEditUser = async (userId: number, data: any) => {
    try {
      await updateUser(userId, data);
      fetchUsers(); // Refresh user list after update
      toast({
        variant: "default",
        title: "Success",
        description: "User updated successfully.",
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user.",
      });
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      fetchUsers(); // Refresh user list after deletion
      toast({
        variant: "default",
        title: "Success",
        description: "User deleted successfully.",
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user.",
      });
    }
  };

  return (
    <div>
      <h1 className='flex text-xl text-center font-bold justify-center mb-8'>User Management</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <CreateUserForm onSubmit={handleCreateUser} />

      {users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <Table>
          <TableCaption>A list of your users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <EditUserForm user={user} onSubmit={(data) => handleEditUser(user.id, data)} />
                  <DeleteUserDialog userId={user.id} userEmail={user.email} onDelete={handleDeleteUser} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Toaster /> {/* Add the Toaster component */}
    </div>
  );
};

export default UsersPage;
