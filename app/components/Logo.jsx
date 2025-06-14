import { dekko } from "../styles/fonts";

const Logo = ({ size = 48 }) => (
  <div style={{ position: 'relative', width: size, height: size }}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SS Logo"
    >
      <circle cx="32" cy="32" r="30" fill="#FFFFFF" />
    </svg>
    <span
      className={dekko.className}
      style={{
        position: 'absolute',
        top: '57%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#24262C',
        fontSize: size * 0.6,
        fontWeight: '400',
        pointerEvents: 'none',
      }}
    >
      SS
    </span>
  </div>
);

export default Logo;