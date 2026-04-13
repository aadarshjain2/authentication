import { connectDB } from "@/lib/mongodb";
import { resetPasswordSchema } from "@/validators/auth.validator";
import { ApiResponse } from "@/utils/apiResponse";
import { authService } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { token, password } = resetPasswordSchema.parse(body);

    const result = await authService.resetPassword(token, password);

    return ApiResponse.success(result);

  } catch (error: any) {

    if (error.statusCode) {
      return ApiResponse.error(error.message, error.statusCode);
    }

    return ApiResponse.error("Internal server error", 500);
  }
}