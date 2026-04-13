import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { signupSchema } from "@/validators/auth.validator";
import { authService } from "@/services/auth.service";
import { ApiResponse } from "@/utils/apiResponse";


export async function POST(req: Request) {
  try {
    await connectDB();

     const body = await req.json();

const { name, email, password } = signupSchema.parse(body);
const user = await authService.signup(name, email, password);


    return ApiResponse.success(
      {
        message: "User created successfully",
        user: user,
      },
    );
  } catch (error) {
    console.error("Signup error:", error);

    return ApiResponse.error("Internal server error", 500);
  }
}