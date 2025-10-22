import clsx from 'clsx';
import { LayoutContext } from './context';
import type { LayoutProps } from './types';
import '../style/layout.less';
import { useMemo } from 'react';

export default function Layout({
  direction = 'horizontal',
  gutter = 10,
  children,
  className,
  style = {},
}: LayoutProps) {
  const classes = clsx('w-layout', {
    'w-layout-horizontal': direction === 'horizontal',
    'w-layout-vertical': direction === 'vertical',
    className,
  });
  const getStyle = useMemo(() => {
    return {
      gap: typeof gutter === 'number' ? `${gutter}px` : gutter,
      ...style,
    };
  }, [gutter]);
  return (
    <LayoutContext.Provider value={{ gutter }}>
      <div className={classes} style={getStyle}>
        {children}
      </div>
    </LayoutContext.Provider>
  );
}
