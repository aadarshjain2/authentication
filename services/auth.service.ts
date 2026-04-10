import { userRepository } from "@/repositories/user.repository";
import { passwordUtils } from "@/utils/password";
import { jwtUtils } from "@/utils/jwt";
import { AppError } from "@/errors/AppError";
import { AUTH_MESSAGES } from "@/constants/message";

export const authService = {
  async login(email: string, password: string) {
  
    const user = await userRepository.findByEmail(email);
    console.log("user", user)
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

};