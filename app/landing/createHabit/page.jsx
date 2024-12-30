import Header from "@/components/common-components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function CreateHabit() {
  return (
    <div>
      <Header
        title={"Create Habit"}
        buttonName={[
          <Button key={"cancel"} variant="outline">
            Cancel
          </Button>,
          <Button key={"save"}>Save</Button>,
        ]}
      />
      <div className="m-4 flex flex-col gap-4 sapce-y-4">
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
          <Input placeholder="(Optional)" type="text" className="w-56" />
        </div>
      </div>
    </div>
  );
}
