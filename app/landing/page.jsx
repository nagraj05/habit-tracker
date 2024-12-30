"use client"
import Header from '@/components/common-components/Header';
import Modal from '@/components/common-components/Modal';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const habitCards = [
    {
      title: "Yes or No",
      description:
        "e.g. Did you wake up early today? Did you exercise? Did you play chess?",
    },
    {
      title: "Measurable",
      description:
        "e.g. How many kilometers did you walk? How many pages did you read?",
    },
  ];

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleConfirm = () => {
    router.push("/landing/createHabit");
  }

  return (
    <div>
      <Header title={"Habit Tracker"}
        buttonName={[
          <Button variant="outline" onClick={handleModal} key={"add"}>
            Add
        </Button>
      ]}
      />
      list
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
