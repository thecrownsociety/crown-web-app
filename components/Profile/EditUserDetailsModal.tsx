import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditUserDetailsForm from "./EditUserDetailsForm";
import { userTypes } from "@/lib/types";

const EditUserDetailsModal = ({ data }: { data: userTypes | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>+ Edit Profile</DialogTrigger>
        <DialogContent className=" border-none">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              <EditUserDetailsForm data={data} setIsOpen={setIsOpen} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUserDetailsModal;
