"use client";

import React, { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  speedMs?: number;
  delayMs?: number;
  start?: boolean;
  className?: string;
};

export function Typewriter({
  text,
  speedMs = 30,
  delayMs = 0,
  start = true,
  className,
}: TypewriterProps) {
  const [displayedLength, setDisplayedLength] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (!start) {
      setDisplayedLength(0);
      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        if (intervalId) clearInterval(intervalId);
      };
    }

    setDisplayedLength(0);

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setDisplayedLength((prev) => {
          if (prev >= text.length) {
            if (intervalId) clearInterval(intervalId);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    }, delayMs);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speedMs, delayMs, start]);

  const visibleText = text.slice(0, displayedLength);
  const lines = visibleText.split("\n");

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < lines.length - 1 ? <br /> : null}
        </React.Fragment>
      ))}
    </span>
  );
}