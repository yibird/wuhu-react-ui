import { useRef, type RefObject } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';
import type { LazyViewProps } from './types';

export default function LazyView({
  root,
  rootMargin,
  threshold,
  children,
  className,
  style,
  onVisible,
  onInvisible,
}: LazyViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(
    containerRef as RefObject<HTMLDivElement>,
    {
      root,
      rootMargin,
      threshold,
    },
    onVisible,
    onInvisible
  );

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
}
