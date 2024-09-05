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

const DeleteUserDialog = ({
  userId,
  userEmail,
  onDelete,
}: {
  userId: number;
  userEmail: string;
  onDelete: (userId: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol dialog
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await onDelete(userId);
      setIsOpen(false); // Tutup dialog setelah berhasil
      toast({
        variant: "default",
        title: "Success",
        description: `User ${userEmail} deleted successfully.`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to delete user ${userEmail}.`,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" onClick={() => setIsOpen(true)}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the user <strong>{userEmail}</strong>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
