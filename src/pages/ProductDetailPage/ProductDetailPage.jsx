import { useState } from 'react';
import { ShopOutlined, WechatOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as productService from '../../services/productService';
import { format } from 'timeago.js';
import { Pagination, Rate } from 'antd';

import ProductDetail from '../../components/ProductDetail/ProductDetail';
import styles from './ProductDetailPage.module.scss';
import Button from '../../components/Button/Button';
import images from '../../assets/images';
import Loading from '../../components/Loading/Loading';
import TypeComment from '../../components/TypeComment/TypeComment';

const cx = classNames.bind(styles);

function ProductDetailPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [shop, setShop] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [paginate, setPaginate] = useState({
        page: 0,
        limit: 5,
        total: 1,
    });

    const onChange = (currentPage, pageSize) => {
        setPaginate({ ...paginate, page: currentPage - 1, limit: pageSize });
    };

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
                <div className={cx('rate-product')}>
                    <h2 className={cx('rate-title')}>ĐÁNH GIÁ SẢN PHẨM</h2>
                    <div className={cx('star-rating')}>
                        <div className={cx('star-general')}>
                            <div className={cx('star-value')}>
                                <h2>{data?.rating.toFixed(1)}</h2>
                                <h3>out of 5</h3>
                            </div>
                            <div>
                                <Rate allowHalf disabled value={data?.rating} />
                            </div>
                        </div>
                        <div className={cx('star-element')}>
                            <div className={cx('star-type')}>
                                <li>All</li>
                                <li>5 Star (1,1k)</li>
                                <li>4 Star (84)</li>
                                <li>3 Star (42)</li>
                                <li>2 Star (16)</li>
                                <li>1 Star (33)</li>
                            </div>
                            <div className={cx('star-comment')}>With comment (736)</div>
                        </div>
                    </div>
                    <div className={cx('rate-comment')}>
                        <div>
                            {data?.feedback.map((feedback, index) => {
                                return <TypeComment data={feedback} key={index} />;
                            })}
                        </div>

                        <Pagination
                            defaultCurrent={paginate?.page + 1}
                            total={paginate?.total}
                            onChange={onChange}
                            style={{ textAlign: 'center', marginTop: '20px' }}
                        />
                    </div>
                </div>
            </Loading>
        </div>
    );
}

export default ProductDetailPage;
