import { use, useMemo, useState } from 'react';
import clsx from 'clsx';
import { CLASSES } from './constant';
import { ContextMenuContext } from './context';
import type { MenuItemProps } from './types';

export default function MenuItem(props: MenuItemProps) {
  const { icon, label, suffix, disabled } = props;

  const [hover, setHover] = useState(false);
  const {
    activeClassName = '',
    activeStyle,
    itemClassName = '',
    itemStyle,
    handleHide,
    handleClickMenuItem,
  } = use(ContextMenuContext);

  const classes = clsx(CLASSES.contextmenuItem, {
    [CLASSES.contextmenuItemHover]: hover,
    [activeClassName]: hover,
    [CLASSES.contextmenuItemDisabled]: disabled,
    itemClassName,
  });

  const getStyle = useMemo(() => {
    return hover ? activeStyle : (itemStyle ?? {});
  }, [hover, activeStyle, itemStyle]);

  const renderIcon = useMemo(() => {
    if (!icon) return;
    return typeof icon === 'function' ? icon(props) : icon;
  }, [icon]);
  const renderLabel = useMemo(() => {
    if (!label) return;
    return typeof label === 'function' ? label(props) : label;
  }, [label]);
  const renderSuffix = useMemo(() => {
    if (!suffix) return;
    return typeof suffix === 'function' ? suffix(props) : suffix;
  }, [suffix]);

  const handleMouseEnter = () => {
    if (disabled) return;
    setHover(true);
  };
  const handleMouseLeave = () => {
    if (disabled) return;
    setHover(false);
  };
  const handleClick = () => {
    if (disabled) return;
    handleClickMenuItem?.(props);
    handleHide?.();
  };

  return (
    <li
      className={classes}
      style={getStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={CLASSES.contextmenuItemPrefix}>
        {icon && (
          <span className={CLASSES.contextmenuItemPrefixIcon}>
            {renderIcon}
          </span>
        )}
        <span className={CLASSES.contextmenuItemPrefixLabel}>
          {renderLabel}
        </span>
      </div>
      {suffix && (
        <span className={CLASSES.contextmenuItemSuffix}>{renderSuffix}</span>
      )}
    </li>
  );
}
