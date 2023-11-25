import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import FullLayout from '../layouts/FullLayout/FullLayout';
import NoFooterLayout from '../layouts/NoFooterLayout/NoFooterLayout';
import PersonalLayout from '../layouts/PersonalLayout/PersonalLayout';

import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import CartPage from '../pages/CartPage/CartPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage';
import ProductsPage from '../pages/ProductPage/ProductsPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import PaymentPage from '../pages/PaymentPage/PaymentPage';
import ChatPage from '../pages/ChatPage/ChatPage';
import ShopPage from '../pages/ShopPage/ShopPage';

import Navbar from '../components/NavBar/NavBar';

export const routes = [
    {
        path: '/',
        page: HomePage,
        layout: DefaultLayout,
    },
    {
        path: '/order/payment',
        page: PaymentPage,
        layout: DefaultLayout,
    },
    {
        path: '/cart',
        page: CartPage,
        layout: DefaultLayout,
    },
    {
        path: '/chat',
        page: ChatPage,
        layout: NoFooterLayout,
    },
    {
        path: '/order',
        page: OrderPage,
        layout: FullLayout,
    },
    {
        path: '/product',
        page: ProductsPage,
        layout: DefaultLayout,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        layout: null,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        layout: null,
    },
    {
        path: '/system/admin',
        page: AdminPage,
        layout: DefaultLayout,
        isPrivate: true,
    },
    {
        path: '/system/shop',
        page: ShopPage,
        layout: DefaultLayout,
        isSeller: true,
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        layout: FullLayout,
        navbar: Navbar,
    },
    {
        path: '/products/:id',
        page: ProductDetailPage,
        layout: DefaultLayout,
    },
    {
        path: '/user/:id',
        page: ProfilePage,
        layout: PersonalLayout,
    },
    {
        path: '/*',
        page: NotFoundPage,
        layout: null,
    },
];
