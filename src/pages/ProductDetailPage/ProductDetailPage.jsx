import { useState } from 'react';
import { ShopOutlined, WechatOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as productService from '../../services/productService';
import { format } from 'timeago.js';

import ProductDetail from '../../components/ProductDetail/ProductDetail';
import styles from './ProductDetailPage.module.scss';
import Button from '../../components/Button/Button';
import images from '../../assets/images';
import Loading from '../../components/Loading/Loading';

const cx = classNames.bind(styles);

function ProductDetailPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [shop, setShop] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProduct = async () => {
        const id = params?.id;
        if (id) {
            setIsLoading(true);
            const res = await productService.getDetailProduct(id);
            setShop(res?.data?.user);
            setIsLoading(false);
            return res.data;
        }
    };
    const { data } = useQuery({
        queryKey: ['product-detail'],
        queryFn: getProduct,
        enabled: !!params?.id,
    });

    const handleViewShop = () => {
        navigate(`/shop/${data?.user?._id}`);
    };

    return (
        <div className={cx('wrapper')}>
            <Loading isLoading={isLoading}>
                <h3 className={cx('title')}>
                    <span onClick={() => navigate('/')}>Home</span> - Product details
                </h3>
                <ProductDetail data={data} />
                <div className={cx('shop')}>
                    <div className={cx('info-shop')}>
                        <img src={shop?.avatar || images.defaultAvatar} alt="" />
                        <div className={cx('detail-info')}>
                            <span className={cx('shop-name')}>{shop?.name}</span>
                            <section className={cx('shop-interact')}>
                                <Button small primary>
                                    <WechatOutlined />
                                    <span className={cx('interact-content')}>Chat now</span>
                                </Button>
                                <Button small outline onClick={handleViewShop}>
                                    <ShopOutlined />
                                    <span className={cx('interact-content')}>View shop</span>
                                </Button>
                            </section>
                        </div>
                    </div>
                    <div className={cx('devine')}></div>
                    <div className={cx('more-info-shop')}>
                        <div className={cx('block')}>
                            <div className={cx('block-content')}>
                                <span className={cx('content-title')}>Email</span>
                                <span className={cx('content')}>{shop?.email}</span>
                            </div>
                            <div className={cx('block-content')}>
                                <span className={cx('content-title')}>Products</span>
                                <span className={cx('content')}>{shop?.totalProduct}</span>
                            </div>
                        </div>
                        <div className={cx('block')}>
                            <div className={cx('block-content')}>
                                <span className={cx('content-title')}>Response rate</span>
                                <span className={cx('content')}>22%</span>
                            </div>
                            <div className={cx('block-content')}>
                                <span className={cx('content-title')}>Response time</span>
                                <span className={cx('content')}>In a few hours</span>
                            </div>
                        </div>
                        <div className={cx('block')}>
                            <div className={cx('block-content')}>
                                <span className={cx('content-title')}>Joined</span>
                                <span className={cx('content')}>{format(shop?.createdAt)}</span>
                            </div>
                            <div className={cx('block-content')}>
                                <span className={cx('content-title')}>Phone</span>
                                <span className={cx('content')}>{shop?.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Loading>
        </div>
    );
}

export default ProductDetailPage;
