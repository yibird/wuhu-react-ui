import { useState } from 'react';
import clsx from 'clsx';
import type { CollapsibleProps } from './types';
import '../style/collapsible.less';

export default function Collapsible({
  direction = 'bottom',
  trigger,
  className,
  style,
  onCollapsed,
}: CollapsibleProps) {
  const [collapsed, setCollapsed] = useState(false);

  const classes = clsx(
    'w-layout-collapsible',
    {
      'w-layout-collapsible-direction__top': direction === 'top',
      'w-layout-collapsible-direction__bottom': direction === 'bottom',
      'w-layout-collapsible-direction__left': direction === 'left',
      'w-layout-collapsible-direction__right': direction === 'right',
      'w-layout-collapsible-direction__top-collapsed':
        direction === 'top' && collapsed,
      'w-layout-collapsible-direction__bottom-collapsed':
        direction === 'bottom' && collapsed,
      'w-layout-collapsible-direction__left-collapsed':
        direction === 'left' && collapsed,
      'w-layout-collapsible-direction__right-collapsed':
        direction === 'right' && collapsed,
    },
    className
  );
  const barClasses = clsx('w-layout-collapsible-bar', {
    'w-layout-collapsible-bar-collapsed': collapsed,
  });

  const handleClick = () => {
    setCollapsed(!collapsed);
    onCollapsed?.(!collapsed);
  };

  return (
    <div className={classes} style={style}>
      <div className={barClasses} onClick={handleClick}>
        {trigger ? (
          trigger
        ) : (
          <span className="w-layout-collapsible-bar__content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-layout-collapsible-bar__content-icon"
            >
              <title>collapsible</title>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m18 15l-6-6l-6 6"
              />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}
