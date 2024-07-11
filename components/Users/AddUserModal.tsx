import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import AddUserForm from "./AddUserForm";

const AddUserModal = () => {
  return (
    <Dialog>
      <DialogTrigger>+ Add New User</DialogTrigger>
      <DialogContent className=" border-none">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            <AddUserForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
