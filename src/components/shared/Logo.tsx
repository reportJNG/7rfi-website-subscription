import { Link } from "react-router";

interface LogoProps {
  className?: string;
  variant?: "default" | "inverted";
  showWordmark?: boolean;
}

export function Logo({
  className = "",
  variant = "default",
  showWordmark = true,
}: LogoProps) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center rounded-xl ${className}`}
      aria-label="حرفي"
    >
      <span
        className={`inline-flex h-14 w-[112px] items-center justify-center rounded-xl border p-2 shadow-xs transition-colors duration-200 md:h-16 md:w-[128px] ${
          variant === "inverted"
            ? "border-white/20 bg-white"
            : "border-border bg-white group-hover:border-amber/40"
        }`}
      >
        <img
          src="/images/logo-clean.png"
          alt={showWordmark ? "حرفي" : ""}
          className="h-full w-full object-contain object-center"
          loading="eager"
          decoding="async"
        />
      </span>
    </Link>
  );
}
