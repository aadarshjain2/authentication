import { connectDB } from "@/lib/mongodb";
import { loginSchema } from "@/validators/auth.validator";
import { authService } from "@/services/auth.service";
import { ApiResponse } from "@/utils/apiResponse";
import { AppError } from "@/errors/AppError";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { email, password } = loginSchema.parse(body);
  // console.log("email", email)
  // console.log("password", password)
    const token = await authService.login(email, password);

    const response = ApiResponse.success({
      message: "Login successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: any) {
    if (error instanceof AppError) {
      return ApiResponse.error(error.message, error.statusCode);
    }

    return ApiResponse.error("Internal server error", 500);
  }
}