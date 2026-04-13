import crypto from "crypto";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { token, password } = await req.json();

    if (!token || !password) {
      return Response.json(
        { error: "Token and password required" },
        { status: 400 }
      );
    }

    
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return Response.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;


    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return Response.json({
      message: "Password reset successful",
    });
  } catch (error) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}