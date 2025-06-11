import React from "react";

interface FondoPendingOrdersProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
}

const FondoPendingOrders: React.FC<FondoPendingOrdersProps> = ({
  className = "",
  style = {},
  ...props
}) => (
  <svg
    width="100%"
    height="252"
    viewBox="0 0 430 252"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className={className}
    style={{
      display: "block",
      ...style,
    }}
    {...props}
  >
    <path
      d="M0 0H430V252C430 252 410.698 217.14 351.184 217.14C313.653 217.14 198.958 217.14 100.798 217.14C53.6159 217.14 0 210.84 0 135.66C0 60.48 0 0 0 0Z"
      fill="#8642E5"
    />
  </svg>
);

export default FondoPendingOrders;
