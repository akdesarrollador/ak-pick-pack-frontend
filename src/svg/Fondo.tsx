import React from "react";

interface FondoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
}

const Fondo: React.FC<FondoProps> = ({ className = "", style = {}, ...props }) => (
  <svg
    width="100%"
    viewBox="0 0 430 334"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: "block", ...style }}
    {...props}
  >
    <path
      d="M-0.5 0H431V334C431 334 411.025 287.797 349.435 287.797C310.595 287.797 191.898 287.797 90.3142 287.797C41.4863 287.797 -0.5 273 -0.5 177.5C-0.5 82 -0.5 0 -0.5 0Z"
      fill="#8642E5"
    />
  </svg>
);

export default Fondo;