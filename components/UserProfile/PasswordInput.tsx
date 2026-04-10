"use client";
import { useState } from "react";

interface Props {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (val: string) => void;
}

export function PasswordInput({ id, label, value, placeholder, onChange }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm text-gray-500">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
          required
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}