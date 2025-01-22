"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/common-components/Header";
import Modal from "@/components/common-components/Modal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import HabitTracker from "@/components/common-components/HabitTracker";
import {
  Home,
  User,
  Settings,
  Bell,
  Calendar,
  Dumbbell,
  Apple,
  Banana,
  Pizza,
  Bed,
  IceCreamBowl,
  Heart,
  Star,
  Martini,
  Coffee,
} from "lucide-react";

const icons = {
  Home: Home,
  User: User,
  Settings: Settings,
  Bell: Bell,
  Calendar: Calendar,
  Dumbbell: Dumbbell,
  Apple: Apple,
  Banana: Banana,
  Pizza: Pizza,
  Bed: Bed,
  IceCreamBowl: IceCreamBowl,
  Heart: Heart,
  Star: Star,
  Martini: Martini,
  Coffee: Coffee,
};

export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const habitCards = [
    {
      title: "Yes or No",
      description:
        "e.g. Did you wake up early today? Did you exercise? Did you play chess?",
      url: "landing/yesorno",
    },
    {
      title: "Measurable",
      description:
        "e.g. How many kilometers did you walk? How many pages did you read?",
      url: "landing/measurable",
    },
  ];

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleConfirm = () => {
    router.push("/landing/measurable");
  };

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userEmail = user?.email;

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get(`/api/habits`, {
          params: { email: userEmail },
        });
        setHabits(response.data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div>
      <Header
        title={"Habit Tracker"}
        buttonName={[
          <Button variant="outline" onClick={handleModal} key={"add"}>
            Add
          </Button>,
        ]}
      />
      <div className=" h-96">
        {!loading && habits.length > 0 && <HabitTracker habits={habits} />}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleModal}
        title="Add Habit"
        cards={habitCards}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
