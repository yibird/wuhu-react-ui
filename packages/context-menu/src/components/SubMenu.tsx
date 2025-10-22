import { use, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { CLASSES } from './constant';
import MenuItem from './MenuItem';
import { ContextMenuContext } from './context';
import type { MenuItemType, SubMenuProps } from './types';

export default function SubMenu(props: SubMenuProps) {
  const {
    itemClassName = '',
    itemStyle,
    activeClassName = '',
    activeStyle,
  } = use(ContextMenuContext);
  const { icon, label, disabled = false, children } = props;
  const [hover, setHover] = useState(false);
  const [placements, setPlacements] = useState(['top', 'right']);
  const submenuRef = useRef<HTMLDivElement>(null);

  const classes = clsx(CLASSES.contextmenuSubmenu, CLASSES.contextmenuItem, {
    [CLASSES.contextmenuItemHover]: hover,
    [activeClassName]: hover,
    [CLASSES.contextmenuItemDisabled]: disabled,
    itemClassName,
  });

  const getStyle = useMemo(() => {
    return hover ? activeStyle : (itemStyle ?? {});
  }, [hover, activeStyle, itemStyle]);

  const menusClasses = useMemo(() => {
    return clsx(
      CLASSES.contextmenu,
      CLASSES.contextmenuSubmenuMenus,
      CLASSES.contextmenuSubmenuItem,
      {
        [CLASSES.contextmenuSubmenuMenusLeft]: placements.includes('left'),
        [CLASSES.contextmenuSubmenuMenusRight]: placements.includes('right'),
        [CLASSES.contextmenuSubmenuMenusTop]: placements.includes('top'),
        [CLASSES.contextmenuSubmenuMenusBottom]: placements.includes('bottom'),
      }
    );
  }, [placements]);

  const renderIcon = useMemo(() => {
    if (!icon) return;
    return typeof icon === 'function' ? icon(props as MenuItemType) : icon;
  }, [icon]);
  const renderLabel = useMemo(() => {
    if (!label) return;
    return typeof label === 'function' ? label(props as MenuItemType) : label;
  }, [label]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    if (disabled) return;
    setHover(true);
    const el = submenuRef.current;
    if (!el) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const width = el.clientWidth,
      height = el.clientHeight;
    const x = rect.right + width >= window.innerWidth ? 'left' : 'right';
    const y = rect.bottom + height >= window.innerHeight ? 'bottom' : 'top';
    setPlacements([...placements, x, y]);
  };
  const handleMouseLeave = () => {
    if (disabled) return;
    setHover(false);
  };

  const renderSubmenu = () => {
    if (!hover) return;
    if (
      typeof children === 'undefined' ||
      (Array.isArray(children) && children?.length === 0)
    ) {
      return;
    }
    return (
      <div ref={submenuRef} className={menusClasses}>
        <ul>
          {children.map((item) => {
            return (
              <MenuItem
                {...item}
                key={item.id ?? Math.random().toString(36).slice(2)}
              />
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <li
      className={classes}
      style={getStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={CLASSES.contextmenuItemPrefix}>
        {icon && (
          <span className={CLASSES.contextmenuItemPrefixIcon}>
            {renderIcon}
          </span>
        )}
        {label && (
          <span className={CLASSES.contextmenuItemPrefixLabel}>
            {renderLabel}
          </span>
        )}
      </div>
      <span className={CLASSES.contextmenuItemSuffix}>
        <svg
          className="icon w-contextmenu-item__suffix-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4415"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="200"
          height="200"
          fill="currentColor"
        >
          <title>arrow-right</title>
          <path
            d="M297.106 904.322c-14.158 14.324-14.158 37.392 0 51.682 14.158 14.29 37.03 14.324 51.154 0l413.458-417.518c14.158-14.324 14.158-37.426 0-51.682L348.26 69.222c-14.158-14.324-37.03-14.324-51.154 0s-14.158 37.392 0 51.682l377.022 391.71C674.128 512.612 297.106 904.322 297.106 904.322z"
            p-id="4416"
          />
        </svg>
      </span>
      {renderSubmenu()}
    </li>
  );
}
