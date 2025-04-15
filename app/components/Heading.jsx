// components/Heading.tsx
import { spaceGrotesk } from "../styles/fonts";

export default function Heading({ children, className = '' }) {
  return (
    <h2 className={`${spaceGrotesk.className} ${className}`}>
      {children}
    </h2>
  );
}
