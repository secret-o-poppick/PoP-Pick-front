import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface SidebarItemProps {
  menu: { name: string; icon: JSX.Element; path: string };
}

const SidebarItem: React.FC<SidebarItemProps> = ({ menu }) => {
  return (
    <NavItem to={menu.path}>
      {menu.icon}
      {menu.name}
    </NavItem>
  );
};

const NavItem = styled(NavLink)`
  color: #000;
  padding: 0 12px;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 48px;
  column-gap: 1.2em;
  border-radius: 14px;
  line-height: 120%;
  word-break: keep-all;

  &:hover {
    background-color: #fffffe;
    font-weight: bold;
      }
  &:focus {
    background-color: #FFF6E4;
    font-weight: bold;
      }
      `

export default SidebarItem;