import { useEffect, useRef, useState } from 'react';

export function useFirstElement<T extends HTMLElement = HTMLElement>() {
  const containerRef = useRef<T>(null);
  const [firstElement, setFirstElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setFirstElement(
        containerRef.current.firstElementChild as HTMLElement | null
      );
    }
  }, []);

  return { containerRef, firstElement };
}
