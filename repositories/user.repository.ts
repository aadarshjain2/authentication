import User from "@/models/User";

export const userRepository = {
  async findByEmail(email: string) {
    return User.findOne({ email });
  },

 async findById(id: string) {
  return User.findById(id);
}
,
    async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return User.create(data);
  },

  async findByResetToken(token: string) {
  return User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });
}
};