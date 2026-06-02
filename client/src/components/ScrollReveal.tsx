import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const SCROLL_STAGGER_MS = 90;

export type ScrollRevealVariant =
  | "fade-up"
  | "fade-in"
  | "fade-left"
  | "fade-right"
  | "scale-up";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: ScrollRevealVariant;
  duration?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  duration = 750,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  };

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal",
        `scroll-reveal--${variant}`,
        visible && "is-visible",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
