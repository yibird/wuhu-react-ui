import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { clsx } from 'clsx';
import type { ThumbMap, ThumbProps } from './types';

const THUMB_MAP: Record<'vertical' | 'horizontal', ThumbMap> = {
  vertical: {
    size: 'height',
    direction: 'top',
    offset: 'offsetHeight',
    client: 'clientY',
  },
  horizontal: {
    size: 'width',
    direction: 'left',
    offset: 'offsetWidth',
    client: 'clientX',
  },
};

export default function Thumb({
  data,
  vertical = true,
  thumbColor = 'rgb(201,205,212)',
  thumbActiveColor = 'rgb(107, 119, 133)',
  ref,
  onScroll,
}: ThumbProps) {
  // 滚动条轨道Ref
  const trackRef = useRef<HTMLDivElement>(null),
    // 滚动条Thumb Ref
    thumbRef = useRef<HTMLDivElement>(null);

  // thumb偏移量
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);

  // 拖拽状态
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);

  // 拖拽thumb偏移量
  const mouseOffset = useRef(0);

  const thumbMap = useMemo<ThumbMap>(() => {
    return vertical ? THUMB_MAP.vertical : THUMB_MAP.horizontal;
  }, [vertical]);

  const thumbStyle = useMemo(() => {
    return {
      [thumbMap.size]: `${data?.thumbSize ?? 0}px`,
      [thumbMap.direction]: `${offset}px`,
    };
  }, [thumbMap, data, offset]);

  /**
   * @desc 计算合法的偏移量
   * @param offset 偏移量
   * @returns 合法的偏移量
   */
  const getLegalOffset = (offset: number) => {
    if (offset < 0) return 0;
    if (data && offset > data.max) return data.max;
    return offset;
  };

  /**
   * @desc 设置thumb的偏移量
   * @param _offset 偏移量
   */
  const setThumbOffset = (_offset: number) => {
    if (!isDraggingRef.current) {
      const offsetValue = getLegalOffset(_offset);
      if (offsetValue !== offsetRef.current) {
        offsetRef.current = offsetValue;
        setOffset(offsetValue);
        setOffset(offsetValue);
        onScroll?.(offsetValue);
      }
    }
  };

  /**
   * @desc 点击滚动条轨道事件,计算thumb的偏移量
   * @param e 点击事件
   */
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    const thumbEl = thumbRef.current;
    if (!thumbEl) return;
    const clientValue = e[thumbMap.client];
    const rectValue = thumbEl.getBoundingClientRect()[thumbMap.direction];
    const offsetValue =
      clientValue > rectValue
        ? offsetRef.current + (data?.thumbSize ?? 0)
        : offsetRef.current - (data?.thumbSize ?? 0);
    const _offset = getLegalOffset(offsetValue);
    if (_offset !== offsetRef.current) {
      setOffset(_offset);
      onScroll?.(_offset);
    }
  };

  /**
   * 滚动条Thumb鼠标按下事件
   * @param e 鼠标按下事件
   */
  const handleThumbMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    const thumbEl = thumbRef.current;
    if (!thumbEl) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    // 记住鼠标按下时的偏移量
    mouseOffset.current =
      e[thumbMap.client] - thumbEl.getBoundingClientRect()[thumbMap.direction];

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleThumbMouseUp);
    window.addEventListener('contextmenu', handleThumbMouseUp);
  };

  /**
   * 滚动条Thumb鼠标松开事件
   * @param e 鼠标抬起事件
   */
  const handleThumbMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleThumbMouseUp);
  };

  /**
   * 滚动条Thumb鼠标移动事件
   * @param e 鼠标移动事件
   */
  const handleMouseMove = (e: MouseEvent) => {
    const trackEl = trackRef.current,
      thumbEl = thumbRef.current;

    if (!(trackEl && thumbEl && isDraggingRef.current)) return;
    const _offset = getLegalOffset(
      e[thumbMap.client] -
        trackEl.getBoundingClientRect()[thumbMap.direction] -
        mouseOffset.current
    );
    if (_offset !== offset) {
      setOffset(_offset);
      onScroll?.(_offset);
    }
  };

  const handleThumbMouseDownEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleThumbMouseDown(e.nativeEvent);
  };
  const handleThumbMouseMoveEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMove(e.nativeEvent);
  };

  useEffect(() => {
    return () => {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleThumbMouseUp);
      window.addEventListener('contextmenu', handleThumbMouseUp);
    };
  }, []);

  const trackClasses = clsx(
    'w-scrollbar-track',
    `w-scrollbar-track-direction-${vertical ? 'vertical' : 'horizontal'}`
  );
  const thumbClasses = clsx(
    'w-scrollbar-thumb',
    `w-scrollbar-thumb-direction-${vertical ? 'vertical' : 'horizontal'}`,
    { 'w-scrollbar-thumb-dragging': isDragging }
  );

  useImperativeHandle(ref, () => ({
    setThumbOffset,
  }));

  return (
    <div
      ref={trackRef}
      style={
        {
          '--w-scrollbar-thumb-active-color': thumbActiveColor as string,
        } as React.CSSProperties
      }
      className={trackClasses}
      onMouseDown={handleTrackClick}
    >
      <div
        ref={thumbRef}
        className={thumbClasses}
        style={thumbStyle}
        onMouseDown={handleThumbMouseDownEvent}
        onMouseUp={handleThumbMouseUp}
        onMouseMove={handleThumbMouseMoveEvent}
      >
        <div
          className="w-scrollbar-thumb-bar"
          style={{ backgroundColor: thumbColor }}
        />
      </div>
    </div>
  );
}
