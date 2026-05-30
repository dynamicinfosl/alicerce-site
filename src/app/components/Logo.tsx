export default function Logo({ className = "", variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  const textColor = variant === "light" ? "#FFFFFF" : "#1A3A5C";

  return (
    <svg viewBox="0 0 200 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ícone de alicerce/blocos */}
      <g>
        <rect x="8" y="25" width="14" height="14" fill={variant === "light" ? "#38BDF8" : "#2563EB"} rx="2" />
        <rect x="8" y="41" width="14" height="11" fill={variant === "light" ? "#2563EB" : "#1A3A5C"} rx="2" />
        <rect x="24" y="33" width="14" height="8" fill={variant === "light" ? "#38BDF8" : "#2563EB"} rx="2" />
        <rect x="24" y="43" width="14" height="9" fill={variant === "light" ? "#2563EB" : "#1A3A5C"} rx="2" />
        <path d="M15 20L15 25M31 28L31 33" stroke={variant === "light" ? "#38BDF8" : "#2563EB"} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Texto "ALICERCE GALANTE" */}
      <text x="48" y="32" fontFamily="Syne, sans-serif" fontSize="18" fontWeight="700" fill={textColor}>
        ALICERCE
      </text>
      <text x="48" y="48" fontFamily="Syne, sans-serif" fontSize="14" fontWeight="600" fill={variant === "light" ? "#38BDF8" : "#2563EB"}>
        GALANTE
      </text>
    </svg>
  );
}
