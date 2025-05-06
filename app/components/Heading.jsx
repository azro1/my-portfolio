// components/Heading.tsx
import { epilogue } from "../styles/fonts";

export default function Heading({ children, className = '' }) {
  return (
    <h2 className={`${epilogue.className} ${className}`}>
      {children}
    </h2>
  );
}
