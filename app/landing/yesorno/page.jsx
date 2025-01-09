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
import { observer } from "mobx-react-lite";
import { useStore } from "@/utils/StroreProvider";

const YesOrNo = observer(() => {
  const store = useStore().YesOrNoStore;

  const SelectedIconComponent = store.selectedIcon.icon;

  const isCategorySelected = (category) => {
    return store.categories.some((c) => c.name === category.name);
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
          <Input
            placeholder="e.g. Exercise"
            type="text"
            className="w-56"
            value={store.name}
            onChange={(e) => store.setField("name", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Question</Label>
          <Input
            placeholder="e.g. Did you exercise today?"
            type="text"
            className="w-56"
            value={store.question}
            onChange={(e) => store.setField("question", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Notes</Label>
          <Textarea
            placeholder="(Optional)"
            type="text"
            className="w-56"
            value={store.notes}
            onChange={(e) => store.setField("notes", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Categories</Label>
          <div
            className="w-56 min-h-10 p-2 border rounded-md cursor-pointer flex flex-wrap gap-2"
            onClick={() => store.setField("isDrawerOpen", true)}
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
          <Label className="w-28">Icons</Label>
          <div
            className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform flex items-center justify-center border border-black dark:border-white"
            onClick={() => store.setField("isIconModalOpen", true)}
          >
            <SelectedIconComponent className="w-5 h-5 text-black dark:text-white" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-28">Color</Label>
          <div
            className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => store.setField("isColorModalOpen", true)}
            style={{ backgroundColor: store.selectedColor }}
          />
        </div>
      </div>

      <Modal
        isOpen={store.isColorModalOpen}
        onClose={() => store.closeColorModal()}
        title="Select Color"
        colors={colors}
        onColorSelect={(color) => {
          store.setField("selectedColor", color);
          store.closeColorModal();
        }}
      />

      <Modal
        isOpen={store.isIconModalOpen}
        onClose={() => store.closeIconModal()}
        title="Select Icon"
        icons={icons}
        onIconSelect={(icon) => {
          store.setField("selectedIcon", icon);
          store.closeIconModal();
        }}
      />

      <Drawer
        open={store.isDrawerOpen}
        onOpenChange={(open) => store.setField("isDrawerOpen", open)}
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

export default YesOrNo;
