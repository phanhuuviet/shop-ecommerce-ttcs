import { Badge, Col, Popover, Row } from 'antd';
import classNames from 'classnames/bind';
import Search from 'antd/es/input/Search';
import {
    CaretDownOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    WechatOutlined,
    HomeOutlined,
    SettingOutlined,
    ShoppingOutlined,
    DownSquareOutlined,
    LoginOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import images from '../../../assets/images';
import TypeProduct from '../../../components/TypeProduct/TypeProduct';
import * as authService from '../../../services/authService';
import { resetUser } from '../../../redux/slice/userSlice';
import Loading from '../../../components/Loading/Loading';
import { searchProduct } from '../../../redux/slice/productSlice';
import * as role from '../../../constants/index';

const cx = classNames.bind(styles);

function Header() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.name) {
            setUsername(user?.name);
        }
    }, [user?.name, username]);

    const onSearch = (value) => {
        dispatch(searchProduct(value));
        handleScrollSearch();
    };

    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

    const handleNavigateHome = () => {
        navigate('/');
    };

    const handleNavigateChat = () => {
        navigate('/chat');
    };

    const handleNavigateAdmin = () => {
        navigate('/system/admin');
    };

    const handleNavigateProfile = () => {
        navigate(`/user/${user?.name}`);
    };

    const handleNavigateShop = () => {
        navigate(`/system/shop`);
    };

    const handleNavigateOrder = () => {
        if (user?.id) {
            navigate('/cart');
        } else {
            navigate('/sign-in');
        }
    };

    const handleNavigateMyOrder = () => {
        navigate('/order');
    };

    const handleLogout = async () => {
        setLoading(true);
        await authService.logoutUser();
        dispatch(resetUser());
        localStorage.removeItem('access_token');
        navigate('/sign-in');
        setLoading(false);
    };

    const content = () => {
        return (
            <div>
                <p className={cx('text-option-header')} onClick={handleNavigateProfile}>
                    <UserOutlined />
                    Thông tin người dùng
                </p>
                {user?.role === role.ROLE_ADMIN && (
                    <p className={cx('text-option-header')} onClick={handleNavigateAdmin}>
                        <SettingOutlined />
                        Quản lý hệ thống
                    </p>
                )}
                {(user?.role === role.ROLE_SELLER || user?.role === role.ROLE_ADMIN) && (
                    <p className={cx('text-option-header')} onClick={handleNavigateShop}>
                        <ShoppingOutlined />
                        Quản lý cửa hàng
                    </p>
                )}
                <p className={cx('text-option-header')} onClick={handleNavigateMyOrder}>
                    <DownSquareOutlined />
                    Quản lý đơn hàng
                </p>
                <p className={cx('text-option-header')} onClick={handleLogout}>
                    <LoginOutlined />
                    Đăng xuất
                </p>
            </div>
        );
    };

    // const { ServicesRef } = props;

    // const handleScrollSearch = () => {
    //     window.scrollTo({
    //         top: ServicesRef,
    //         behavior: `smooth`,
    //     });
    // };

    const handleScrollSearch = () => {
        window.scrollTo({
            top: 635,
            behavior: `smooth`,
        });
    };

    return (
        <header className={cx('header')}>
            <div className={cx('wrapper')}>
                {/* Main row */}
                <Row className={cx('row-wrapper')}>
                    <Col span={4}>
                        <img onClick={handleNavigateHome} src={images.logo} alt="logo" className={cx('logo')} />
                    </Col>
                    <Col span={12}>
                        <Search
                            className={cx('search-input')}
                            placeholder="Tìm kiếm sản phẩm..."
                            allowClear
                            enterButton="Tìm kiếm"
                            size="large"
                            onSearch={onSearch}
                            enter="true"
                        />
                    </Col>
                    <Col span={8} className={cx('wrapper-account')}>
                        <div onClick={handleNavigateOrder} className={cx('cart-icon')}>
                            <Badge count={order?.orderItems?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '3rem', color: '#ffffff' }} />
                            </Badge>
                            <span className={cx('ml-10', 'text-header')}>Giỏ hàng</span>
                        </div>

                        {user?.name ? (
                            <div className={cx('wrapper-home')} onClick={handleNavigateChat}>
                                <WechatOutlined style={{ fontSize: '3rem', color: '#ffffff' }} />
                                <span className={cx('ml-10', 'text-header')}>Chat</span>
                            </div>
                        ) : (
                            <div className={cx('wrapper-home')} onClick={handleNavigateHome}>
                                <HomeOutlined style={{ fontSize: '3rem', color: '#ffffff' }} />
                                <span className={cx('ml-10', 'text-header')}>Trang chủ</span>
                            </div>
                        )}

                        <Loading isLoading={loading}>
                            <div className={cx('auth-user')}>
                                <UserOutlined
                                    onClick={user?.name ? undefined : handleNavigateLogin}
                                    style={{ fontSize: '3rem', color: '#ffffff', cursor: 'pointer' }}
                                />
                                {user?.name ? (
                                    <>
                                        <Popover content={content} trigger="click">
                                            <div className={cx('username', 'text-header')}>
                                                {username}
                                                <CaretDownOutlined />
                                            </div>
                                        </Popover>
                                    </>
                                ) : (
                                    <div
                                        onClick={handleNavigateLogin}
                                        className={cx('account', 'ml-10', 'text-header')}
                                    >
                                        <span>Đăng nhập/Đăng kí</span>
                                        <span>
                                            Tài khoản
                                            <CaretDownOutlined />
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Loading>
                    </Col>
                </Row>

                {/* Navigation row */}
                <Row className={cx('-mt-20')}>
                    <Col span={4}></Col>
                    <Col span={12}>
                        <TypeProduct />
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
        </header>
    );
}

export default Header;
