import { CheckboxProps } from "../types/form.types";

const Checkbox = ({ id, label, checked, onChange }: CheckboxProps) => (
  <label htmlFor={id} className="flex items-center space-x-2 cursor-pointer">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-input text-primary focus:ring-primary focus:ring-offset-background"
    />
    <span className="text-muted-foreground select-none text-sm">{label}</span>
  </label>
);

export default Checkbox;