import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { sendResetEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
  await connectDB();

  const { email } = await req.json();

  const user = await User.findOne({ email });

  if (!user) {
    return Response.json({
      message: "If email exists, reset link sent",
    });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

const hashedToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

user.resetPasswordToken = hashedToken;
user.resetPasswordExpire = Date.now() + 3600000;

await user.save();

const resetLink = `${process.env.APP_URL}/reset-password/${resetToken}`;
  await sendResetEmail(email, resetLink);

  return Response.json({
    message: "Reset email sent",
  });
}