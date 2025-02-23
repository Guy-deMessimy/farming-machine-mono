import { Button } from 'antd';
import { Form, Link, useNavigate, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import type { MenuProps } from 'antd';
// Components
import FarmingMachineLogo from '../AssetPictosComponent/iconLogo/index';
import User from '../AssetPictosComponent/iconUser/index';
import DropdownMenu from '../MenuComponent/index';
// UI and assets
import './styles.scss';
import { Fragment } from 'react/jsx-runtime';

const MainNavigationComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const token = useRouteLoaderData('root') as string | null;

  const items: MenuProps['items'] = [
    {
      label: <div onClick={() => navigate('/engines')}>Engines</div>,
      key: '0',
    },
    {
      label: <div onClick={() => navigate('/auth?mode=login')}>Connexion</div>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <div onClick={() => navigate('/services')}>Services</div>,
      key: '2',
      disabled: true,
    },
    {
      label: <div onClick={() => navigate('/rent')}>Rent</div>,
      key: '3',
      disabled: true,
    },
    {
      label: <div onClick={() => navigate('/share')}>Share</div>,
      key: '4',
      disabled: true,
    },
    {
      label: <div onClick={() => navigate('/blog')}>Blog</div>,
      key: '5',
      disabled: true,
    },
    {
      label: <div onClick={() => navigate('/configurations')}>Configuration</div>,
      key: '6',
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
        {!token && (
          <Button className="button">
            <Link to={`auth?mode=${isLogin ? 'signup' : 'login'}`}>{isLogin ? 'Inscription' : 'Connexion'}</Link>
          </Button>
        )}

        {token && (
          <Fragment>
            <>|</>
            <Form action="/logout" method="post">
              <Button type="primary" htmlType="submit" className="button">
                Logout
              </Button>
            </Form>
          </Fragment>
        )}
      </div>
    </header>
  );
};

export default MainNavigationComponent;
