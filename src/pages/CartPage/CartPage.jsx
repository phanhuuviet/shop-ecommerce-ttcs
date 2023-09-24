import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Steps, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import ListOrderProduct from '../../components/ListOrderProduct/ListOrderProduct';
import TableTotalMoney from '../../components/TableTotalMoney/TableTotalMoney';
import styles from './CartPage.module.scss';
import { useEffect } from 'react';
import { resetSelectedProduct } from '../../redux/slice/orderSlice';
import { Loading3QuartersOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

function CartPage() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const listOrderChecked = useSelector((state) => state.order.selectedProduct);
    const dispatch = useDispatch();

    const handlePurchase = () => {
        if (!user.phone || !user.address || !user.name) {
            message.warning('You need to fill in complete information about name, address and phone number');
        } else if (listOrderChecked.length === 0) {
            message.warning('You need choose at least one product to purchase');
        } else {
            navigate('/order/payment');
        }
    };

    useEffect(() => {
        dispatch(resetSelectedProduct());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>
                <span onClick={() => navigate('/')}>Home page</span> - Cart
            </h3>
            <Row className={cx('flex-1')} gutter={10}>
                <Col span={17}>
                    <ListOrderProduct />
                </Col>
                <Col span={7}>
                    <TableTotalMoney handlePurchase={handlePurchase} user={user} />
                </Col>
            </Row>
            <Steps
                items={[
                    {
                        title: 'Choose product',
                        status: 'process',
                        icon: <UserOutlined />,
                    },
                    {
                        title: 'Verification',
                        status: 'wait',
                        icon: <SolutionOutlined />,
                    },
                    {
                        title: 'Pay',
                        status: 'wait',
                        icon: <Loading3QuartersOutlined />,
                    },
                    {
                        title: 'Done',
                        status: 'wait',
                        icon: <SmileOutlined />,
                    },
                ]}
            />
        </div>
    );
}

export default CartPage;
