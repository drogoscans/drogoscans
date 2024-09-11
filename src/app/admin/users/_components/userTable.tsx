import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import { Button } from "@/components/ui/button";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
    <Table className="min-w-full table-fixed text-center">
      <TableCaption>A list of your users.</TableCaption>
      <TableHeader >
        <TableRow >
          <TableHead className="px-2 py-3 text-center">No.</TableHead>
          <TableHead className="px-2 py-3truncate  text-center">Username</TableHead>
          <TableHead className="px-2 py-3 truncate text-center">Email</TableHead>
          <TableHead className="px-2 py-3 truncate text-center">Role</TableHead>
          <TableHead className="px-2 py-3 truncate text-center">Created At</TableHead>
          <TableHead className="px-2 py-3 truncate text-center" >Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell className="px-2 py-3">{index + 1}</TableCell>
            <TableCell className="px-2 py-3 truncate">{user.username || "N/A"}</TableCell>
            <TableCell className="px-2 py-3 truncate">{user.email}</TableCell>
            <TableCell className="px-2 py-3 truncate">{user.role}</TableCell>
            <TableCell className="px-2 py-3 truncate">
              {new Date(user.createdAt).toLocaleString()}
            </TableCell>
            <TableCell className="flex flex-col space-y-2 px-2 py-3">
              <Button >Edit</Button>
              <Button variant="destructive">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};

export default UserTable;
