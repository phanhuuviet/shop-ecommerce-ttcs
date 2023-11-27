import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import {
    MessageOutlined,
    AppstoreOutlined,
    UserOutlined,
    ClockCircleOutlined,
    PhoneOutlined,
    MailOutlined,
    PlusOutlined,
} from '@ant-design/icons';

import styles from './ShopPage.module.scss';
import Button from '../../components/Button/Button';
import CardProduct from '../../components/CardProduct/CardProduct';
import * as userService from '../../services/userServices';

const cx = classNames.bind(styles);

export default function ShopPage() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const dataShop = userService.getUser(id);
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-header')}>
                <div className={cx('box')}>
                    <div
                        className={cx('wrapper-shop')}
                        style={{
                            backgroundImage: `url(https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-bia-dep-10.jpg)`,
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className={cx('shop-avatar')}>
                            <img src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />
                            <p className={cx('shop-name')}>Shop's name</p>
                        </div>
                        <div className={cx('shop-interact')}>
                            <Button addIcon={<PlusOutlined />} leftIcon small outline className={cx('button-interact')}>
                                Follow
                            </Button>
                            <Button
                                addIcon={<MessageOutlined />}
                                leftIcon
                                small
                                outline
                                className={cx('button-interact')}
                            >
                                Chat
                            </Button>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('block')}>
                            <AppstoreOutlined />
                            <span>Products:</span>
                            <span className={cx('block-content')}>300</span>
                        </div>
                        <div className={cx('block')}>
                            <UserOutlined />
                            <span>Following: </span>
                            <span className={cx('block-content')}>10</span>
                        </div>
                        <div className={cx('block')}>
                            <MessageOutlined />
                            <span>Response Time: </span>
                            <span className={cx('block-content')}>In a few hours</span>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('block')}>
                            <ClockCircleOutlined />
                            <span>Joined: </span>
                            <span className={cx('block-content')}>300</span>
                        </div>
                        <div className={cx('block')}>
                            <PhoneOutlined />
                            <span>Phone: </span>
                            <span className={cx('block-content')}>10</span>
                        </div>
                        <div className={cx('block')}>
                            <MailOutlined />
                            <span>Email: </span>
                            <span className={cx('block-content')}>phanhuuviet@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper-tab')}>
                    <div className={cx('tabs', 'active')}>Home</div>
                    <div className={cx('tabs')}>About Shop</div>
                    <div className={cx('tabs')}>All Product</div>
                </div>
            </div>
            <div className={cx('wrapper-content')}>
                <div className={cx('block-type')}>
                    <h2>Am thanh phu kien</h2>
                    <div className={cx('list-product')}>
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                    </div>
                </div>
                <div className={cx('block-type')}>
                    <h2>Am thanh phu kien</h2>
                    <div className={cx('list-product')}>
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                    </div>
                </div>
                <div className={cx('block-type')}>
                    <h2>Am thanh phu kien</h2>
                    <div className={cx('list-product')}>
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                    </div>
                </div>
            </div>
        </div>
    );
}
