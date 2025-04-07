import { InputHTMLAttributes, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  borderColorClass?: string;
  focusClassName?: string;
}

export default function TextField({
  label,
  error,
  className = "",
  id,
  type = "text",
  borderColorClass = "border-gray-300",
  focusClassName = "focus:outline-1 focus:outline-blue-500 focus:border-blue-500",
  ...props
}: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm text-gray-800 
            ${focusClassName}
            disabled:bg-gray-100 disabled:text-gray-500
            ${error ? "border-red-500" : borderColorClass}
            ${isPasswordField ? "pr-10" : ""}
            ${className}
          `}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
