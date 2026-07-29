"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type FC } from "react";
import "./TrueFocus.css";

export type TrueFocusProps = {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
};

type FocusRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * React Bits True Focus — adapted for Sigma's service route heading.
 * Source: https://reactbits.dev/text-animations/true-focus
 */
export const TrueFocus: FC<TrueFocusProps> = ({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#bde0fe",
  glowColor = "rgba(29, 137, 187, 0.65)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(separator).filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    setCurrentIndex((index) => (words.length ? index % words.length : 0));
  }, [sentence, separator, words.length]);

  useEffect(() => {
    if (manualMode || words.length < 2) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => window.clearInterval(interval);
  }, [animationDuration, manualMode, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    const activeWord = wordRefs.current[currentIndex];
    const container = containerRef.current;
    if (!activeWord || !container) return;

    const updateFocusRect = () => {
      const parentRect = container.getBoundingClientRect();
      const activeRect = activeWord.getBoundingClientRect();
      setFocusRect({
        x: activeRect.left - parentRect.left,
        y: activeRect.top - parentRect.top,
        width: activeRect.width,
        height: activeRect.height,
      });
    };

    updateFocusRect();
    window.addEventListener("resize", updateFocusRect);
    return () => window.removeEventListener("resize", updateFocusRect);
  }, [currentIndex, sentence, words.length]);

  const handleMouseEnter = (index: number) => {
    if (!manualMode) return;
    setLastActiveIndex(currentIndex);
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    if (manualMode) setCurrentIndex(lastActiveIndex ?? 0);
  };

  return (
    <div className="true-focus-container" ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        const wordStyle = {
          filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
          transition: `filter ${animationDuration}s ease`,
          "--true-focus-border": borderColor,
          "--true-focus-glow": glowColor,
        } as CSSProperties;

        return (
          <span
            key={`${word}-${index}`}
            ref={(element) => {
              wordRefs.current[index] = element;
            }}
            className={`true-focus-word ${manualMode ? "manual" : ""} ${isActive ? "active" : ""}`}
            style={wordStyle}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="true-focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: words.length ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={{
          "--true-focus-border": borderColor,
          "--true-focus-glow": glowColor,
        } as CSSProperties}
      >
        <span className="true-focus-corner top-left" />
        <span className="true-focus-corner top-right" />
        <span className="true-focus-corner bottom-left" />
        <span className="true-focus-corner bottom-right" />
      </motion.div>
    </div>
  );
};

