import { createContext } from 'react';

export type LayoutContext = { gutter: number | string };

export const LayoutContext = createContext<LayoutContext>({ gutter: 10 });
