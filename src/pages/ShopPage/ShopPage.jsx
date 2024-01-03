import { useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import {
    MessageOutlined,
    AppstoreOutlined,
    UserOutlined,
    ClockCircleOutlined,
    PhoneOutlined,
    MailOutlined,
    PlusOutlined,
    HeartOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';
import { useQuery } from 'react-query';
import { format } from 'timeago.js';

import styles from './ShopPage.module.scss';
import Button from '../../components/Button/Button';
import CardProduct from '../../components/CardProduct/CardProduct';
import * as userService from '../../services/userServices';
import Loading from '../../components/Loading/Loading';
import images from '../../assets/images';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

export default function ShopPage() {
    const user = useSelector((state) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isFollow, setIsFollow] = useState(false);

    const getShopDetail = async () => {
        if (id) {
            setIsLoading(true);
            const res = await userService.getShopDetail(id);
            setIsLoading(false);
            return res.data;
        }
    };
    const { data } = useQuery({
        queryKey: ['shop-detail'],
        queryFn: getShopDetail,
        enabled: !!id,
    });

    const handleFollow = async () => {
        setIsLoading(true);
        if (isFollow) {
            await userService.unfollow({ shopId: data?._id });
        } else {
            if (user?.name) {
                await userService.follow({ shopId: data?._id });
            } else {
                navigate('/sign-in');
            }
        }
        setIsLoading(false);
        setIsFollow(!isFollow);
    };

    const convertType = useMemo(() => {
        if (data) {
            const convertValue = [];
            data?.products?.forEach((product) => {
                const existId = convertValue.find((item) => item?.type === product?.type);
                if (existId) {
                    existId.element?.push(product);
                } else {
                    convertValue.push({
                        type: product?.type,
                        element: [product],
                    });
                }
            });
            return convertValue;
        }
    }, [data]);

    const [scrollType, setScrollType] = useState('');
    const handleScrollType = () => {
        setScrollType(cx('block-type-scroll'));
    };

    const [handleTab, setHandleTab] = useState(cx('wrapper-tab'));
    window.addEventListener('scroll', () => {
        if (window.scrollY > 170) {
            setHandleTab(cx('wrapper-tab-scroll'));
        } else {
            setHandleTab(cx('wrapper-tab'));
        }
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Loading isLoading={isLoading}>
            <div className={cx('wrapper')}>
                <div className={cx('wrapper-header')}>
                    <div className={cx('box')}>
                        <div
                            className={cx('wrapper-shop')}
                            style={{
                                backgroundImage: `url(https://cdn.tgdd.vn//News/0//x-cach-tao-dang-voi-quan-ong-rong-cuc-dinh-chan-3-845x470.jpg)`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}
                        >
                            <div className={cx('shop-background')}>
                                <div className={cx('shop-avatar')}>
                                    <img src={data?.avatar || images.defaultAvatar} alt="" />
                                    <div>
                                        <p className={cx('shop-name')}>{data?.name}</p>
                                        <h4 className={cx('shop-status')}>Hoạt động 10 phút trước</h4>
                                    </div>
                                </div>

                                <div className={cx('shop-interact')}>
                                    {data?._id === user.id ? (
                                        <Button
                                            addIcon={<HeartOutlined />}
                                            leftIcon
                                            small
                                            outline
                                            className={cx('button-interact', 'unhover')}
                                        >
                                            LÀ BẠN
                                        </Button>
                                    ) : data?.isFollowing ? (
                                        <Button
                                            addIcon={<CheckCircleOutlined />}
                                            leftIcon
                                            small
                                            outline
                                            onClick={handleFollow}
                                            className={cx('button-interact')}
                                        >
                                            ĐÃ THEO DÕI
                                        </Button>
                                    ) : (
                                        <Button
                                            addIcon={<PlusOutlined />}
                                            leftIcon
                                            small
                                            outline
                                            onClick={handleFollow}
                                            className={cx('button-interact')}
                                        >
                                            THEO DÕI
                                        </Button>
                                    )}
                                    <Button
                                        addIcon={<MessageOutlined />}
                                        leftIcon
                                        small
                                        outline
                                        className={cx('button-interact')}
                                    >
                                        CHAT
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('block')}>
                                <AppstoreOutlined />
                                <span>Sản phẩm:</span>
                                <span className={cx('block-content')}>{data?.totalProduct}</span>
                            </div>
                            <div className={cx('block')}>
                                <UserOutlined />
                                <span>Người theo dõi: </span>
                                <span className={cx('block-content')}>{data?.followers.length}</span>
                            </div>
                            <div className={cx('block')}>
                                <MessageOutlined />
                                <span>Thời gian phản hồi: </span>
                                <span className={cx('block-content')}>Sau vài giờ</span>
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('block')}>
                                <ClockCircleOutlined />
                                <span>Đã tham gia: </span>
                                <span className={cx('block-content')}>{format(data?.createdAt)}</span>
                            </div>
                            <div className={cx('block')}>
                                <PhoneOutlined />
                                <span>Điện thoại: </span>
                                <span className={cx('block-content')}>{data?.phone}</span>
                            </div>
                            <div className={cx('block')}>
                                <MailOutlined />
                                <span>Email: </span>
                                <span className={cx('block-content')}>{data?.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper-tab-bg')}>
                        <div className={handleTab}>
                            <div className={cx('tabs', 'active')} onClick={scrollToTop}>
                                Dạo
                            </div>
                            {convertType &&
                                convertType?.map((productType, index) => (
                                    <div key={index} className={cx('tabs')}>
                                        <a href={`#block-type-${index}`} onClick={handleScrollType}>
                                            {productType?.type}
                                        </a>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper-content')}>
                    {convertType &&
                        convertType?.map((productType, index) => (
                            <div className={cx('block-type')} key={index}>
                                <div id={`block-type-${index}`} className={scrollType}></div>
                                <div className={cx('type-product')}>{productType?.type}</div>
                                <div className={cx('list-product')}>
                                    {productType?.element?.map((product, index2) => (
                                        <CardProduct
                                            key={index2}
                                            _id={product?._id}
                                            name={product?.name}
                                            countInStock={product?.countInStock}
                                            image={product?.image}
                                            price={product?.price}
                                            rating={product?.rating}
                                            sold={product?.sold}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Loading>
    );
}
