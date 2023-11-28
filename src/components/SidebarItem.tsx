import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  menu: { name: string; icon: JSX.Element; path: string };
}

const SidebarItem: React.FC<SidebarItemProps> = ({ menu }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(menu.path);

  return (
    <NavItem to={menu.path} isActive={isActive}>
      {menu.icon}
      {menu.name}
    </NavItem>
  );
};


const NavItem = styled(NavLink) <{ isActive: boolean }>`
  color: #000;
  background-color: ${(props) => (props.isActive ? '#FFF6E4' : 'transparent')};
  font-weight: ${(props) => (props.isActive ? 'bold' : '')};
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
      }
  &:focus {
    background-color: #FFF6E4;
    font-weight: bold;
      }
      `

export default SidebarItem;