import classNames from 'classnames/bind';

import { AppstoreOutlined } from '@ant-design/icons';

import styles from './Shop.module.scss';
import { useState } from 'react';
import { getItem } from '../../utils';
import { Menu } from 'antd';
import TableProduct from '../../components/TableProduct/TableProduct';
import * as userService from '../../services/userServices';
import { useQuery } from 'react-query';

const cx = classNames.bind(styles);

function ShopPage() {
    const [keySelected, setKeySelected] = useState('product');
    const items = [getItem('Product', 'product', <AppstoreOutlined />)];
    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };
    const renderPage = (key) => {
        switch (key) {
            case 'product':
                return <TableProduct isLoading={isLoadingProduct} data={dataProduct} refetch={refetch} />;
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

export default ShopPage;
