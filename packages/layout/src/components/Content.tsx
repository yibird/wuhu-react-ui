import clsx from 'clsx';
import type { LayoutContentProps } from './types';
import '../style/content.less';

export default function Content({
  children,
  className,
  style,
}: LayoutContentProps) {
  const classes = clsx('w-layout-content', className);
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
