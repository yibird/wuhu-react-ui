import { useFirstElement, useResize } from './hooks';
import type { ResizeObserverProps } from './types';

export default function ResizeObserver({
  immediate = true,
  children,
  onResize,
  debounce = 0,
}: ResizeObserverProps) {
  const { containerRef } = useFirstElement<HTMLDivElement>();

  useResize(containerRef, {
    immediate,
    debounce,
    onResize,
  });

  return <div ref={containerRef}>{children}</div>;
}
