import React from 'react';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ContextMenuContext } from './context';
import type {
  ContextMenuProps,
  MenuDividerType,
  MenuItemType,
  MenuProps,
  SubMenuType,
} from './types';
import '../style/index.less';
import clsx from 'clsx';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import Divider from './Divider';

const Menu = React.memo(
  ({
    items = [],
    visible,
    position,
    contextMenuRef,
    className,
    style = {},
  }: MenuProps) => {
    const classes = clsx(
      'w-contextmenu',
      `w-contextmenu-${visible ? 'show' : 'hide'}`,
      className
    );

    const renderItems = useMemo(() => {
      return items.map((item) => {
        const key = Math.random().toString(36).slice(2);
        if ((item as MenuDividerType).type === 'divider') {
          return <Divider {...(item as MenuDividerType)} key={key} />;
        }
        if ((item as SubMenuType).children) {
          return <SubMenu {...(item as SubMenuType)} key={key} />;
        }
        return <MenuItem {...(item as MenuItemType)} key={key} />;
      });
    }, [items]);

    return createPortal(
      <ul
        ref={contextMenuRef}
        className={classes}
        style={{ ...style, ...position }}
      >
        {renderItems}
      </ul>,
      document.body
    );
  }
);

export default function ContextMenu({
  items = [],
  preventHideOnScroll,
  preventHideOnResize,
  children,
  itemClassName,
  itemStyle,
  activeClassName = '',
  activeStyle,
  className,
  menuClassName,
  menuStyle,
  style,
  onClick,
}: ContextMenuProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleShow = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = contextMenuRef?.current;
    if (!el) return;
    const width = el.clientWidth,
      height = el.clientHeight;
    const newPosition = { left: e.pageX, top: e.pageY };
    if (window.innerHeight - e.pageY < height) {
      newPosition.top -= height;
    }
    if (window.innerWidth - e.pageX < width) {
      newPosition.left -= width;
    }
    setPosition(newPosition);
    setVisible(true);
  };

  const handleHide = () => {
    setVisible(false);
  };

  const handleOutsideClick = (e: Event) => {
    const el = contextMenuRef?.current;
    if (!el) return;
    if (!el.contains(e.target as Node)) {
      handleHide();
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleShow(e);
  };

  const handleClickMenuItem = (item: MenuItemType) => {
    onClick?.(item);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    if (!preventHideOnScroll) {
      document.addEventListener('scroll', handleHide);
    }
    if (!preventHideOnResize) {
      window.addEventListener('resize', handleHide);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      if (!preventHideOnScroll) {
        document.removeEventListener('scroll', handleHide);
      }
      if (!preventHideOnResize) {
        window.removeEventListener('resize', handleHide);
      }
    };
  }, []);

  const classes = clsx('w-context-menu-trigger', className);

  return (
    <ContextMenuContext.Provider
      value={{
        activeClassName,
        activeStyle,
        itemClassName,
        itemStyle,
        handleHide,
        handleClickMenuItem,
      }}
    >
      <div
        ref={triggerRef}
        className={classes}
        onContextMenu={handleContextMenu}
        style={style}
      >
        <Menu
          items={items}
          visible={visible}
          position={position}
          contextMenuRef={contextMenuRef}
          className={menuClassName}
          style={menuStyle}
        />
        {children}
      </div>
    </ContextMenuContext.Provider>
  );
}
