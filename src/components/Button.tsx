import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => (
  <button
    className="w-full px-8 py-2 text-white font-bold text-lg rounded-[16px] shadow-lg transition-transform transform bg-primary border-2 border-primary hover:scale-105 hover:border-primary hover:bg-primary/90 hover:shadow-primary/50 hover:shadow-2xl focus:outline-none"
    {...props}
  >
    {children}
  </button>
);

export default Button;