import React from "react";
import Spinner from "../svg/Spinner";
import ArrowUpIcon from "../svg/ArrowUpIcon";

interface ScrollTopButtonProps {
  show: boolean;
  scrolling: boolean;
  onClick: () => void;
  isDesktop: boolean;
}

const ScrollTopButton: React.FC<ScrollTopButtonProps> = ({
  show,
  scrolling,
  onClick,
  isDesktop,
}) => {
  return (
    <div
      className={`
        fixed z-50 right-4
        ${isDesktop ? "bottom-6" : "bottom-[96px]"}
        transition-all duration-300
        ${show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"}
      `}
      style={{ transitionProperty: "opacity, transform" }}
    >
      <button
        aria-label="Ir arriba"
        onClick={onClick}
        className={`
          bg-primary text-white rounded-full shadow-lg p-3
          hover:bg-primary/90 transition-all flex items-center justify-center
        `}
      >
        {scrolling ? <Spinner /> : <ArrowUpIcon />}
      </button>
    </div>
  );
};

export default ScrollTopButton;