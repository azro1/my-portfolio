// components/Heading.tsx
import { outfit } from "../styles/fonts";

export default function Heading({ children, className = '' }) {
  return (
    <h2 className={`${outfit.className} ${className}`}>
      {children}
    </h2>
  );
}
