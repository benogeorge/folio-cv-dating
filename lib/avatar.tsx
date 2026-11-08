import React from "react";

export function GeometricAvatar({
  codename = "Folio_User",
  size = 64,
  className = "",
}: {
  codename: string;
  size?: number;
  className?: string;
}) {
  let hash = 0;
  for (let i = 0; i < codename.length; i++) {
    hash = codename.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 65) % 360;
  const id = `grad-${codename.replace(/[^a-z0-9]/gi, "")}-${Math.abs(hash % 10000)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ display: "inline-block", flexShrink: 0 }}
      aria-label={`Avatar for ${codename}`}
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`hsl(${hue1}, 80%, 65%)`} />
          <stop offset="100%" stopColor={`hsl(${hue2}, 80%, 45%)`} />
        </linearGradient>
        <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={`hsl(${hue1}, 80%, 60%)`} floodOpacity="0.3" />
        </filter>
      </defs>
      <polygon
        points="50,6 93,28 93,72 50,94 7,72 7,28"
        fill={`url(#${id})`}
        filter={`url(#glow-${id})`}
        stroke="#FAF8FF"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      {/* Inner geometric accent */}
      <polygon
        points="50,22 75,37 75,63 50,78 25,63 25,37"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeOpacity="0.2"
      />
    </svg>
  );
}
