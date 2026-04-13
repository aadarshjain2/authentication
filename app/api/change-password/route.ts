import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import { ApiResponse } from "@/utils/apiResponse";
import { passwordSchema } from "@/validators/auth.validator";
import { authService } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { currentPassword, newPassword } = passwordSchema.parse(body);

    const cookieHeader = req.headers.get("cookie");

    const token = cookieHeader
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const result = await authService.changePassword(
      decoded.id,
      currentPassword,
      newPassword
    );

    return ApiResponse.success(result);

  } catch (error: any) {

    if (error.statusCode) {
      return ApiResponse.error(error.message, error.statusCode);
    }

    return ApiResponse.error("Internal server error", 500);
  }
}