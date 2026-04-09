import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/libs/mongodb";

export async function POST(req: Request) {
  await connectDB();

  const { token, password } = await req.json();

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  const hashed = await bcrypt.hash(password, 10);

  user.password = hashed;
  user.resetToken = null;

  await user.save();

  return Response.json({ message: "Password reset successful" });
}