"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TextTypeProps = {
  text: string;
  className?: string;
  typingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorCharacter?: string;
};

/** React Bits-inspired Text Type animation for display headlines. */
export function TextType({
  text,
  className,
  typingSpeed = 42,
  pauseDuration = 1600,
  loop = true,
  showCursor = true,
  cursorCharacter = "|",
}: TextTypeProps) {
  const [visibleLength, setVisibleLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const characters = useMemo(() => Array.from(text), [text]);
  const visibleText = characters.slice(0, visibleLength).join("");
  const isComplete = visibleLength >= characters.length;

  useEffect(() => {
    setVisibleLength(0);
    setIsDeleting(false);
  }, [text]);

  useEffect(() => {
    if (reduceMotion) {
      setVisibleLength(characters.length);
      setIsDeleting(false);
      return;
    }

    if (isComplete && !isDeleting && !loop) return;

    const delay = isComplete && !isDeleting ? pauseDuration : typingSpeed;
    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        setVisibleLength((current) => {
          const next = Math.min(current + 1, characters.length);
          if (next === characters.length && loop) setIsDeleting(true);
          return next;
        });
        return;
      }

      setVisibleLength((current) => {
        const next = Math.max(current - 1, 0);
        if (next === 0) setIsDeleting(false);
        return next;
      });
    }, delay);

    return () => window.clearTimeout(timer);
  }, [characters.length, isComplete, isDeleting, loop, pauseDuration, reduceMotion, typingSpeed, visibleLength]);

  return (
    <span className={className} aria-label={text.replace(/\s+/g, " ").trim()}>
      <span aria-hidden="true">{visibleText}</span>
      {showCursor ? (
        <span className="ms-1 inline-block animate-pulse text-[#bde0fe]/80" aria-hidden="true">
          {cursorCharacter}
        </span>
      ) : null}
    </span>
  );
}
