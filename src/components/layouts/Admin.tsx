import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from '@/assets/logo.svg';
import SidebarItem from '@/components/SidebarItem';
import Logout from '@/components/Logout';
import { LuUsers } from 'react-icons/lu';
import { BiCategory } from 'react-icons/bi';
import { IoStorefrontOutline } from 'react-icons/io5';

export default function Admin() {
  const menus = [
    { name: '유저 관리', icon: <LuUsers />, path: '/admin/users' },
    { name: '카테고리 관리', icon: <BiCategory />, path: '/admin/categories' },
    { name: '팝업스토어 관리', icon: <IoStorefrontOutline />, path: '/admin/stores' },
  ]

  return (
    <AdminLayout>
      <Side>
        <div>
          <div id='logo'>
            <img src={logoImg} alt='logo' /><span>사용자 아이디</span>
          </div>
          <Menu>
            {menus.map((menu, index) => (
              <SidebarItem key={index} menu={menu} />
            ))}
          </Menu>
        </div>
        <Logout />
      </Side>
      <Content>
        <Outlet />
      </Content>
    </AdminLayout>
  );

}

const AdminLayout = styled.div`
display: flex;
flex-direction: row;
`

const Side = styled.div`
width:220px;
height:100vh;
background-color: #e4edff;
padding: 20px;
box-sizing:border-box;
position: sticky;
left: 0;
display: flex;
flex-direction: column;
justify-content: space-between;

#logo {
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
    white-space: nowrap;
    img {
      width: 2rem;
      margin-right: 10px;
    }
    span {
    padding-left: 16px;
  }
  }
`;

const Menu = styled.div`
  margin-top: 42px;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  padding: 90px;
  flex-direction: column;
  flex: 1;
`