export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

export const validateAuthForm = (
  data: AuthFormData,
  type: "login" | "signup"
) => {
  const errors: Record<string, string> = {};

  if (type === "signup") {
    if (!data.name || data.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
  }

  // email validation
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  // password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};