"use client"
import Header from "@/components/common-components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Modal from "@/components/common-components/Modal";
import {Textarea} from "@/components/ui/textarea";

const colors = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Sage
  "#FFEEAD", // Yellow
  "#D4A5A5", // Pink
  "#9B59B6", // Purple
  "#3498DB", // Bright Blue
  "#E67E22", // Orange
  "#2ECC71", // Green
  "#F1C40F", // Golden
  "#E74C3C", // Crimson
  "#1ABC9C", // Turquoise
  "#34495E", // Navy
  "#95A5A6", // Gray
];

export default function YesOrNo() {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setIsColorModalOpen(false);
  };

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
      <div className="m-4 flex flex-col gap-4 space-y-4">
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
    </div>
  );
}
