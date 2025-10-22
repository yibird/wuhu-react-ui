import { ContextMenu, type ItemType } from '../../../packages/context-menu/src';
export default function Demo01() {
  const items: ItemType[] = [
    {
      id: 'xxx',
      label: () => 'item1',
    },
    {
      id: 'xxx2',
      label: 'item2',
    },
    {
      type: 'divider',
    },
    {
      id: 'xxx3',
      label: 'item3',
      children: [
        {
          id: 'xxx3-1',
          label: 'item3-1',
        },
        {
          id: 'xxx3-2',
          label: 'item3-2',
        },
      ],
    },
  ];
  return (
    <div>
      <ContextMenu
        items={items}
        activeStyle={{ backgroundColor: 'red', color: '#fff' }}
      >
        <div style={{ width: 200, height: 200, backgroundColor: '#F5F5F5' }}>
          ContextMenu
        </div>
      </ContextMenu>
    </div>
  );
}
