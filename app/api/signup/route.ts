import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/libs/mongodb";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  return NextResponse.json({ message: "User created", user });
}