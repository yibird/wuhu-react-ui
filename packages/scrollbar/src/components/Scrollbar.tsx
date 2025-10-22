import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { clsx } from 'clsx';
import type { ScrollbarProps, ThumbData, ThumbInstance } from './types';
import Thumb from './Thumb';
import '../style/index.less';

const TRACK_SIZE = 15;
const THUMB_MIN_SIZE = 20;

export default function Scrollbar({
  type = 'embed',
  disableHorizontal = false,
  disableVertical = false,
  thumbColor = 'rgb(201,205,212)',
  thumbActiveColor = 'rgb(107, 119, 133)',
  children,
  containerClassName,
  containerStyle,
  ref,
  className,
  style,
  onScroll,
}: ScrollbarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalThumbRef = useRef<ThumbInstance>(null);
  const verticalThumbRef = useRef<ThumbInstance>(null);

  const [verticalData, setVerticalData] = useState<ThumbData>(),
    [horizontalData, setHorizontalData] = useState<ThumbData>();

  // 是否显示水平和垂直滚动条
  const _hasHorizontalScrollbar = useRef(false),
    _hasVerticalScrollbar = useRef(false);

  const isBoth = useRef(false);

  const hasHorizontalScrollbar = useMemo(
    () => !disableHorizontal && _hasHorizontalScrollbar.current,
    [disableHorizontal, _hasHorizontalScrollbar.current]
  );

  const hasVerticalScrollbar = useMemo(
    () => !disableVertical && _hasVerticalScrollbar.current,
    [disableVertical, _hasVerticalScrollbar.current]
  );

  const getContainerSize = () => {
    const containerEl = containerRef.current;
    if (!containerEl) return;
    const {
      clientWidth,
      clientHeight,
      offsetWidth,
      offsetHeight,
      scrollWidth,
      scrollHeight,
      scrollTop,
      scrollLeft,
    } = containerEl;

    // 如果 scrollWidth > clientWidth则显示水平滚动条
    _hasHorizontalScrollbar.current = scrollWidth > clientWidth;
    // 如果 scrollHeight > clientHeight则显示垂直滚动条
    _hasVerticalScrollbar.current = scrollHeight > clientHeight;
    // 如果水平滚动条和垂直滚动条都显示,则需要计算both
    isBoth.current =
      _hasHorizontalScrollbar.current && _hasVerticalScrollbar.current;

    // 计算水平滚动条和垂直滚动条的轨道宽度,如果isBoth为true,则需要减去轨道大小
    const horizontalTrackWidth =
      type === 'embed' && isBoth.current
        ? offsetWidth - TRACK_SIZE
        : offsetWidth;
    const verticalTrackHeight =
      type === 'embed' && isBoth.current
        ? offsetHeight - TRACK_SIZE
        : offsetHeight;

    // 计算水平滚动条的Thumb宽度
    const horizontalThumbWidth = Math.round(
      horizontalTrackWidth /
        Math.min(
          scrollWidth / clientWidth,
          horizontalTrackWidth / THUMB_MIN_SIZE
        )
    );
    // 计算水平滚动条最大偏移距离
    const maxHorizontalOffset = horizontalTrackWidth - horizontalThumbWidth;
    // 计算水平滚动条比例
    const horizontalRatio = (scrollWidth - clientWidth) / maxHorizontalOffset;

    const verticalThumbHeight = Math.round(
      verticalTrackHeight /
        Math.min(
          scrollHeight / clientHeight,
          verticalTrackHeight / THUMB_MIN_SIZE
        )
    );

    const maxVerticalOffset = verticalTrackHeight - verticalThumbHeight;
    const verticalRatio = (scrollHeight - clientHeight) / maxVerticalOffset;

    setVerticalData({
      ratio: verticalRatio,
      thumbSize: verticalThumbHeight,
      max: maxVerticalOffset,
    });
    setHorizontalData({
      ratio: horizontalRatio,
      thumbSize: horizontalThumbWidth,
      max: maxHorizontalOffset,
    });

    if (scrollTop > 0) {
      const verticalOffset = Math.round(scrollTop / (verticalData?.ratio ?? 1));
      verticalThumbRef.current?.setThumbOffset(verticalOffset);
    }
    if (scrollLeft > 0) {
      const horizontalOffset = Math.round(
        scrollLeft / (verticalData?.ratio ?? 1)
      );
      horizontalThumbRef.current?.setThumbOffset(horizontalOffset);
    }
  };

  useEffect(() => {
    getContainerSize();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const containerEl = containerRef.current;
    if (!containerEl) return;
    // 如果显示水平滚动条,则需要计算水平滚动条的偏移距离
    if (hasHorizontalScrollbar) {
      const horizontalOffset = Math.round(
        containerEl.scrollLeft / (horizontalData?.ratio ?? 1)
      );
      horizontalThumbRef.current?.setThumbOffset(horizontalOffset);
    }
    if (hasVerticalScrollbar) {
      const verticalOffset = Math.round(
        containerEl.scrollTop / (verticalData?.ratio ?? 1)
      );
      verticalThumbRef.current?.setThumbOffset(verticalOffset);
    }
    onScroll?.(e);
  };

  const handleVerticalScroll = (offset: number) => {
    const containerEl = containerRef.current;
    if (!containerEl) return;
    containerEl.scrollTo({
      top: offset * (verticalData?.ratio ?? 1),
    });
  };
  const handleHorizontalScroll = (offset: number) => {
    const containerEl = containerRef.current;
    if (!containerEl) return;
    containerEl.scrollTo({
      left: offset * (horizontalData?.ratio ?? 1),
    });
  };

  const classes = useMemo(() => {
    return clsx(
      'w-scrollbar',
      `w-scrollbar-type-${type}`,
      {
        'w-scrollbar-both': isBoth,
      },
      className
    );
  }, [type, isBoth, className]);

  const containerClasses = clsx('w-scrollbar-container', containerClassName);

  const getContainerStyle = useMemo(() => {
    const scrollbarStyle: React.CSSProperties = {};
    if (type === 'track') {
      if (hasHorizontalScrollbar) {
        scrollbarStyle.paddingBottom = `${TRACK_SIZE}px`;
      }
      if (hasVerticalScrollbar) {
        scrollbarStyle.paddingRight = `${TRACK_SIZE}px`;
      }
    }
    return { ...scrollbarStyle, ...(containerStyle ?? {}) };
  }, [hasHorizontalScrollbar, hasHorizontalScrollbar, containerStyle]);

  useImperativeHandle(ref, () => {
    return {
      scrollTo(
        options?:
          | number
          | {
              left?: number;
              top?: number;
            },
        y?: number
      ) {
        if (typeof options === 'object') {
          containerRef.current?.scrollTo({ ...options });
        } else if (options || y) {
          containerRef.current?.scrollTo(options as number, y as number);
        }
      },
      scrollLeft: (left: number) => {
        containerRef.current?.scrollTo({ left });
      },
      scrollTop: (top: number) => {
        containerRef.current?.scrollTo({ top });
      },
    };
  });

  return (
    <div className={classes} style={style}>
      <div
        ref={containerRef}
        className={containerClasses}
        style={getContainerStyle}
        onScroll={handleScroll}
      >
        {children}
      </div>
      {hasVerticalScrollbar && (
        <Thumb
          ref={verticalThumbRef}
          data={verticalData}
          vertical
          thumbColor={thumbColor}
          thumbActiveColor={thumbActiveColor}
          onScroll={handleVerticalScroll}
        />
      )}
      {hasHorizontalScrollbar && (
        <Thumb
          ref={horizontalThumbRef}
          data={horizontalData}
          vertical={false}
          thumbColor={thumbColor}
          thumbActiveColor={thumbActiveColor}
          onScroll={handleHorizontalScroll}
        />
      )}
    </div>
  );
}
