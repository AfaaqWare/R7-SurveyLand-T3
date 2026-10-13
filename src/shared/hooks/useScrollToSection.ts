"use client";

import { useCallback, useRef } from "react";

const NAVBAR_HEIGHT = 80;

export default function useScrollToSection<T extends HTMLElement = HTMLElement>() {
  const sectionRef = useRef<T>(null);

  const scrollToSection = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const visibleHeight = window.innerHeight - NAVBAR_HEIGHT;
    const freeSpace = Math.max(visibleHeight - section.offsetHeight, 0);
    const top = sectionTop - NAVBAR_HEIGHT - freeSpace / 2;

    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  }, []);

  return { sectionRef, scrollToSection };
}
