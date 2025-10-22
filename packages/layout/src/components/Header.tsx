import { use, useEffect, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { LayoutContext } from './context';
import Collapsible from './Collapsible';
import type { LayoutHeaderProps } from './types';
import '../style/header.less';

export default function Header({
  collapsible = false,
  height,
  trigger,
  wrapperClassName = '',
  wrapperStyle = {},
  children,
  className,
  style = {},
  onCollapsed,
}: LayoutHeaderProps) {
  const { gutter } = use(LayoutContext) ?? { gutter: 10 };
  const [collapsed, setCollapsed] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const fixed = useMemo(() => typeof height !== 'undefined', [height]);

  const getGutter = useMemo(() => {
    const gap = typeof gutter === 'string' ? Number.parseFloat(gutter) : gutter;
    return `-${Math.abs(gap)}px`;
  }, [gutter]);

  const getStyle = useMemo(() => {
    const mergeStyle = { ...style, '--wuhu-layout-header-gap': getGutter };

    if (fixed) {
      const h = typeof height === 'number' ? `${height}px` : height;
      Object.assign(mergeStyle, {
        '--wuhu-layout-header-height': h,
        minHeight: h,
        height: h,
      });
    }
    return mergeStyle;
  }, [fixed, getGutter, height]);

  const getWrapperStyle = useMemo(() => {
    const style = { ...wrapperStyle };
    if (fixed && collapsed) {
      style.height = 0;
      style.minHeight = 0;
    }
    return style;
  }, [wrapperStyle, fixed, collapsed]);

  const classes = clsx(
    'w-layout-header',
    `w-layout-header-${fixed ? 'fixed' : 'auto'}`,
    !isFirstRender.current &&
      (collapsed
        ? `w-layout-header-${fixed ? 'fixed' : 'auto'}-collapsed`
        : `w-layout-header-${fixed ? 'fixed' : 'auto'}-expand`),
    className
  );
  const wrapperClasses = clsx('w-layout-header-wrapper', wrapperClassName);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
    onCollapsed?.(!collapsed);
  };

  return (
    <div className={classes} style={getStyle}>
      <div className={wrapperClasses} style={getWrapperStyle}>
        {children}
      </div>
      {collapsible && (
        <Collapsible
          v-if="collapsible"
          direction="bottom"
          trigger={trigger}
          onCollapsed={handleCollapsed}
        />
      )}
    </div>
  );
}
