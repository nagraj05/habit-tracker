"use client";
import React from "react";

export default function Header({ title, buttonName = [] }) {
  return (
    <div className="h-16 bg-gray-200 flex justify-between items-center px-4">
      <h1 className="text-lg font-bold tracking-tight">{title}</h1>
      <div>
        <div className="flex gap-2">{buttonName}</div>
      </div>
    </div>
  );
}
