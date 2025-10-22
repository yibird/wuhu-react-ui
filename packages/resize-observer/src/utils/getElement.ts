type TargetType =
  | Element
  | (() => Element | null)
  | React.RefObject<Element | null>;

export function getElement(target: TargetType) {
  if (!target) return null;
  if (typeof target === 'function') return target() ?? null;
  if ('current' in target) return target.current;
  return target;
}
