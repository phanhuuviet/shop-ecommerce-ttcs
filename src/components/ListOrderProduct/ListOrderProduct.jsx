import { DeleteOutlined } from '@ant-design/icons';
import { InputNumber, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './ListOrderProduct.module.scss';
import { addSelectedProduct, decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slice/orderSlice';

const cx = classNames.bind(styles);

function ListOrderProduct() {
    const orderList = useSelector((state) => state?.order);
    const dispatch = useDispatch();

    const [dataTable, setDataTable] = useState([]);
    const [listOrderChecked, setListOrderChecked] = useState([]);

    const onStep = (value, info, record) => {
        if (info.type === 'down') {
            dispatch(decreaseAmount({ idProduct: record?.product }));
        } else {
            dispatch(increaseAmount({ idProduct: record?.product }));
        }
    };

    const handleDeleteProduct = (record) => {
        // find product deleted in list order checked
        const newList = listOrderChecked.filter((order) => order.product !== record?.product);
        setListOrderChecked(newList);
        dispatch(removeOrderProduct({ idProduct: record?.product }));
    };

    // ----- FORMAT STRUCTURE FOR TABLE
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            render: (text, record) => {
                return (
                    <div className={cx('product-name')}>
                        <img className={cx('image')} src={record.image} alt="product" />
                        <span>{text}</span>
                    </div>
                );
            },
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (text) => {
                return <span>${text}</span>;
            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            render: (text, record) => {
                return (
                    <InputNumber
                        min={1}
                        // max={10}
                        defaultValue={record.amount}
                        onStep={(value, info) => onStep(value, info, record)}
                    />
                );
            },
        },
        {
            title: 'Tổng cộng',
            dataIndex: 'total',
            render: (text) => {
                return <span className={cx('total')}>₫{text}</span>;
            },
        },
        {
            title: 'Hoạt động',
            dataIndex: 'action',
            render: (text, record) => (
                <div>
                    <DeleteOutlined
                        onClick={() => handleDeleteProduct(record)}
                        style={{ color: 'red', fontSize: '30px', cursor: 'pointer', marginRight: '4px' }}
                    />
                </div>
            ),
        },
    ];
    // -----

    useEffect(() => {
        if (orderList) {
            // Add key and total to data table
            const data = orderList?.orderItems?.map((orderItem, index) => {
                var total = 0;
                total = orderItem.amount * orderItem.price;
                return { ...orderItem, key: index + 1, total: total };
            });
            setDataTable(data);
        }
    }, [orderList]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setListOrderChecked(selectedRows);
            dispatch(addSelectedProduct(selectedRows));
        },
    };

    return (
        <Table
            rowSelection={{
                type: 'checkbox',
                ...rowSelection,
            }}
            columns={columns}
            dataSource={dataTable}
            pagination={false}
        />
    );
}

export default ListOrderProduct;
