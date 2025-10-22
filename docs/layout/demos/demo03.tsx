import { Layout } from '@zhouchengfeng/wuhu-react-ui-layout';

export default function Demo01() {
  return (
    <div style={{ height: 400, border: '1px solid red' }}>
      <Layout>
        <Layout.Sider
          width={200}
          collapsible
          style={{ backgroundColor: '#67c23a' }}
          trigger={
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 2,
                border: '1px solid red',
              }}
            />
          }
        >
          LayoutSider
        </Layout.Sider>
        <Layout direction="vertical">
          <Layout.Header
            collapsible
            style={{ backgroundColor: '#e6a23c' }}
            trigger={
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 2,
                  border: '1px solid red',
                }}
              />
            }
          >
            <div style={{ height: 200 }}>LayoutHeader</div>
          </Layout.Header>
          <Layout.Content style={{ backgroundColor: '#f56c6c' }}>
            LayoutContent
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
}
