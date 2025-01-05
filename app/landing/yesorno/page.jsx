"use client";
import Header from "@/components/common-components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import Modal from "@/components/common-components/Modal";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import icons from "@/lib/icons";
import colors from "@/lib/colors";
import categories from "@/lib/categories";
import CustomTooltip from "@/components/common-components/CustomTooltip";

export default function YesOrNo() {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setIsColorModalOpen(false);
  };

  const SelectedIconComponent = selectedIcon.icon;

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSaveCategories = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <Header
        title="Create Habit"
        buttonName={[
          <CustomTooltip content={"Cancel the form"} key="cancel">
            <Button
              key="cancel"
              variant="outline"
              onClick={() => history.back()}
            >
              Cancel
            </Button>
          </CustomTooltip>,
          <CustomTooltip content={"Save the form"} key="save">
            <Button key="save">Save</Button>
          </CustomTooltip>,
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
          <Label className="w-28">Categories</Label>
          <div
            className="w-56 min-h-10 p-2 border rounded-md cursor-pointer flex flex-wrap gap-2"
            onClick={() => setIsDrawerOpen(true)}
          >
            {selectedCategories.length === 0 ? (
              <span className="text-gray-500">None</span>
            ) : (
              selectedCategories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <Badge
                    key={category.name}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <CategoryIcon className="w-3 h-3" />
                    {category.name}
                  </Badge>
                );
              })
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Icons</Label>
          <div
            className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform flex items-center justify-center border border-black dark:border-white"
            onClick={() => setIsIconModalOpen(true)}
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

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Categories</DrawerTitle>
            <DrawerDescription>
              Pick one or multiple categories that your habits fit in
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 flex flex-wrap gap-2 w-1/2">
            {categories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <Badge
                  key={category.name}
                  variant={
                    selectedCategories.includes(category)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer p-2 flex gap-2"
                  onClick={() => handleCategoryToggle(category)}
                >
                  <CategoryIcon className="w-4 h-4" />
                  {category.name}
                </Badge>
              );
            })}
          </div>
          <DrawerFooter>
            <div className="flex gap-2 justify-center">
              <Button onClick={handleSaveCategories}>Save</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
