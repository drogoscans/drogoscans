"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

const EditUserForm = ({
  user,
  onSubmit,
}: {
  user: any;
  onSubmit: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    email: user?.email || "",
    role: user?.role || Role.USER,
  });
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol dialog
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setIsOpen(false); // Tutup dialog setelah berhasil
      toast({
        variant: "default",
        title: "Success",
        description: "User updated successfully.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="default" onClick={() => setIsOpen(true)}>
          Edit User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Edit the details of the existing user.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter user's email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value={Role.USER}>{Role.USER}</option>
              <option value={Role.ADMIN}>{Role.ADMIN}</option>
            </select>
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <Button type="submit" variant="default" className="bg-blue-500 text-white">
              Save
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserForm;
