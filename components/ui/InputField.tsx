import { InputFieldProps } from "@/components/types/form.types";

const InputField = ({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
  className = "",
}: InputFieldProps) => {
  return (
    
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full h-11 pl-10 pr-3 rounded-md border border-input bg-background ${className}`} />
      </div>
    </div>
  );
};

export default InputField;