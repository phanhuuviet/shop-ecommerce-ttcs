import classNames from 'classnames/bind';

import styles from './TableTotalMoney.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import { useEffect, useMemo } from 'react';
import { Divider } from 'antd';
import { addTotalPrice } from '../../redux/slice/orderSlice';
import Loading from '../Loading/Loading';
import { PayPalButton } from 'react-paypal-button-v2';

const cx = classNames.bind(styles);

function TableTotalMoney({ handlePurchase, user, isLoading = false, paymentMethod, sdkReady }) {
    const order = useSelector((state) => state?.order);
    const listOrderChecked = order?.selectedProduct;
    const dispatch = useDispatch();

    // use Memo
    const priceMemo = useMemo(() => {
        if (listOrderChecked) {
            return listOrderChecked?.reduce((total, cur) => total + cur.price * cur.amount, 0);
        } else {
            return 0;
        }
    }, [listOrderChecked]);

    const taxMemo = useMemo(() => {
        if (priceMemo === 0) {
            return 0;
        } else if (priceMemo > 0 && priceMemo < 10) {
            return 0.05;
        } else if (priceMemo > 10 && priceMemo <= 20) {
            return 0.1;
        } else {
            return 0.2;
        }
    }, [priceMemo]);

    const deliveryChargeMemo = useMemo(() => {
        if (priceMemo === 0) {
            return 0;
        } else if (priceMemo > 0 && priceMemo < 10) {
            return 1;
        } else if (priceMemo > 10 && priceMemo <= 20) {
            return 2;
        } else {
            return 3;
        }
    }, [priceMemo]);

    const totalMemo = useMemo(() => {
        return Number.parseFloat(priceMemo + priceMemo * taxMemo - priceMemo * 0.05 + deliveryChargeMemo).toFixed(2);
    }, [priceMemo, taxMemo, deliveryChargeMemo]);

    useEffect(() => {
        dispatch(
            addTotalPrice({
                itemsPrice: priceMemo,
                shippingPrice: deliveryChargeMemo,
                totalPrice: Number.parseFloat(totalMemo),
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceMemo, deliveryChargeMemo, totalMemo]);

    const onSuccessPaypal = (details, data) => {
        handlePurchase(details);
    };

    return (
        <div className={cx('total-wrapper')}>
            <div className={cx('shipping-address')}>
                <span className={cx('address')}>Địa chỉ giao hàng:</span>
                <span className={cx('user-address')}>{user?.address}</span>
            </div>
            <div className={cx('total-table')}>
                <h2>Hóa đơn</h2>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th className={cx('table-head')}></th>
                            <th className={cx('table-head')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx('table-body')}>
                        <tr>
                            <td>Tạm thời</td>
                            <td>{priceMemo}</td>
                        </tr>
                        <tr>
                            <td>Giảm giá</td>
                            <td>5%</td>
                        </tr>
                        <tr>
                            <td>Thuế</td>
                            <td>{taxMemo * 100}%</td>
                        </tr>
                        <tr>
                            <td>Phí vận chuyển</td>
                            <td>${deliveryChargeMemo}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Divider />
                            </td>
                        </tr>
                        <tr className={cx('total-money')}>
                            <td>Tổng cộng</td>
                            <td>${totalMemo}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={cx('button-wrapper')}>
                {paymentMethod === 'paypal' && sdkReady ? (
                    <PayPalButton
                        amount={totalMemo}
                        shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={onSuccessPaypal}
                        onError={() => {
                            alert('error');
                        }}
                    />
                ) : (
                    <Loading isLoading={isLoading}>
                        <Button onClick={handlePurchase} large primary>
                            Mua
                        </Button>
                    </Loading>
                )}
            </div>
        </div>
    );
}

export default TableTotalMoney;
