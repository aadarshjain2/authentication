import User from "@/models/User";

export const userRepository = {
  async findByEmail(email: string) {
    return User.findOne({ email });
  },

    async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return User.create(data);
  },

};