"use client";

import React, { useState, useTransition, useEffect } from "react";
import { createUser, deleteUser, getAllUsers, updateUser } from "@/lib/users/user.action";
import CreateUserForm from "./_components/createUserForm";
import EditUserForm from "./_components/editUserForm";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import SearchBar from "@/components/searchBar";
import UserTable from "./_components/userTable";
import UserPagination from "./_components/userPagination";
import { Role } from "@prisma/client";
import { User } from "@/types";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<Role | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const perPage = 12; // Define the number of items per page
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [roleFilter, searchTerm, currentPage]);

  const fetchUsers = async (page: number = 1, perPage: number = 12) => {
    try {
      startTransition(async () => {
        const response = await getAllUsers(page, perPage, { role: roleFilter }, searchTerm);

        setUsers(
          response.users.map((user) => ({
            ...user,
            username: user.username || '', 
            contactEmail: user.contactEmail || '',
            password: user.password || '',
          }))
        );
        setTotalPages(Math.ceil(response.totalUsers / perPage));
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch users.",
        });
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleCreateUser = async (data: User) => {
    const userData = {
      ...data,
      password: data.password || undefined,
    };
    try {
      await createUser(userData);
      fetchUsers();
      toast({
        variant: "default",
        title: "Success",
        description: "User created successfully.",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create user.",
        });
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleEditUser = async (userId: string, data: Partial<User>) => {
    const userData = {
      ...data,
      password: data.password || undefined,
    };
    try {
      await updateUser(userId, userData);
      fetchUsers();
      toast({
        variant: "default",
        title: "Success",
        description: "User updated successfully.",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update user.",
        });
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      fetchUsers();
      toast({
        variant: "default",
        title: "Success",
        description: "User deleted successfully.",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete user.",
        });
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleFilter = (filters: string[]) => {
    const selectedRole = filters.find((filter) => filter !== "All categories") as Role;
    setRoleFilter(selectedRole || undefined);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1 className="flex text-xl text-center font-bold justify-center mb-8">User Management</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <SearchBar
        placeholder="Search users..."
        dropdownItems={["All categories", "USER", "ADMIN"]}
        onSearch={setSearchTerm}
        onFilter={handleFilter}
        filterTitle="Role"
        filterItems={["USER", "ADMIN"]}
        debounceDelay={300}
        suggestions={users.map((user) => user.email)}
      />

      <CreateUserForm onSubmit={handleCreateUser} />

      {users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <>
          {/* Pass currentPage and perPage to UserTable */}
          <UserTable users={users} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} currentPage={currentPage} perPage={perPage} />
          <UserPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </>
      )}

      <Toaster />
    </div>
  );
};

export default UsersPage;
