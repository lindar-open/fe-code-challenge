import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavLinkItem.module.css';

interface NavLinkItemProps {
  to: string;
  label: string;
}

export const NavLinkItem = memo(({ to, label }: NavLinkItemProps) => (
  <li>
    <NavLink 
      to={to}
      className={({ isActive }) => 
        isActive ? styles.activeLink : styles.link
      }
    >
      {label}
    </NavLink>
  </li>
));

NavLinkItem.displayName = 'NavLinkItem';