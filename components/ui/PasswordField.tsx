import { Eye, EyeOff, Lock } from "lucide-react";
import { PasswordFieldProps } from "@/components/types/form.types";

const PasswordField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  onTogglePassword,
}: PasswordFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id}>{label}</label>

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full h-11 pl-10 pr-10"
        />

        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;