"use client";

import { LazyMotion, domAnimation, MotionConfig, useReducedMotion, m } from "motion/react";

export function CategoryRevealWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <m.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }}
          className={className}
        >
          {children}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
