import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
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

const Modal = ({
  isOpen,
  onClose,
  title,
  cards,
  colors,
  onColorSelect,
  onCardSelect,
  onConfirm,
}) => {
  if (colors) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <div className="grid grid-cols-5 gap-4 my-4">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-lg cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => onColorSelect(color)}
              />
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <div className="mt-1 space-y-4">
          {cards?.map((card, index) => (
            <Card
              key={index}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onCardSelect?.(card)}
            >
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                {card.description && (
                  <CardDescription>{card.description}</CardDescription>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
