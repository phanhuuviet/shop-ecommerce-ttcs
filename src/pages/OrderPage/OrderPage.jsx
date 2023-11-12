import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import styles from './OrderPage.module.scss';
import CardOrder from '../../components/CardOrder/CardOrder';
import * as userServices from '../../services/userServices';
import Loading from '../../components/Loading/Loading';
import { FrownOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

function OrderPage() {
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);

    const getOrder = async () => {
        const id = user?.id;
        if (id) {
            const res = await userServices.getOrder({ id, access_token: user?.access_token });
            return res.data;
        }
    };

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrder,
        enabled: !!user?.id,
    });

    return (
        <div className={cx('wrapper')}>
            <Loading isLoading={isLoading}>
                <h3 className={cx('title')}>
                    <span onClick={() => navigate('/')}>Home page</span> - Cart
                </h3>
                {data?.length > 0 ? (
                    <div className={cx('list-card')}>
                        {data?.map((order, index) => {
                            return <CardOrder refetch={refetch} key={index} data={order} />;
                        })}
                    </div>
                ) : (
                    <div className={cx('empty-order')}>
                        <FrownOutlined className={cx('icon')} />
                        <h2>No order to display</h2>
                    </div>
                )}
            </Loading>
        </div>
    );
}

export default OrderPage;
