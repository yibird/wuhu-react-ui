import { Layout } from '@zhouchengfeng/wuhu-react-ui-layout';

export default function Demo01() {
  return (
    <div style={{ height: 400, border: '1px solid red' }}>
      <Layout>
        <Layout.Sider
          width={200}
          collapsible
          style={{ backgroundColor: '#67c23a' }}
        >
          LayoutSider
        </Layout.Sider>
        <Layout direction="vertical">
          <Layout.Header
            height={100}
            collapsible
            style={{ backgroundColor: '#e6a23c' }}
          >
            LayoutHeader
          </Layout.Header>
          <Layout.Content style={{ backgroundColor: '#f56c6c' }}>
            LayoutContent
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
}
