import React from 'react';
import { format, startOfWeek, addDays, isToday } from 'date-fns';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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

const HabitTracker = ({ habits }) => {
  // Generate array of 7 days starting from current week
  const startDate = startOfWeek(new Date());
  const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <div className="w-full mt-3">
      {/* Scrollable container */}
      {/* <div className="overflow-x-auto"> */}
        <div >
          {/* Date header */}
          <div className="grid grid-cols-[700px_repeat(7,100px)] gap-4 mb-4 ml-6">
            <div className="text-md font-medium text-gray-500"></div>
            {days.map((day) => (
              <div
                key={day.toString()}
                className={`text-center ${
                  isToday(day) 
                    ? 'bg-primary text-primary-foreground rounded-lg p-2' 
                    : 'text-gray-500 p-2'
                }`}
              >
                <div className="text-md font-bold">
                  {format(day, 'EEE')}
                </div>
                <div className="text-md font-semibold">
                  {format(day, 'd MMM')}
                </div>
              </div>
            ))}
          </div>

          {/* Habits grid */}
          <div className="space-y-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="grid grid-cols-[700px_repeat(7,100px)] gap-4 items-center ml-6"
              >
                {/* Habit name with icon */}
                <div className="flex items-center gap-2">
                  {habit.iconName && (
                    <div style={{ color: habit.colorHex }}>
                      {React.createElement(icons[habit.iconName], { size: 20 })}
                    </div>
                  )}
                  <span className="font-medium" style={{ color: habit.colorHex }}>
                    {habit.name}
                  </span>
                </div>

                {/* Render 7 inputs/checkboxes */}
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={index} className="flex justify-center">
                    {habit.type === 'YES_NO' ? (
                      <Checkbox className="w-6 h-6" />
                    ) : (
                      <Input
                        type="number"
                        className="w-14 text-center"
                        placeholder={habit.unit}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default HabitTracker;