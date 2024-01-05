import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Col, Image, InputNumber, Rate, Row } from 'antd';
import { AccountBookOutlined, CarOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './ProductDetail.module.scss';
import Button from '../Button/Button';
import { addOrderProduct } from '../../redux/slice/orderSlice';
import * as messages from '../Message/Message';
import { numberFormatText } from '../../utils/numberFormatText';

const cx = classNames.bind(styles);

function ProductDetail({ data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state?.user);
    const [amountProduct, setAmountProduct] = useState(1);

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
            messages.success('Thêm vào giỏ hàng thành công!');
        }
    };

    const onChange = (value) => {
        setAmountProduct(value);
    };

    return (
        <Row>
            <Col span={10}>
                <Image src={data?.image} alt="image product" width="420px" height="420px" />
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
                    <span className={cx('sold')}> | Đã bán {data?.sold}</span>
                </div>
                <div className={cx('line')}></div>
                <div>
                    <h1 className={cx('price')}>₫{numberFormatText(data?.price)} hoặc khoảng ₫99,000/tháng</h1>
                    <span className={cx('price-description')}>
                        Các khoản thanh toán được đề xuất với nguồn tài trợ đặc biệt 6 tháng
                    </span>
                </div>
                <div className={cx('line')}></div>
                <div className={cx('address-wrapper')}>
                    Giao tới
                    <span className={cx('address')}>Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</span> -
                    <span className={cx('change-address')}>Thay đổi địa chỉ</span>
                </div>
                <div className={cx('quantity-wrapper')}>
                    <span>Số lượng</span>
                    <div className={cx('quantity-btn')}>
                        <InputNumber min={1} max={data?.countInStock} defaultValue={1} onChange={onChange} />
                    </div>
                    <span className={cx('count-in-stock')}>
                        Chỉ còn <span>{data?.countInStock} mặt hàng</span> mặt hàng thừa! Đừng bỏ lỡ nó
                    </span>
                </div>
                <div className={cx('buy-wrapper')}>
                    <Button primary large outline rounded>
                        Mua ngay
                    </Button>
                    <Button onClick={handleAddOrderProduct} large outline rounded>
                        Thêm vào giỏ hàng
                    </Button>
                </div>
                <div className={cx('footer-wrapper')}>
                    <div className={cx('footer-item')}>
                        <CarOutlined className={cx('footer-icon')} />
                        <div>
                            <h3>Giao hàng miễn phí</h3>
                            <a className={cx('footer-link')} href="/">
                                Nhập mã bưu điện của bạn để biết tình trạng giao hàng khả dụng
                            </a>
                        </div>
                    </div>
                    <div className={cx('line')}></div>

                    <div className={cx('footer-item')}>
                        <AccountBookOutlined className={cx('footer-icon')} />
                        <div>
                            <h3>Trả lại hàng</h3>
                            Trả lại hàng miễn phí trong 30 ngày.
                            <a className={cx('footer-link')} href="/">
                                Chi tiết
                            </a>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default ProductDetail;
