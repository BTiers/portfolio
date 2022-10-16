import { memo } from "react";

type SysfolioIconProps = { className?: string };

export const SysfolioIcon: React.FC<SysfolioIconProps> = memo(
  ({ className }) => (
    <svg
      width={20}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        width={20}
        height={5}
        rx={2.5}
        transform="matrix(-1 0 0 1 20 0)"
        fill="url(#a)"
      />
      <path fill="#FEEE5C" d="M4 2H0v7h4z" />
      <rect
        width={20}
        height={5}
        rx={2.5}
        transform="matrix(-1 0 0 1 20 14)"
        fill="url(#b)"
      />
      <rect
        width={20}
        height={5}
        rx={2.5}
        transform="matrix(-1 0 0 1 20 7)"
        fill="url(#c)"
      />
      <defs>
        <linearGradient
          id="a"
          x1={10}
          y1={0}
          x2={10}
          y2={5}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.771} stopColor="#FEEE5C" />
          <stop offset={1} stopColor="#FFE820" stopOpacity={0.286} />
          <stop offset={1} stopColor="#FFE607" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="b"
          x1={10}
          y1={0}
          x2={10}
          y2={5}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.771} stopColor="#FEEE5C" />
          <stop offset={1} stopColor="#FFE820" stopOpacity={0.286} />
          <stop offset={1} stopColor="#FFE607" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="c"
          x1={10}
          y1={0}
          x2={10}
          y2={5}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.771} stopColor="#FEEE5C" />
          <stop offset={1} stopColor="#FFE820" stopOpacity={0.286} />
          <stop offset={1} stopColor="#FFE607" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  )
);
