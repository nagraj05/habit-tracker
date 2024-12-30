import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const Modal = ({ isOpen, onClose, title, cards }) => {
  const router = useRouter();
  const handleComfirm = () => {
    router.push("/landing/createHabit");
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <div className="mt-1 space-y-4">
          {cards.map((card, index) => (
            <Card key={index} className="hover:bg-gray-50 cursor-pointer">
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleComfirm}>Confirm</AlertDialogAction>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
