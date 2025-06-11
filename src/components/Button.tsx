import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "fill" | "outline";
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "fill",
  children,
  className = "",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-md font-semibold transition-colors duration-150 w-full shadow-md";
  const fill =
    "bg-primary text-white hover:bg-primary/90";
  const outline =
    "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white";

  const styles =
    variant === "fill"
      ? `${base} ${fill}`
      : `${base} ${outline}`;

  return (
    <button className={`${styles} ${className} py-3 rounded-xl shadow-2xl`} {...props}>
      {children}
    </button>
  );
};

export default Button;