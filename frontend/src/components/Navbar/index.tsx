import './Navbar.css';
import { NavLinkItem, ToggleCardInfo } from './_components';

const routes = [
  {
    path: '/',
    name: 'Dashboard'
  },
  {
    path: '/profile',
    name: 'Profile'
  },
  {
    path: '/statements',
    name: 'Statements'
  }
];

export const Navbar = () => {
  return (
    <nav>
      <ul>
        {routes.map((route) => (
          <NavLinkItem key={route.path} to={route.path} label={route.name} />
        ))}
      </ul>
      <ToggleCardInfo />
    </nav>
  );
};
