"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function CountdownPill({
  targetDate,
  className = "",
}: {
  targetDate: string | Date;
  className?: string;
}) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    function updateTimer() {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("EXPIRED");
        setIsExpired(true);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
      setIsExpired(false);
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${
        isExpired
          ? "bg-red-950/60 text-red-300 border-red-500/40"
          : "bg-coral/15 text-coral border-coral/30"
      } ${className}`}
    >
      <Clock className="w-3 h-3 animate-pulse" />
      <span>{timeLeft || "Calculating..."}</span>
    </span>
  );
}
