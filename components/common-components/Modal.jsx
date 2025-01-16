import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Modal = ({
  isOpen,
  onClose,
  title,
  cards,
  colors,
  icons,
  onIconSelect,
  onColorSelect,
  onCardSelect,
  onConfirm,
}) => {
  const router = useRouter();

  if (colors) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
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
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (icons) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-5 gap-4 my-4">
            {icons.map((icon, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-lg cursor-pointer hover:scale-110 transition-transform"
                onClick={() => onIconSelect(icon)}
              >
                <icon.icon />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-1 space-y-4">
          {cards?.map((card, index) => (
            <Card
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => router.push(card.url)}
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
        <DialogFooter>
          {/* <Button onClick={onConfirm}>Confirm</Button> */}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
