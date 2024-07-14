import FarmingMachineLogo from '../AssetPictosComponent/iconLogo/index';
import User from '../AssetPictosComponent/iconUser/index';
import { Button } from '@mui/base/Button';
import './styles.scss';
import TabsComponent from '../TabsComponent';

const MainNavigationComponent = () => {
  return (
    <header className="header">
      <FarmingMachineLogo alt={'logo'} title={'logo_farming_machine'} width="65px" height="65px" />
      <TabsComponent />
      <div className="button-group">
        <User alt={'logo'} title={'logo_farming'} width="30px" height="30px" />
        <Button className="button">Connexion</Button>
        <>|</>
        <Button className="button">Inscription</Button>
      </div>
    </header>
  );
};

export default MainNavigationComponent;
