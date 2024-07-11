import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddConsultingCallForm from "./AddConsultingCallForm";

const AddConsultingCallModal = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>+ Add New Call</DialogTrigger>
        <DialogContent className=" border-none">
          <DialogHeader>
            <DialogTitle>Add New Call</DialogTitle>
            <DialogDescription>
              <AddConsultingCallForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddConsultingCallModal;
