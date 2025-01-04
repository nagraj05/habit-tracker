"use client";
import React from "react";
import { ModeToggle } from "./theme-toggle";
import ProfilePic from "./ProfilePic";

export default function Header({ title, buttonName = [] }) {
  return (
    <div className="h-16 bg-gray-200 dark:bg-gray-800 flex justify-between items-center px-4">
      <h1 className="text-lg font-bold tracking-tight dark:text-white">
        {title}
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">{buttonName}</div>
        <ModeToggle />
        <ProfilePic />
      </div>
    </div>
  );
}
