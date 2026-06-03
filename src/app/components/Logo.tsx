export default function Logo({ className = "", variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  const src = variant === "light" ? "/logo-dark-bg.png" : "/logo-light-bg.png";

  return (
    <img
      src={src}
      alt="Alicerce Galante Logo"
      className={`${className} object-contain`}
    />
  );
}
