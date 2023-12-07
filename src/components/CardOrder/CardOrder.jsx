import { Card, Divider, message } from 'antd';
import Button from '../Button/Button';
import { useMutation } from 'react-query';

import classNames from 'classnames/bind';

import styles from './CardOrder.module.scss';
import * as orderService from '../../services/orderService';
import checkStatusResponse from '../../utils/checkStatusResponse';

const cx = classNames.bind(styles);

function CardOrder({ data, refetch }) {
    const mutation = useMutation({
        mutationKey: ['order'],
        mutationFn: (data) => orderService.cancelOrder(data),
        onSuccess: (data) => {
            if (checkStatusResponse(data)) {
                message.success(data?.message);
                refetch();
            }
        },
    });

    const mutationConfirmOrder = useMutation({
        mutationKey: ['confirm-order'],
        mutationFn: (data) => orderService.confirmOrder(data),
        onSuccess: (data) => {
            if (checkStatusResponse(data)) {
                message.success(data?.message);
                refetch();
            }
        },
    });

    const handleCancelOrder = (order) => {
        const data = { id: order?._id };
        mutation.mutate(data);
    };

    const handleConfirmOrder = (order) => {
        const data = { id: order?._id };
        mutationConfirmOrder.mutate(data);
    };

    return (
        <div style={{ marginTop: '20px', width: '80%' }}>
            <Card bordered={false}>
                <section className={cx('status-order')}>
                    <h2>Status</h2>
                    <p>
                        <span>Shipping:</span> {data?.isDelivered ? 'Shipped' : 'Not delivery'}
                    </p>
                    <p>
                        <span>Paid:</span> {data?.isPaid ? 'Paid' : 'Not paid'}
                    </p>
                </section>
                <Divider style={{ margin: '16px 0px' }} />
                <section className={cx('list-order')}>
                    {data?.orderItems &&
                        data?.orderItems?.map((orderItem, index) => {
                            return (
                                <div key={index} className={cx('item-order')}>
                                    <article>
                                        <img src={orderItem?.image} alt="Product" />
                                        <span>{orderItem?.name}</span>
                                    </article>
                                    <sub>
                                        Amount: <span>{orderItem?.amount}</span>
                                    </sub>
                                    <sub>
                                        Price: <span>${orderItem?.price}</span>
                                    </sub>
                                </div>
                            );
                        })}
                </section>
                <Divider style={{ margin: '16px 0px' }} />
                <section className={cx('control-order')}>
                    <p>
                        Total amount: <span>${data?.totalPrice}</span>
                    </p>
                    <div>
                        <Button outline onClick={() => handleCancelOrder(data)}>
                            Cancel order
                        </Button>
                        <Button primary onClick={() => handleConfirmOrder(data)}>
                            Order Received
                        </Button>
                    </div>
                </section>
            </Card>
        </div>
    );
}

export default CardOrder;
