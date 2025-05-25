import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/slices/auth/selectors';

interface Props {
  children: JSX.Element;
}

const PublicOnlyRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAppSelector(selectUser);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
