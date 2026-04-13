import { userRepository } from "@/repositories/user.repository";
import { passwordUtils } from "@/utils/password";
import { jwtUtils } from "@/utils/jwt";
import { AppError } from "@/errors/AppError";
import { AUTH_MESSAGES } from "@/constants/message";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/sendEmail";

export const authService = {
  async login(email: string, password: string) {
  
    const user = await userRepository.findByEmail(email);
    // console.log("user", user)
    if (!user) {
      throw new AppError(AUTH_MESSAGES.INVALID_CREDENTIALS, 401);
    }

    const isValid = await passwordUtils.compare(password, user.password);

    if (!isValid) {
      throw new AppError(AUTH_MESSAGES.INVALID_CREDENTIALS, 401);
    }

    const token = jwtUtils.sign({
      id: user._id,
      email: user.email,
    });

    return token;
  },

  async signup(name: string, email: string, password: string) {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    const hashedPassword = await passwordUtils.hash(password);

    const user = await userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const { password: _, ...safeUser } = user.toObject();

    return safeUser;
  },


    async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isMatch = await passwordUtils.compare(currentPassword, user.password);

    if (!isMatch) {
      throw new AppError("Current password incorrect", 400);
    }

    const hashedPassword = await passwordUtils.hash(newPassword);

    user.password = hashedPassword;

    await user.save();

    return { message: "Password updated successfully" };
  },



   async forgotPassword(email: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return { message: "If email exists, reset link sent" };
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

    return { message: "Reset email sent" };
  },


  

    async resetPassword(token: string, password: string) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await userRepository.findByResetToken(hashedToken);

    if (!user) {
      throw new AppError("Invalid or expired reset token", 400);
    }

    const hashedPassword = await passwordUtils.hash(password);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return { message: "Password reset successful" };
  },

};