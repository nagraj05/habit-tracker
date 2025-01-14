"use client";
import Header from "@/components/common-components/Header";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(
    "/assets/profilepics/uifaces-cartoon-image (1).jpg"
  );
  const { name, email, id } = JSON.parse(localStorage.getItem('user'));

  const avatars = Array.from(
    { length: 30 },
    (_, i) => `/assets/profilepics/uifaces-cartoon-image (${i + 1}).jpg`
  );

  return (
    <div>
      <Header title="Profile" />
      <div className="m-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Label className="w-28">Avatar</Label>
          <Avatar
            className="h-16 w-16 cursor-pointer hover:opacity-80 border"
            onClick={() => setIsAvatarModalOpen(true)}
          >
            <AvatarImage src={selectedAvatar} />
          </Avatar>
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Name</Label>
          <Input
           value={name}
           className="w-56"
           readOnly
           />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Email</Label>
          <Input
           value={email}
           className="w-56"
           readOnly
           />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">ID</Label>
          <Input
           value={id}
           className="w-56"
           readOnly
           />
        </div>
      </div>

      <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
        <DialogContent className="max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Select Avatar</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-4 gap-4 p-4">
              {avatars.map((avatar, index) => (
                <Avatar
                  key={index}
                  className="h-16 w-16 cursor-pointer hover:opacity-80 border transition-transform hover:scale-105"
                  onClick={() => {
                    setSelectedAvatar(avatar);
                    setIsAvatarModalOpen(false);
                  }}
                >
                  <AvatarImage src={avatar} />
                </Avatar>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
