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
      className={`inline-flex items-center rounded-lg ${className}`}
      aria-label="حرفي"
    >
      <span
        className={`inline-flex h-14 w-[92px] items-center justify-center md:h-16 md:w-[106px] ${
          variant === "inverted" ? "rounded-lg bg-white p-1.5" : ""
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
