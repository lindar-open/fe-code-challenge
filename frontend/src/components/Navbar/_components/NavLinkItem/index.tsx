import { memo } from 'react';
import { NavLink } from 'react-router-dom';

type NavLinkItemProps = {
  to: string;
  label: string;
};

export const NavLinkItem = memo(({ to, label }: NavLinkItemProps) => {
  return (
    <li>
      <NavLink to={to}>{label}</NavLink>
    </li>
  );
});
