import { Menu } from 'antd';
import { useState } from 'react';
import { getItem } from '../../utils';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './AdminPage.module.scss';
import TableUser from '../../components/TableUser/TableUser';
import TableProduct from '../../components/TableProduct/TableProduct';

const cx = classNames.bind(styles);

function AdminPage() {
    const [keySelected, setKeySelected] = useState('user');
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'product', <AppstoreOutlined />),
    ];
    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <TableUser />;
            case 'product':
                return <TableProduct />;
            default:
                return <></>;
        }
    };

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

export default AdminPage;
