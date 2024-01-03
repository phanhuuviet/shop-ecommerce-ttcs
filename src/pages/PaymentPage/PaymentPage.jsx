import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Steps, message } from 'antd';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';

import TableTotalMoney from '../../components/TableTotalMoney/TableTotalMoney';
import FormMethodPayment from '../../components/FormMethodPayment/FormMethodPayment';
import styles from './PaymentPage.module.scss';
import * as orderService from '../../services/orderService';
import * as paymentService from '../../services/paymentService';
import { useEffect, useState } from 'react';
import {
    Loading3QuartersOutlined,
    LoadingOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
} from '@ant-design/icons';
import checkStatusResponse from '../../utils/checkStatusResponse';

const cx = classNames.bind(styles);

function OrderPage() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const orderSelected = order?.selectedProduct;

    const [paymentMethod, setPaymentMethod] = useState('pay_later');
    const [typeShipping, setTypeShipping] = useState('fast');
    const [sdkReady, setSdkReady] = useState(false);

    const mutation = useMutation({
        mutationFn: (data) => orderService.createOrder(data),
    });

    const { data, isLoading, isError, isSuccess } = mutation;

    useEffect(() => {
        if (isSuccess && checkStatusResponse(data)) {
            message.success('Đặt hàng thành công');
            navigate('/');
        } else if (data?.status === 'err') {
            message.error(data?.message);
        } else if (isError) {
            message.error('Đã xảy ra lỗi!');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess]);

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data } = await paymentService.getConfig();
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!window.paypal) {
            addPaypalScript();
        } else {
            setSdkReady(true);
        }
    }, []);

    const handleCreateOrder = (details) => {
        const orderData = {
            access_token: user?.access_token,
            userId: user?.id,
            fullName: user?.name,
            address: user?.address,
            phone: user?.phone,
            paymentMethod: paymentMethod,
            itemsPrice: order?.itemsPrice,
            shippingPrice: order?.shippingPrice,
            totalPrice: order?.totalPrice,
            data: orderSelected,
            isPaid: true,
            paidAt: details.update_time || Date.now(),
        };
        mutation.mutate(orderData);
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>
                <span onClick={() => navigate('/')}>Trang chủ</span> - Thanh toán
            </h3>
            <Row gutter={10} className={cx('wapper-content')}>
                <Col span={16}>
                    <FormMethodPayment
                        typeShipping={typeShipping}
                        setTypeShipping={setTypeShipping}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                </Col>
                <Col span={8}>
                    <TableTotalMoney
                        isLoading={isLoading}
                        handlePurchase={handleCreateOrder}
                        user={user}
                        paymentMethod={paymentMethod}
                        sdkReady={sdkReady}
                    />
                </Col>
            </Row>
            <Steps
                items={[
                    {
                        title: 'Chọn sản phẩm',
                        status: 'finish',
                        icon: <UserOutlined />,
                    },
                    {
                        title: 'Xác minh',
                        status: isLoading ? 'finish' : isSuccess ? 'finish' : 'process',
                        // status: isSuccess ? 'finish' : 'process',
                        icon: <SolutionOutlined />,
                    },
                    {
                        title: 'Chi trả',
                        status: isLoading ? 'process' : isSuccess ? 'finish' : 'wait',
                        icon: isLoading ? <LoadingOutlined /> : <Loading3QuartersOutlined />,
                    },
                    {
                        title: 'Xong',
                        status: isSuccess ? 'finish' : 'wait',
                        icon: <SmileOutlined />,
                    },
                ]}
            />
        </div>
    );
}

export default OrderPage;
