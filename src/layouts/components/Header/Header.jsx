import { Badge, Col, Popover, Row } from 'antd';
import classNames from 'classnames/bind';
import Search from 'antd/es/input/Search';
import { CaretDownOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
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
    };

    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

    const handleNavigateHome = () => {
        navigate('/');
    };

    const handleNavigateAdmin = () => {
        navigate('/system/admin');
    };

    const handleNavigateProfile = () => {
        navigate(`/user/${user?.name}`);
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
                    User information
                </p>
                {user?.isAdmin && (
                    <p className={cx('text-option-header')} onClick={handleNavigateAdmin}>
                        System management
                    </p>
                )}
                <p className={cx('text-option-header')} onClick={handleNavigateMyOrder}>
                    Order management
                </p>
                <p className={cx('text-option-header')} onClick={handleLogout}>
                    Log out
                </p>
            </div>
        );
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
                            placeholder="Search product..."
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                            enter="true"
                        />
                    </Col>
                    <Col span={8} className={cx('wrapper-account')}>
                        <div className={cx('wrapper-home')} onClick={handleNavigateHome}>
                            <HomeOutlined style={{ fontSize: '3rem', color: '#ffffff' }} />
                            <span className={cx('ml-10', 'text-header')}>Home</span>
                        </div>

                        <Loading isLoading={loading}>
                            <div className={cx('auth-user')}>
                                <UserOutlined
                                    onClick={user?.name ? undefined : handleNavigateLogin}
                                    style={{ fontSize: '3rem', color: '#ffffff', cursor: 'pointer' }}
                                />
                                {user?.name ? (
                                    <>
                                        <Popover content={content} trigger="click">
                                            <div className={cx('username', 'text-header')}>{username}</div>
                                        </Popover>
                                    </>
                                ) : (
                                    <div
                                        onClick={handleNavigateLogin}
                                        className={cx('account', 'ml-10', 'text-header')}
                                    >
                                        <span>Sign-in/Sign-up</span>
                                        <span>
                                            Account
                                            <CaretDownOutlined />
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Loading>

                        <div onClick={handleNavigateOrder} className={cx('cart-icon')}>
                            <Badge count={order?.orderItems?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '3rem', color: '#ffffff' }} />
                            </Badge>
                            <span className={cx('ml-10', 'text-header')}>Cart</span>
                        </div>
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
