export function GeometricRosette({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="amberGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8893A" />
          <stop offset="100%" stopColor="#E8D5B0" />
        </radialGradient>
      </defs>
      {/* 8-point star (octagram) - two overlapping squares */}
      <g fill="url(#amberGradient)">
        {/* First square, rotated */}
        <polygon points="100,10 190,100 100,190 10,100" opacity="0.6" />
        {/* Second square */}
        <polygon points="100,10 190,100 100,190 10,100" opacity="0.6" transform="rotate(45 100 100)" />
        {/* Center circle */}
        <circle cx="100" cy="100" r="30" opacity="0.4" />
        {/* Outer ring of small circles */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x = 100 + 75 * Math.cos(angle);
          const y = 100 + 75 * Math.sin(angle);
          return <circle key={i} cx={x} cy={y} r="8" opacity="0.5" />;
        })}
      </g>
    </svg>
  );
}
