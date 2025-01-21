"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CustomTooltip from "./CustomTooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { toast } from "sonner";
import { useStore } from "@/utils/StroreProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePic() {
  const store = useStore().AuthStore;
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name);
    }
  }, []);

  const handleLogout = async () => {
    const success = await store.logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <DropdownMenu>
      <CustomTooltip content="User profile">
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10 border border-white dark:border-black cursor-pointer hover:opacity-80">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>
              {userName ? userName.slice(0, 2).toUpperCase() : ""}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      </CustomTooltip>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>{userName}</DropdownMenuLabel>
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">
            <FileDown className="mr-2 h-4 w-4" />
            <span>Export Data</span>
          </DropdownMenuSubTrigger>
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
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <Link href="/profile" passHref>
          <DropdownMenuItem asChild>
            <span className="cursor-pointer flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </span>
          </DropdownMenuItem>
        </Link>
        <Link href="/settings" passHref>
          <DropdownMenuItem asChild>
            <span className="cursor-pointer flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
