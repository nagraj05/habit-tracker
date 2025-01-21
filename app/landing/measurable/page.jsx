"use client";
import Header from "@/components/common-components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Modal from "@/components/common-components/Modal";
import { Textarea } from "@/components/ui/textarea";
import colors from "@/lib/colors";
import icons from "@/lib/icons";
import { observer } from "mobx-react-lite";
import categories from "@/lib/categories";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/utils/StroreProvider";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";

const Measurable = observer(() => {
  const store = useStore().MeasurableStore;
  const router = useRouter();

  const SelectedIconComponent = store.selectedIcon.icon;

  const isCategorySelected = (category) => {
    return store.categories.some((c) => c.name === category.name);
  };

  const handleSave = async () => {
    const success = await store.saveHabit();
    if (success) {
      router.push("/landing");
    } else {
      toast.error("An error occurred. Please check your input and try again.");
    }
  };

  return (
    <div>
      <Header
        title="Create Habit"
        buttonName={[
          <Button key="cancel" variant="outline" onClick={() => history.back()}>
            Cancel
          </Button>,
          <Button key="save" onClick={handleSave}>
            Save
          </Button>,
        ]}
      />
      <div className="m-4 flex flex-col gap-4 ">
        <div className="flex items-center gap-3">
          <Label className="w-28">Name</Label>
          <Input
            placeholder="e.g. Run"
            type="text"
            className="w-56"
            value={store.name}
            onChange={(e) => store.setData("name", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Question</Label>
          <Input
            placeholder="e.g. How many kilometers did you today?"
            type="text"
            className="w-56"
            value={store.question}
            onChange={(e) => store.setData("question", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Unit</Label>
          <Input
            placeholder="e.g. Kilometers"
            type="text"
            className="w-56"
            value={store.unit}
            onChange={(e) => store.setData("unit", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Target</Label>
          <Input
            placeholder="e.g. 15"
            type="text"
            className="w-56"
            value={store.target}
            onChange={(e) => store.setData("target", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Notes</Label>
          <Textarea
            placeholder="(Optional)"
            type="text"
            className="w-56"
            value={store.notes}
            onChange={(e) => store.setData("notes", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Categories</Label>
          <div
            className="w-56 min-h-10 p-2 border rounded-md cursor-pointer flex flex-wrap gap-2"
            onClick={() => store.setData("isDrawerOpen", true)}
          >
            {store.categories.length === 0 ? (
              <span className="text-gray-500">None</span>
            ) : (
              store.categories.map((category) => {
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
          <Label className="w-28">Icon</Label>
          <div
            className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform flex items-center justify-center border border-black dark:border-white"
            onClick={() => store.setData("isIconModalOpen", true)}
          >
            <SelectedIconComponent className="w-5 h-5 text-black dark:text-white" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Color</Label>
          <div
            className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => store.setData("isColorModalOpen", true)}
            style={{ backgroundColor: store.selectedColor }}
          />
        </div>
      </div>

      <Modal
        isOpen={store.isColorModalOpen}
        onClose={() => store.closeColorModal(false)}
        title="Select Color"
        colors={colors}
        onColorSelect={(color) => {
          store.setData("selectedColor", color);
          store.closeColorModal();
        }}
      />
      <Modal
        isOpen={store.isIconModalOpen}
        onClose={() => store.closeIconModal()}
        title="Select Icon"
        icons={icons}
        onIconSelect={(icon) => {
          store.setData("selectedIcon", icon);
          store.closeIconModal();
        }}
      />
      <Drawer
        open={store.isDrawerOpen}
        onOpenChange={(open) => store.setData("isDrawerOpen", open)}
      >
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
                  variant={isCategorySelected(category) ? "default" : "outline"}
                  className="cursor-pointer p-2 flex gap-2"
                  onClick={() => store.toggleCategory(category)}
                >
                  <CategoryIcon className="w-4 h-4" />
                  {category.name}
                </Badge>
              );
            })}
          </div>
          <DrawerFooter>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => store.closeDrawer()}>Save</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
});

export default Measurable;
