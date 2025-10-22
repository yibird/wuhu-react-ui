import { use, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import Collapsible from './Collapsible';
import { LayoutContext } from './context';
import type { LayoutSiderProps } from './types';
import '../style/sider.less';

export default function Sider({
  collapsible = false,
  width,
  trigger,
  wrapperClassName = '',
  wrapperStyle = {},
  children,
  className,
  style = {},
  onCollapsed,
}: LayoutSiderProps) {
  const { gutter } = use(LayoutContext) ?? { gutter: 10 };
  const [collapsed, setCollapsed] = useState(false);

  const fixed = useMemo(() => typeof width !== 'undefined', [width]);

  const getStyle = useMemo(() => {
    const mergeStyle = { ...style };
    if (fixed) {
      const w = collapsed
        ? 0
        : typeof width === 'number'
          ? `${width}px`
          : width;
      mergeStyle.width = w;
      mergeStyle.minWidth = w;
    }
    if (collapsed) {
      const marginRight =
        typeof gutter === 'number'
          ? `-${gutter}px`
          : gutter.startsWith('-')
            ? gutter
            : `-${gutter}`;
      mergeStyle.marginRight = marginRight;
    }
    return mergeStyle;
  }, [style, fixed, collapsed, gutter, width]);

  const classes = clsx(
    'w-layout-sider',
    fixed ? 'w-layout-sider-fixed' : 'w-layout-sider-auto',
    {
      'w-layout-sider-auto-collapsed': collapsed && !fixed,
    },
    className
  );
  const wrapperClasses = clsx('w-layout-sider-wrapper', wrapperClassName);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
    onCollapsed?.(!collapsed);
  };

  return (
    <div className={classes} style={getStyle}>
      <div className={wrapperClasses} style={wrapperStyle}>
        <div className="w-layout-sider-wrapper__content">{children}</div>
      </div>
      {collapsible && (
        <Collapsible
          v-if="collapsible"
          direction="right"
          trigger={trigger}
          onCollapsed={handleCollapsed}
        />
      )}
    </div>
  );
}
