import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { signupSchema } from "@/validators/auth.validator";
import { authService } from "@/services/auth.service";


export async function POST(req: Request) {
  try {
    await connectDB();

     const body = await req.json();

const { name, email, password } = signupSchema.parse(body);
const user = await authService.signup(name, email, password);


    return NextResponse.json(
      {
        message: "User created successfully",
        user: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}