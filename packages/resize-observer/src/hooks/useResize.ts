import { useEffect, useState } from 'react';
import { debounce, getElement } from '../utils';

type Size = { width: number; height: number };
type TargetType =
  | Element
  | (() => Element | null)
  | React.RefObject<Element | null>;

type UseResizeOptions = {
  /**
   * 是否立即触发回调
   * @default false
   */
  immediate?: boolean;
  /**
   * 触发回调
   * @param size 尺寸 { width, height }
   * @returns
   */
  onResize?: (size: Size) => void;
  /**
   * 防抖间隔（毫秒）
   * @default 10
   */
  debounce?: number;
};

/**
 * 监听目标元素尺寸变化，返回 { width, height }
 * @param target 目标元素
 * @param options 选项
 * @returns 尺寸 { width, height }
 */
export function useResize(
  target: TargetType,
  { immediate = true, debounce: wait = 0, onResize }: UseResizeOptions = {}
) {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const el = getElement(target);
    if (!el) return;

    const update = (next: Size) => {
      setSize(next);
      onResize?.(next);
    };

    const measure = () => {
      const rect = el.getBoundingClientRect();
      update({ width: rect.width, height: rect.height });
    };

    type CancelableFn = (() => void) & { cancel?: () => void };
    const handler: CancelableFn = wait > 0 ? debounce(measure, wait) : measure;

    if (immediate) measure();

    const observer = new ResizeObserver(() => handler());
    observer.observe(el);

    return () => {
      observer.disconnect();
      handler.cancel?.();
    };
  }, [target, immediate, wait, onResize]);

  return size;
}
