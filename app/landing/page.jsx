"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/common-components/Header";
import Modal from "@/components/common-components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { format, startOfWeek, addDays } from "date-fns";

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [habits, setHabits] = useState([]);
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

  useEffect(() => {
    // Load habits from localStorage
    const loadHabits = () => {
      try {
        const yesNoHabits = JSON.parse(
          localStorage.getItem("yesNoHabits") || "[]"
        );
        const measurableHabits = JSON.parse(
          localStorage.getItem("measurableHabits") || "[]"
        );

        // The habits should already have the correct structure now
        setHabits([...yesNoHabits, ...measurableHabits]);
      } catch (error) {
        console.error("Error loading habits:", error);
        setHabits([]);
      }
    };

    loadHabits();
    // Add event listener for storage changes
    window.addEventListener("storage", loadHabits);
    return () => window.removeEventListener("storage", loadHabits);
  }, []);

  const getDaysOfWeek = () => {
    const start = startOfWeek(new Date());
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleConfirm = () => {
    router.push("/landing/measurable");
  };

  console.log(habits);

  return (
    <div>
      <Header
        title="Habit Tracker"
        buttonName={[
          <Button variant="outline" onClick={handleModal} key="add">
            Add
          </Button>,
        ]}
      />

      {habits.length === 0 ? (
        <div className="flex flex-col justify-center gap-4 items-center h-96">
          <h3 className="text-6xl text-gray-500">No habits to show</h3>
          <h6 className="text-xl text-gray-700">
            Click on Add to track your habit
          </h6>
        </div>
      ) : (
        <div className="p-4">
          {/* Calendar Header */}
          <div className="flex justify-end">
            <div className="mb-1 border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-500 w-[75%]">
              <div className="grid grid-cols-7 gap-4">
                {getDaysOfWeek().map((date, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-semibold">
                      {format(date, "EEE")}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-white">
                      {format(date, "d")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Habits List */}
          <div className="space-y-4">
            {habits.map((habit, index) => (
              <div
                key={index}
                className="border rounded-lg px-2 py-4 flex items-center"
              >
                <div className="w-1/4">
                  <span
                    className="font-medium"
                    style={{
                      color: habit.color || "inherit",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {habit.name}
                  </span>
                </div>
                <div className="flex-1 grid grid-cols-7 gap-2">
                  {getDaysOfWeek().map((date, dayIndex) => (
                    <div key={dayIndex} className="flex justify-center">
                      {habit.type === "yesNo" ? (
                        <Checkbox className="h-6 w-6" />
                      ) : (
                        <Input
                          type="number"
                          className="w-16 h-8 text-center"
                          placeholder="0"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={handleModal}
        title="Add Habit"
        cards={habitCards}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Landing;
