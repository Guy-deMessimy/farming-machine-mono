import FarmingMachineLogo from '../AssetPictos/iconLogo/index';
// import User from '../AssetPictos/iconUser/index';
// import * as Styled from './styled';
import './styles.scss';

const MainNavigation = () => {
  return (
    <header className="header">
      <FarmingMachineLogo alt={'logo'} title={'logo_farming_machine'} width="65px" height="65px" />
    </header>
    // <Styled.Header>
    //   <div>
    //     <FarmingMachineLogo alt={'logo'} title={'logo_farming_machine'} width="65px" height="65px" />
    //   </div>
    //   <Styled.Tabs defaultValue={1}>
    //     <Styled.TabsList>
    //       <Styled.Tab value={1}>
    //         <Styled.NavLink to="/machines">Machines</Styled.NavLink>
    //       </Styled.Tab>
    //       <Styled.Tab value={2}>
    //         <Styled.NavLink to="/category">Services</Styled.NavLink>
    //       </Styled.Tab>
    //       <Styled.Tab value={3}>
    //         <Styled.NavLink to="/rent">Rent</Styled.NavLink>
    //       </Styled.Tab>
    //       <Styled.Tab value={4}>
    //         <Styled.NavLink to="/share">Share</Styled.NavLink>
    //       </Styled.Tab>
    //       <Styled.Tab value={5}>
    //         <Styled.NavLink to="/blog">Blog</Styled.NavLink>
    //       </Styled.Tab>
    //       <Styled.Tab value={6}>
    //         <Styled.NavLink to="/configuration">Configuration</Styled.NavLink>
    //       </Styled.Tab>
    //     </Styled.TabsList>
    //     {/* <TabPanel value={1}>First page</TabPanel>
    //     <TabPanel value={2}>Second page</TabPanel>
    //     <TabPanel value={3}>Third page</TabPanel> */}
    //   </Styled.Tabs>
    //   <Styled.ButtonGroup>
    //     <User alt={'logo'} title={'logo_farming'} width="30px" height="30px" />
    //     <Styled.Button>Connexion</Styled.Button>
    //     <>|</>
    //     <Styled.Button>Inscription</Styled.Button>
    //   </Styled.ButtonGroup>
    // </Styled.Header>
  );
};
export default MainNavigation;
