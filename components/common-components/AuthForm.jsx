"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Eye, UserPlus, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useStore } from "@/utils/StroreProvider";
import { observer } from "mobx-react-lite";

const AuthForm = observer(() => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const store = useStore().AuthStore;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const success = await store.signIn();
    if (success) {
      toast.success("Logged in successfully");
      router.push("/landing");
    } else {
      toast.error(store.error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await store.register();
    if (success) {
      toast.success("Registered successfully");
    } else {
      toast.error(store.error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-full mx-4">
        <CardHeader>
          <CardTitle className="text-center">Habit Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              store.resetFields(); 
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form className="space-y-4" onSubmit={handlelogin}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={store.email}
                    onChange={(e) => store.setData("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={store.password}
                    onChange={(e) => store.setData("password", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-8 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <Button type="submit" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    value={store.name}
                    onChange={(e) => store.setData("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={store.email}
                    onChange={(e) => store.setData("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Choose a password"
                    required
                    value={store.password}
                    onChange={(e) => store.setData("password", e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
});

export default AuthForm;
