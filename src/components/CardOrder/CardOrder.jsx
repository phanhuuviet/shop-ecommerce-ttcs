import { Card, Divider, Modal, Rate, message } from 'antd';
import Button from '../Button/Button';
import { useMutation } from 'react-query';

import classNames from 'classnames/bind';

import styles from './CardOrder.module.scss';
import * as orderService from '../../services/orderService';
import * as userService from '../../services/userServices';
import checkStatusResponse from '../../utils/checkStatusResponse';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CardOrder({ data, refetch }) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [rateValue, setRateValue] = useState(2.5);
    const [feedbackValue, setFeedbackValue] = useState('');
    const [tempItem, setTempItem] = useState(null);

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

    const handleSubmitRate = async () => {
        const response = await userService.feedback({
            productId: tempItem?.product,
            message: feedbackValue,
            rating: rateValue,
            orderId: data?._id,
        });
        if (checkStatusResponse(response)) {
            message.success(response?.message);
            refetch();
        } else {
            message.error(response?.message);
        }
        setIsOpenModal(false);
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
                                <div key={index}>
                                    <div className={cx('item-order')}>
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
                                    {data?.isDelivered && data?.isPaid && !orderItem?.isRating && (
                                        <div className={cx('rate-btn')}>
                                            <Button
                                                outline
                                                primary
                                                onClick={() => {
                                                    setIsOpenModal(true);
                                                    setTempItem(orderItem);
                                                }}
                                            >
                                                Rate
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </section>
                <Divider style={{ margin: '16px 0px' }} />
                <section className={cx('control-order')}>
                    <p>
                        Total amount: <span>${data?.totalPrice}</span>
                    </p>
                    {(!data?.isDelivered || !data?.isPaid) && (
                        <div>
                            <Button outline onClick={() => handleCancelOrder(data)}>
                                Cancel order
                            </Button>
                            <Button primary onClick={() => handleConfirmOrder(data)}>
                                Order Received
                            </Button>
                        </div>
                    )}
                </section>
            </Card>

            <Modal
                title="Rate product"
                open={isOpenModal}
                onOk={handleSubmitRate}
                onCancel={() => setIsOpenModal(false)}
            >
                <div className={cx('rate-star')}>
                    <h3>Product quality:</h3>
                    <Rate allowHalf defaultValue={2.5} value={rateValue} onChange={(value) => setRateValue(value)} />
                </div>
                <div className={cx('feed-back')}>
                    <h3>Feedback:</h3>
                    <textarea
                        rows={6}
                        value={feedbackValue}
                        onChange={(e) => setFeedbackValue(e.target.value)}
                    ></textarea>
                </div>
            </Modal>
        </div>
    );
}

export default CardOrder;
