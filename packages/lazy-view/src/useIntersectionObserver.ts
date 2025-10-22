import { useEffect, type RefObject } from 'react';
import 'intersection-observer';

function isRef<T = unknown>(target: unknown): target is RefObject<T> {
  return (
    !!target &&
    typeof target === 'object' &&
    'current' in target &&
    Object.hasOwn(target, 'current')
  );
}

export function useIntersectionObserver(
  target: RefObject<Element | null> | Element,
  options: IntersectionObserverInit,
  onVisible?: (entry: IntersectionObserverEntry) => void,
  onInvisible?: (entry: IntersectionObserverEntry) => void
) {
  let observer: IntersectionObserver | null = null;

  const getTarget = () => (isRef(target) ? target.current : target);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      console.warn(
        'The current environment does not support IntersectionObserver'
      );
      return;
    }
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          onVisible?.(entry);
        } else {
          onInvisible?.(entry);
        }
      }
    }, options);
    const el = getTarget();
    if (el) {
      observer.observe(el);
    }
    return () => {
      const el = getTarget();
      if (observer && el) {
        observer.unobserve(el);
        observer.disconnect();
        observer = null;
      }
    };
  }, []);
}
