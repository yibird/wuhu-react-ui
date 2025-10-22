import clsx from 'clsx';
import { CLASSES } from './constant';
import type { MenuDividerType } from './types';

export default function Divider({ dashed = false }: MenuDividerType) {
  const classes = clsx(CLASSES.contextmenuDivider, {
    [CLASSES.contextmenuDividerDashed]: dashed,
  });
  return <li className={classes} />;
}
