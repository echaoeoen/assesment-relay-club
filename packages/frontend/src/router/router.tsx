import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../page/LoginPage';
import SignupPage from '../page/SignupPage';
import Layout from '../layout/Layout';
import HomePage from '../page/HomePage';
import ProductPage from '../page/product/ProductPage';
import CartPage from '../page/cart/CartPage';
import CheckouPage from '../page/checkout/CheckoutPage';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/products',
        element: <ProductPage />,
      },
      {
        path: '/carts',
        element: <CartPage />,
      },
      {
        path: '/checkout',
        element: <CheckouPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
]);
