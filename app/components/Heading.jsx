// components/Heading.tsx
import { unbounded } from "../styles/fonts";

export default function Heading({ children, className = '' }) {
  return (
    <h2 className={`${unbounded.className} ${className}`}>
      {children}
    </h2>
  );
}
