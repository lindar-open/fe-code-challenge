import { memo, useMemo } from 'react';
import styles from './Navbar.module.css';
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
] as const;

export const Navbar = memo(() => {
  const navItems = useMemo(() => 
    routes.map((route) => (
      <NavLinkItem
        key={route.path}
        to={route.path}
        label={route.name}
      />
    ))
  , []);

  return (
    <nav className={styles.root}>
      <ul className={styles.nav}>
        {navItems}
      </ul>
      <ToggleCardInfo />
    </nav>
  );
});

Navbar.displayName = 'Navbar';