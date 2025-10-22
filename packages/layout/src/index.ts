import { InternalLayout, Header, Content, Sider } from './components';
type InternalLayoutType = typeof InternalLayout;

type CompoundedComponent = InternalLayoutType & {
  Header: typeof Header;
  Content: typeof Content;
  Sider: typeof Sider;
};
export const Layout = InternalLayout as CompoundedComponent;
Layout.Header = Header;
Layout.Content = Content;
Layout.Sider = Sider;

export type {
  LayoutProps,
  LayoutSiderProps,
  LayoutHeaderProps,
  LayoutContentProps,
} from './components/types';
