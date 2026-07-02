import { useEffect, useRef, useState } from "react";

const HEADER_OFFSET = 72;
const LG_MEDIA_QUERY = "(min-width: 1024px)";

export function useHeroLogoInView(
  onVisibilityChange?: (inView: boolean) => void
) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const mediaQuery = window.matchMedia(LG_MEDIA_QUERY);

    const update = () => {
      if (!mediaQuery.matches) {
        setIsInView(false);
        return;
      }

      const rect = element.getBoundingClientRect();
      const inView =
        rect.bottom > HEADER_OFFSET && rect.top < window.innerHeight;
      setIsInView(inView);
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    mediaQuery.addEventListener("change", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    onVisibilityChange?.(isInView);
  }, [isInView, onVisibilityChange]);

  return ref;
}
