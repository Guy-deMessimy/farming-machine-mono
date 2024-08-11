import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { Tab } from '@mui/base/Tab';
import './styles.scss';

interface TabData {
  value: number;
  label: string;
  path: string;
}

const tabsData: TabData[] = [
  { value: 1, label: 'Machines', path: '/machines' },
  { value: 2, label: 'Services', path: '/category' },
  { value: 3, label: 'Rent', path: '/rent' },
  { value: 4, label: 'Share', path: '/share' },
  { value: 5, label: 'Blog', path: '/blog' },
  { value: 6, label: 'Configuration', path: '/configuration' },
];

const TabsComponent: FC = () => {
  return (
    <Tabs className="tabs" defaultValue={1}>
      <TabsList className="tablist">
        {tabsData.map((tab) => (
          <Tab key={tab.value} className="tab" value={tab.value}>
            <NavLink className="link" to={tab.path}>
              {tab.label}
            </NavLink>
          </Tab>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TabsComponent;
