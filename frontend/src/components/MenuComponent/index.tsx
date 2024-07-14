import React from 'react';
import { Dropdown, MenuButton, Menu, MenuItem, MenuListboxSlotProps } from '@mui/base';
import { useNavigate } from 'react-router-dom';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import './styles.scss';

interface TabData {
  value: number;
  label: string;
  path: string;
}

interface DropdownMenuProps {
  tabsData: TabData[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ tabsData }) => {
  const navigate = useNavigate();

  const createHandleMenuClick = (path: string) => () => {
    navigate(path);
  };

  return (
    <Dropdown>
      <MenuButton className="menu-button">Navigation</MenuButton>
      <Menu className="menu" slots={{ listbox: AnimatedListbox }}>
        {tabsData.map((tab) => (
          <MenuItem className="menu-item" key={tab.value} onClick={createHandleMenuClick(tab.path)}>
            {tab.label}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

const AnimatedListbox = React.forwardRef(function AnimatedListbox(
  props: MenuListboxSlotProps,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext === null) {
    throw new Error('The `AnimatedListbox` component cannot be rendered outside a `Popup` component');
  }

  const verticalPlacement = popupContext.placement.split('-')[0];

  return (
    <CssTransition className={`placement-${verticalPlacement}`} enterClassName="open" exitClassName="closed">
      <ul className="list-box" {...other} ref={ref} />
    </CssTransition>
  );
});

export default DropdownMenu;
