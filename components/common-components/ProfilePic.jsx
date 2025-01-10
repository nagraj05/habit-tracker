"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CustomTooltip from "./CustomTooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  LogOut,
  User,
  Settings,
  Palette,
  Archive,
  FileDown,
  Sheet,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfilePic() {
  const navigate = useRouter();

  const handleLogout = () => {
    navigate.push("/");
    toast.success("Logged out successfully");
  };
  return (
    <DropdownMenu>
      <CustomTooltip content="User profile">
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 border border-white dark:border-black cursor-pointer hover:opacity-80">
          <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
      </CustomTooltip>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>General</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Palette className="mr-2 h-4 w-4" />
          <span>Theme</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Archive className="mr-2 h-4 w-4" />
          <span>Archived Habits</span>
        </DropdownMenuItem>
        <DropdownMenuSub className="cursor-pointer">
          <DropdownMenuSubTrigger>
            <FileDown className="mr-2 h-4 w-4" />
            <span>Export Data</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem className="cursor-pointer">
                <Sheet className="mr-2 h-4 w-4" />
                <span>CSV</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                <span>PDF</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate.push("/settings")} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
