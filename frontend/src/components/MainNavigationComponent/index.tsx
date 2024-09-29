import { Button } from '@mui/base/Button';
// Components
import FarmingMachineLogo from '../AssetPictosComponent/iconLogo/index';
import User from '../AssetPictosComponent/iconUser/index';
import DropdownMenu from '../MenuComponent';
// Utils
import { TabDataModel } from '../utils/model-component';
// UI and assets
import './styles.scss';

const myTabsData: TabDataModel[] = [
  { value: 1, label: 'Engines', path: '/engines' },
  { value: 2, label: 'Services', path: '/category' },
  { value: 3, label: 'Rent', path: '/rent' },
  { value: 4, label: 'Share', path: '/share' },
  { value: 5, label: 'Blog', path: '/blog' },
  { value: 6, label: 'Configuration', path: '/configuration' },
];

const MainNavigationComponent = () => {
  return (
    <header className="header">
      <DropdownMenu tabsData={myTabsData} />
      <FarmingMachineLogo alt={'logo'} title={'logo_farming_machine'} width="65px" height="65px" path={'/'} />
      <h3 className="baseline"> trouvez votre farming machine</h3>
      <div className="button-group">
        <User alt={'logo'} title={'logo_farming'} width="30px" height="30px" path={''} />
        <Button className="button">Connexion</Button>
        <>|</>
        <Button className="button">Inscription</Button>
      </div>
    </header>
  );
};

export default MainNavigationComponent;
