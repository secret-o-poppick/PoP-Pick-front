import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Layout from './components/layouts/Layout';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Main from './pages/User/Main';
import Stores from './pages/User/Stores';
import StoreDetail from './pages/User/StoreDetail';
import Map from './pages/User/Map';
import User from './pages/User/User';
import Application from './pages/User/Application';

import Admin from './components/layouts/Admin';

import AdminLogin from './pages/Admin/AdminLogin';
import AdminStores from './pages/Admin/AdminStores';
import AdminStoreDetail from './pages/Admin/AdminStoreDetail';
import AdminStoreEdit from './pages/Admin/AdminStoreEdit';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminUserDetail from './pages/Admin/AdminUserDetail';
import AdminUserUpdate from './pages/Admin/AdminUserUpdate';
import AdminUserCreate from './pages/Admin/AdminUserCreate';
import AdminUserAuth from './pages/Admin/AdminUserAuth';
import KakaoLogin from './pages/User/KakaoLogin';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* User */}
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<Main />} />
              <Route path='/stores' element={<Stores />} />
              <Route path='/stores/:storeId' element={<StoreDetail />} />
              <Route path='/map' element={<Map />} />
              <Route path='/application' element={<Application />} />
              <Route path='/kakaoLogin' element={<KakaoLogin />} />

              <Route path='/' element={<PrivateRoute />}>
                <Route path='/user' element={<User />} />
              </Route>
            </Route>

            {/* Admin */}
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin' element={<Admin />}>
              {/* 유저 관리 */}
              <Route path='users' element={<AdminUsers />} />
              <Route path='users/:userId' element={<AdminUserDetail />} />
              <Route
                path='users/:userId/update'
                element={<AdminUserUpdate />}
              />
              <Route path='users/create' element={<AdminUserCreate />} />
              <Route path='users/auth' element={<AdminUserAuth />} />
              {/* 카테고리 관리 */}
              <Route path='categories' element={<AdminCategories />} />
              {/* 팝업스토어 관리 */}
              <Route path='stores' element={<AdminStores />} />
              <Route path='stores/:storeId' element={<AdminStoreDetail />} />
              <Route
                path='stores/:storeId/update'
                element={<AdminStoreEdit />}
              />
              <Route path='stores/create' element={<AdminStoreEdit />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Outlet />
      </AuthProvider>
    </>
  );
}

export default App;
