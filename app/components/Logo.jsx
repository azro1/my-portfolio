
const Logo = ({ size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="SS Logo"
  >
    <circle cx="32" cy="32" r="30" fill="#FFFFFF" />
    <text
      x="50%"
      y="65%"
      textAnchor="middle"
      fill="#24262C"
      fontSize="36"
      fontFamily="Trebuchet MS"
      fontWeight="bold"
      dy=".1em"
    >
      SS
    </text>
  </svg>
);

export default Logo;