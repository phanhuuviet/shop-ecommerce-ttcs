import classNames from 'classnames/bind';

import { AppstoreOutlined, BarChartOutlined } from '@ant-design/icons';

import styles from './ShopManagementPage.module.scss';
import { useState } from 'react';
import { getItem } from '../../utils';
import { Menu } from 'antd';
import TableProduct from '../../components/TableProduct/TableProduct';
import * as userService from '../../services/userServices';
import { useQuery } from 'react-query';
import Statistical from '../../components/Statistical/Statistical';

const cx = classNames.bind(styles);

function ShopManagementPage() {
    const [keySelected, setKeySelected] = useState('product');
    const items = [
        getItem('Sản phẩm', 'product', <AppstoreOutlined />),
        getItem('Thống kê', 'statistic', <BarChartOutlined />),
    ];
    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };
    const renderPage = (key) => {
        switch (key) {
            case 'product':
                return <TableProduct isLoading={isLoadingProduct} data={dataProduct} refetch={refetch} />;
            case 'statistic':
                return <Statistical isLoading={isLoadingProduct} data={dataProduct?.data} />;
            default:
                return <></>;
        }
    };

    const getAllProduct = async () => {
        const res = await userService.getProduct();
        return res;
    };

    const {
        isLoading: isLoadingProduct,
        data: dataProduct,
        refetch,
    } = useQuery(['product'], getAllProduct, {
        enabled: keySelected === 'product',
    });

    return (
        <div className={cx('wrapper')}>
            <Menu
                defaultSelectedKeys={keySelected}
                mode="inline"
                onClick={handleOnClick}
                style={{ width: 256, height: '100%' }}
                items={items}
            />
            <div className={cx('wrapper-content')}>{renderPage(keySelected)}</div>
        </div>
    );
}

export default ShopManagementPage;
