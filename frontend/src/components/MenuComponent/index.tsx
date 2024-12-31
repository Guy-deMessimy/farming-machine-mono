import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/interface';
import { Dropdown, Space } from 'antd';

interface ReportComponentProps {
  items: ItemType[];
}

const DropdownMenu: React.FC<ReportComponentProps> = ({ items }) => {
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;
