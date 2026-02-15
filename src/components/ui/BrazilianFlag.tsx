"use client";

export function BrazilianFlag({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Brazilian Flag"
      role="img"
    >
      {/* Green background */}
      <rect width="100" height="70" fill="#009c3b" />
      
      {/* Yellow diamond */}
      <polygon
        points="50,5 95,35 50,65 5,35"
        fill="#ffdf00"
      />
      
      {/* Blue circle */}
      <circle cx="50" cy="35" r="17" fill="#002776" />
      
      {/* White band across circle */}
      <path
        d="M 33 35 Q 50 28, 67 35 Q 50 42, 33 35"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="1"
      />
      
      {/* Stars (simplified representation) */}
      <circle cx="40" cy="32" r="1" fill="#ffffff" />
      <circle cx="45" cy="38" r="1" fill="#ffffff" />
      <circle cx="50" cy="30" r="1" fill="#ffffff" />
      <circle cx="55" cy="36" r="1" fill="#ffffff" />
      <circle cx="60" cy="33" r="1" fill="#ffffff" />
      <circle cx="44" cy="44" r="1" fill="#ffffff" />
      <circle cx="56" cy="44" r="1" fill="#ffffff" />
      <circle cx="50" cy="48" r="0.8" fill="#ffffff" />
    </svg>
  );
}
