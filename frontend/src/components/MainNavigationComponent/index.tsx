import { useMemo } from 'react';
import { Button } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import type { MenuProps } from 'antd';
// Components
import FarmingMachineLogo from '../AssetPictosComponent/iconLogo/index';
import User from '../AssetPictosComponent/iconUser/index';
import DropdownMenu from '../MenuComponent/index';
// Store
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/user/selectors';
// UI and assets
import './styles.scss';
import { Fragment } from 'react/jsx-runtime';

const MainNavigationComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const { user, isAuthenticated } = useAppSelector(selectUser);

  const authUrl = useMemo(() => `/auth?mode=${isLogin ? 'signup' : 'login'}`, [isLogin]);

  const items: MenuProps['items'] = [
    {
      label: <div onClick={() => navigate('/engines')}>Engines</div>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <div onClick={() => navigate('/services')}>Services</div>,
      key: '1',
      disabled: true,
    },
    {
      label: <div onClick={() => navigate('/rent')}>Rent</div>,
      key: '2',
      disabled: true,
    },
    {
      label: <div onClick={() => navigate('/share')}>Share</div>,
      key: '3',
      disabled: true,
    },
    {
      label: <div onClick={() => navigate('/blog')}>Blog</div>,
      key: '4',
      disabled: true,
    },
    {
      label: <div onClick={() => navigate('/configurations')}>Configuration</div>,
      key: '5',
      disabled: true,
    },
  ];

  return (
    <header className="header">
      <DropdownMenu items={items} />
      <FarmingMachineLogo alt={'logo'} title={'logo_farming_machine'} width="65px" height="65px" path={'/'} />
      <h3 className="baseline"> trouvez votre farming machine</h3>
      <div className="button-group">
        <User alt={'logo'} title={'logo_farming'} width="30px" height="30px" path={''} />
        {!isAuthenticated && (
          <Button className="button">
            <Link to={authUrl}>{isLogin ? 'Inscription' : 'Connexion'}</Link>
          </Button>
        )}

        {isAuthenticated && (
          <Fragment>
            <>|</>
            <span>{user?.email}</span>
            <Button type="primary" className="button" onClick={() => navigate('/logout')}>
              Logout
            </Button>
          </Fragment>
        )}
      </div>
    </header>
  );
};

export default MainNavigationComponent;
