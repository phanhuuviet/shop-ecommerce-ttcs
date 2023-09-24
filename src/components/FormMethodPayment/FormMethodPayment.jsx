import classNames from 'classnames/bind';

import styles from './FormMethodPayment.module.scss';
import { Card, Radio } from 'antd';

const cx = classNames.bind(styles);

function FormMethodPayment({ typeShipping, setTypeShipping, paymentMethod, setPaymentMethod }) {
    return (
        <>
            <Card style={{ width: '100%', height: 200, marginBottom: 20 }}>
                <h3 className={cx('shipping-method')}>Chọn phương thức giao hàng</h3>
                <Radio.Group
                    size={'large'}
                    className={cx('shipping-group')}
                    name="radiogroup"
                    defaultValue={typeShipping}
                    onChange={(e) => setTypeShipping(e.target.value)}
                >
                    <Radio value={'fast'}>
                        <span className={cx('method')}>FAST</span>
                        Giao hàng tiết kiệm
                    </Radio>
                    <Radio value={'go_jek'}>
                        <span className={cx('method')}>GO_JEK</span>
                        Giao hàng tiết kiệm
                    </Radio>
                </Radio.Group>
            </Card>
            <Card style={{ width: '100%', height: 200 }}>
                <h3 className={cx('shipping-method')}>Chọn phương thức thanh toán</h3>
                <Radio.Group
                    size={'large'}
                    className={cx('shipping-group')}
                    name="radiogroup"
                    defaultValue={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <Radio value={'pay_later'}>Thanh toán khi nhận hàng</Radio>
                    <Radio value={'paypal'}>Thanh toán qua paypal</Radio>
                </Radio.Group>
            </Card>
        </>
    );
}

export default FormMethodPayment;
