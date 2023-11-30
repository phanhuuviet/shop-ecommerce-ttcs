import { useParams } from 'react-router-dom';
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
} from '@ant-design/icons';
import { useQuery } from 'react-query';
import { format } from 'timeago.js';

import styles from './ShopPage.module.scss';
import Button from '../../components/Button/Button';
import CardProduct from '../../components/CardProduct/CardProduct';
import * as userService from '../../services/userServices';
import Loading from '../../components/Loading/Loading';
import images from '../../assets/images';

const cx = classNames.bind(styles);

export default function ShopPage() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);

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
                                        <h4 className={cx('shop-status')}>Active 10 minutes ago</h4>
                                    </div>
                                </div>

                                <div className={cx('shop-interact')}>
                                    <Button
                                        addIcon={<PlusOutlined />}
                                        leftIcon
                                        small
                                        outline
                                        className={cx('button-interact')}
                                    >
                                        FOLLOW
                                    </Button>
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
                                <span>Products:</span>
                                <span className={cx('block-content')}>{data?.totalProduct}</span>
                            </div>
                            <div className={cx('block')}>
                                <UserOutlined />
                                <span>Followers: </span>
                                <span className={cx('block-content')}>{data?.followers.length}</span>
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
                                <span className={cx('block-content')}>{format(data?.createdAt)}</span>
                            </div>
                            <div className={cx('block')}>
                                <PhoneOutlined />
                                <span>Phone: </span>
                                <span className={cx('block-content')}>{data?.phone}</span>
                            </div>
                            <div className={cx('block')}>
                                <MailOutlined />
                                <span>Email: </span>
                                <span className={cx('block-content')}>{data?.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper-tab')}>
                        <div className={cx('tabs', 'active')}>Home</div>
                        {convertType &&
                            convertType?.map((productType, index) => (
                                <div key={index} className={cx('tabs')}>
                                    {productType?.type}
                                </div>
                            ))}
                    </div>
                </div>
                <div className={cx('wrapper-content')}>
                    {convertType &&
                        convertType?.map((productType, index) => (
                            <div className={cx('block-type')} key={index}>
                                <h2>{productType?.type}</h2>
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
