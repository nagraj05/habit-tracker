"use client";
import Header from "@/components/common-components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Modal from "@/components/common-components/Modal";
import { Textarea } from "@/components/ui/textarea";
import icons from "@/lib/icons";
import colors from "@/lib/colors"


export default function YesOrNo() {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setIsColorModalOpen(false);
  };

  const SelectedIconComponent = selectedIcon.icon;

  return (
    <div>
      <Header
        title="Create Habit"
        buttonName={[
          <Button key="cancel" variant="outline" onClick={() => history.back()}>
            Cancel
          </Button>,
          <Button key="save">Save</Button>,
        ]}
      />
      <div className="m-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Label className="w-28">Name</Label>
          <Input placeholder="e.g. Exercise" type="text" className="w-56" />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Question</Label>
          <Input
            placeholder="e.g. Did you exercise today?"
            type="text"
            className="w-56"
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Notes</Label>
          <Textarea placeholder="(Optional)" type="text" className="w-56" />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Icons</Label>
          <div
            className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform flex items-center justify-center border border-black dark:border-white"
            onClick={() => setIsIconModalOpen(true)}
            // style={{ backgroundColor: selectedColor }}
          >
            <SelectedIconComponent className="w-5 h-5 text-black dark:text-white" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Color</Label>
          <div
            className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setIsColorModalOpen(true)}
            style={{ backgroundColor: selectedColor }}
          />
        </div>
      </div>

      <Modal
        isOpen={isColorModalOpen}
        onClose={() => setIsColorModalOpen(false)}
        title="Select Color"
        colors={colors}
        onColorSelect={handleColorSelect}
      />

      <Modal
        isOpen={isIconModalOpen}
        onClose={() => setIsIconModalOpen(false)}
        title="Select Icon"
        icons={icons}
        onIconSelect={(icon) => {
          setSelectedIcon(icon);
          setIsIconModalOpen(false);
        }}
      />
    </div>
  );
}
