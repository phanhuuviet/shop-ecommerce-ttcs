import classNames from 'classnames/bind';
import { Col, Image, InputNumber, Rate, Row } from 'antd';
import { AccountBookOutlined, CarOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './ProductDetail.module.scss';
import Button from '../Button/Button';
import * as productService from '../../services/productService';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct } from '../../redux/slice/orderSlice';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ProductDetail() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state?.user);
    const [amountProduct, setAmountProduct] = useState(1);

    const getProduct = async () => {
        const id = params?.id;
        if (id) {
            const res = await productService.getDetailProduct(id);
            return res.data;
        }
    };

    const { isLoading, data } = useQuery({
        queryKey: ['product-detail'],
        queryFn: getProduct,
        enabled: !!params?.id,
    });

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else {
            dispatch(
                addOrderProduct({
                    orderItem: {
                        name: data?.name,
                        amount: amountProduct,
                        price: data?.price,
                        product: data?._id,
                        image: data?.image,
                    },
                }),
            );
        }
    };

    const onChange = (value) => {
        setAmountProduct(value);
    };

    return (
        <Loading isLoading={isLoading}>
            <Row>
                <Col span={10}>
                    <Image src={data?.image} alt="image product" />
                    <Row className={cx('row-sub-img')}>
                        <Col span={6} style={{ flexBasis: 'unset' }}>
                            <Image src={data?.image} alt="image product small" />
                        </Col>
                        <Col span={6} style={{ flexBasis: 'unset' }}>
                            <Image src={data?.image} alt="image product small" />
                        </Col>
                        <Col span={6} style={{ flexBasis: 'unset' }}>
                            <Image src={data?.image} alt="image product small" />
                        </Col>
                        <Col span={6} style={{ flexBasis: 'unset' }}>
                            <Image src={data?.image} alt="image product small" />
                        </Col>
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '28px' }}>
                    <h1 className={cx('name-product')}>{data?.name}</h1>
                    <p className={cx('description')}>{data?.description}</p>
                    <div>
                        <Rate allowHalf disabled value={data?.rating} />
                        <span className={cx('sold')}> | đã bán {data?.sold}</span>
                    </div>
                    <div className={cx('line')}></div>
                    <div>
                        <h1 className={cx('price')}>${data?.price} or $99/month span</h1>
                        <span className={cx('price-description')}>
                            Suggested payments with 6 month special finacing
                        </span>
                    </div>
                    <div className={cx('line')}></div>
                    <div className={cx('address-wrapper')}>
                        Delivered to
                        <span className={cx('address')}>Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</span> -
                        <span className={cx('change-address')}>Change address</span>
                    </div>
                    <div className={cx('quantity-wrapper')}>
                        <span>Amount</span>
                        <div className={cx('quantity-btn')}>
                            <InputNumber
                                min={amountProduct}
                                max={data?.countInStock}
                                defaultValue={1}
                                onChange={onChange}
                            />
                        </div>
                        <span className={cx('count-in-stock')}>
                            Only <span>{data?.countInStock} items</span> left! Don't miss it
                        </span>
                    </div>
                    <div className={cx('buy-wrapper')}>
                        <Button primary large outline rounded>
                            Buy now
                        </Button>
                        <Button onClick={handleAddOrderProduct} large outline rounded>
                            Add to cart
                        </Button>
                    </div>
                    <div className={cx('footer-wrapper')}>
                        <div className={cx('footer-item')}>
                            <CarOutlined className={cx('footer-icon')} />
                            <div>
                                <h3>Free Delivery</h3>
                                <a className={cx('footer-link')} href="/">
                                    Enter your postal code for Delivery Availability
                                </a>
                            </div>
                        </div>
                        <div className={cx('line')}></div>

                        <div className={cx('footer-item')}>
                            <AccountBookOutlined className={cx('footer-icon')} />
                            <div>
                                <h3>Return Delivery</h3>
                                Free 30days Delivery Returns.
                                <a className={cx('footer-link')} href="/">
                                    Details
                                </a>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Loading>
    );
}

export default ProductDetail;
