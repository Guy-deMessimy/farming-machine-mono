import React, { FC } from 'react';
import { Dropdown, MenuButton, Menu, MenuItem, MenuListboxSlotProps, menuItemClasses } from '@mui/base';
import { useNavigate } from 'react-router-dom';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
// Utils
import { TabDataModel } from '../utils/model-component';
// Ui and assets
import './styles.scss';

interface DropdownMenuProps {
  tabsData: TabDataModel[];
}

const DropdownMenu: FC<DropdownMenuProps> = ({ tabsData }) => {
  const navigate = useNavigate();

  const createHandleMenuClick = (path: string) => () => {
    navigate(path);
  };

  return (
    <Dropdown>
      <MenuButton className="menu-button">Navigation</MenuButton>
      <Menu className="menu" slots={{ listbox: AnimatedListbox }}>
        {tabsData.map((tab) => (
          <MenuItem
            className={`menu-item ${menuItemClasses.disabled ? 'disabled' : ''}`}
            key={tab.value}
            onClick={createHandleMenuClick(tab.path)}
          >
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
      <ul {...other} ref={ref} />
    </CssTransition>
  );
});

export default DropdownMenu;
