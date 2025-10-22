/**
 * 创建一个防抖函数，在指定时间内多次调用只执行最后一次
 * @param fn 原始函数
 * @param delay 延迟毫秒数
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay = 100
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };

  // 添加取消功能
  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  return debounced as T & { cancel: () => void };
}
