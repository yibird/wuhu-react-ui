import clsx from 'clsx';
import type { RippleProps } from './types';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Ripple({
  type = 'out',
  borderRadius = 0,
  spreadWidth = '6px',
  spreadSize = '6px',
  trigger = 'click',
  color = 'blue',
  center = false,
  children,
  className,
  style,
}: RippleProps) {
  const rippleRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<
    { id: string; style: React.CSSProperties }[]
  >([]);
  const timeouts = useRef<number[]>([]);

  const classes = clsx(
    'w-ripple',
    { 'w-ripple-overflow': type === 'inset' },
    className
  );

  const rippleStyle = useMemo(() => {
    const br =
      typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
    return {
      borderRadius: type === 'out' ? br : '50%',
      '--wuhu-ripple-color': color,
      '--wuhu-spread-width': spreadWidth,
      '--wuhu-spread-size': spreadSize,
    } as React.CSSProperties;
  }, [borderRadius, type, color, spreadWidth, spreadSize]);

  const wrapperClasses = useMemo(() => {
    return clsx('w-ripple-wrapper', {
      'w-ripple-wrapper-inset': type === 'inset',
      'w-ripple-inset-animate-one': type === 'inset' && trigger !== 'always',
      'w-ripple-inset-animate-always': type === 'inset' && trigger === 'always',
      'w-ripple-wrapper-out': type === 'out',
      'w-ripple-out-animate-one': type === 'out' && trigger !== 'always',
      'w-ripple-out-animate-always': type === 'out' && trigger === 'always',
    });
  }, [type, trigger]);

  const createRipple = (style: React.CSSProperties, isRemove = true) => {
    const id = `${Date.now()}_${Math.random()}`;
    setRipples((prev) => [...prev, { id, style }]);
    if (isRemove) {
      const timeout = window.setTimeout(() => {
        const newRipples = ripples.filter((r) => r.id !== id);
        setRipples(newRipples);
      }, 1000);
      timeouts.current.push(timeout);
    }
  };
  const clearRipple = () => {
    setRipples([]);
    timeouts.current.forEach(clearTimeout);
  };
  const createOutRipple = (isRemove = true) => {
    createRipple(rippleStyle, isRemove);
  };
  const createInsetRipple = (
    e: React.MouseEvent<HTMLDivElement>,
    center = false
  ) => {
    const wrapperEl = rippleRef.current;
    if (!wrapperEl) return;

    const rect = wrapperEl.getBoundingClientRect();
    // 计算波纹大小（中心模式取对角线，非中心模式取最大边长）
    const size = center
      ? Math.sqrt(rect.width ** 2 + rect.height ** 2) // 对角线，确保足够大
      : Math.max(rect.width, rect.height);

    // 计算波纹位置（中心模式居中）
    const rippleX = center
      ? rect.width / 2 - size / 2
      : e.clientX - rect.left - size / 2;

    const rippleY = center
      ? rect.height / 2 - size / 2
      : e.clientY - rect.top - size / 2;

    createRipple({
      ...rippleStyle,
      top: `${rippleY}px`,
      left: `${rippleX}px`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (trigger === 'click') {
      if (type === 'out') {
        createOutRipple();
      } else {
        createInsetRipple(e, center);
      }
    }
  };
  const handleMouseEnter = () => {
    if (type === 'out' && trigger === 'hover') {
      createOutRipple();
    }
  };

  const handleMouseLeave = () => {
    if (type === 'out' && trigger === 'hover') {
      clearRipple();
    }
  };

  useEffect(() => {
    if (trigger === 'always' && type === 'out') {
      clearRipple();
      setTimeout(() => {
        createOutRipple(false);
      });
    }
  }, [trigger, rippleStyle]);

  useEffect(() => {
    return () => {
      clearRipple();
    };
  }, []);

  return (
    <div
      ref={rippleRef}
      className={classes}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {ripples.map((item) => {
        return (
          <div key={item.id} className={wrapperClasses} style={item.style} />
        );
      })}
      {children}
    </div>
  );
}
