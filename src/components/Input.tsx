import { useState, useId } from "react";

interface InputProps {
  type?: "text" | "email" | "password";
  placeholder?: string;
  icon?: React.ReactNode;
  name?: string;
  id?: string;
  value?: string; // <-- Agrega esto
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // <-- Y esto
  disabled?: boolean; // <-- Y esto si quieres controlar disabled
  autoFocus?: boolean; // <-- Y esto si lo usas
}

const Input = ({
  type = "text",
  placeholder = "Correo electrónico",
  icon,
  name = "email",
  id,
  value,
  onChange,
  disabled,
  autoFocus,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const autoId = useId();
  const inputId = id || autoId;

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E7191] flex items-center">
          {icon}
        </span>
      )}
      <input
        placeholder={placeholder}
        className={`w-full py-4 px-5 sm:py-4 sm:px-5 mt-2 bg-[#EFF0F6] rounded-[1rem] border-0 text-zinc-800 text-base placeholder:text-[0.9rem] shadow-md placeholder-[#6E7191] focus:outline-none focus:ring-2 focus:ring-primary transition ${
          icon ? "pl-12" : ""
        } ${isPassword ? "pr-12" : ""} `}
        name={name}
        id={inputId}
        type={inputType}
        autoComplete={isPassword ? "current-password" : undefined}
        value={value} // <-- Añade esto
        onChange={onChange} // <-- Y esto
        disabled={disabled} // <-- Y esto
        autoFocus={autoFocus} // <-- Y esto
      />
      {isPassword && (
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-4 top-[55%] -translate-y-1/2 text-[#6E7191] flex items-center justify-center h-8 w-8 focus:outline-none"
          onClick={() => setShowPassword((v) => !v)}
        >
          {showPassword ? (
            // Ojo abierto
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : (
            // Ojo cerrado
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
              <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
              <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
              <path d="m2 2 20 20" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
