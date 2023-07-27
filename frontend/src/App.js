import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

// user components
import RoutesWithUserChatComponent from './components/user/RoutesWithUserChatComponent';

// Pages: 
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductListPage from './pages/ProductListPage';
import RegisterPage from './pages/RegisterPage';

// Protected user pages:
import ProtectedRoutesComponent from './components/ProtectedRoutesComponent';
import UserProfiilePage from './pages/user/UserProfilePage';
import UserOrdersPage from './pages/user/UserOrdersPage';
import UserOrderDetailsPage from './pages/user/UserOrderDetailsPage';
import UserCartDetailsPage from './pages/user/UserCartDetailsPage';

// Protected admin pages: 
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminEditUserPage from './pages/admin/AdminEditUserPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminChatsPage from './pages/admin/AdminChatsPage';
import AdminCreateProductPage from './pages/admin/AdminCreateProductPage';
import AdminEditProductPage from './pages/admin/AdminEditProductPage';
import AdminOrderDetailsPage from './pages/admin/AdminOrderDetailsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';

// Util
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
    {/* Importing ScrollToTop to be included in all of the pages */}
    <ScrollToTop />
      <HeaderComponent />
      <Routes>
        {/* Creating an component that has all routes inside of it */}
        {/* This will allow users to have the chat component and admin will not have access */}
        <Route element={<RoutesWithUserChatComponent />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product-list/category/:categoryName" element={<ProductListPage />} />
          <Route path="/product-details/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element="Page not exists 404" />
        </Route>

        {/* user protected routes */}
        {/* pass the admin prop to the ProtectedRoutesComponent */}
        <Route element={<ProtectedRoutesComponent admin={false} />}  >
          <Route path="/user" element={<UserProfiilePage />} />
          <Route path="/user/my-orders" element={<UserOrdersPage />} />
          <Route path="/user/cart-details" element={<UserCartDetailsPage />} />
          <Route path="/user/order-details/:id" element={<UserOrderDetailsPage />} />
        </Route>



        {/* admin protected routes */}
        {/* pass the admin prop to the ProtectedRoutesComponent */}
        <Route element={<ProtectedRoutesComponent admin={true} />} >
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/edit-user/:id" element={<AdminEditUserPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/create-new-product" element={<AdminCreateProductPage />} />
          <Route path="/admin/edit-product/:id" element={<AdminEditProductPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/order-details/:id" element={<AdminOrderDetailsPage />} /> 
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/chats" element={<AdminChatsPage />} />
        </Route>

      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
