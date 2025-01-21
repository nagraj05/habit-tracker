import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      name,
      type,
      question,
      unit,
      target,
      notes,
      iconName,
      colorHex,
      categories,
      userEmail,
    } = data;

    if (!userEmail || userEmail.trim() === "") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const habit = await prisma.habit.create({
      data: {
        name,
        type,
        question,
        unit: unit || null,
        target: target ? parseFloat(target) : null,
        notes,
        iconName,
        colorHex,
        categories,
        userId: user.id,
      },
    });

    return NextResponse.json(habit);
  } catch (error) {
    console.error("Failed to create habit:", error);
    return NextResponse.json(
      { error: "Failed to create habit" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("email");

    if (!userEmail || userEmail.trim() === "") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const habits = await prisma.habit.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        type: true,
        iconName: true,
        colorHex: true,
        question: true,
        unit: true,
        target: true,
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(habits);
  } catch (error) {
    console.error("Failed to fetch habits:", error);
    return NextResponse.json(
      { error: "Failed to fetch habits" },
      { status: 500 }
    );
  }
}
