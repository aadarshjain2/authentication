import bcrypt from "bcryptjs";

export const passwordUtils = {
  async hash(password: string) {
    return bcrypt.hash(password, 10);
  },

  async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  },
};