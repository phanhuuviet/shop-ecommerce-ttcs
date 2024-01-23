import { DeleteOutlined } from '@ant-design/icons';
import { InputNumber, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import * as userService from '../../services/userServices';

import styles from './ListOrderProduct.module.scss';
import { addSelectedProduct, decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slice/orderSlice';
import { useMutation } from 'react-query';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import { logDOM } from '@testing-library/react';
import Loading from '../Loading/Loading';

const cx = classNames.bind(styles);

function ListOrderProduct() {
    // const orderList = useSelector((state) => state?.order);
    // const [orderList, setOrderList] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const dispatch = useDispatch();

    const [dataTable, setDataTable] = useState([]);
    const [listOrderChecked, setListOrderChecked] = useState([]);

    // const [refetchData, setRefetchData] = useState([]);

    // const fetchDataFunction = async () => {
    //     const res = await userService.getListCart();
    //     setRefetchData(res?.data);
    // };
    // useEffect(() => {
    //     fetchDataFunction();
    // }, []);

    const [isLoading, setIsLoading] = useState(true);
    const [listCart, setListCart] = useState([]);

    const getListCart = async () => {
        const res = await userService.getListCart();
        setListCart(res?.data);
        setIsLoading(false);
    };

    useEffect(() => {
        getListCart();
    }, []);

    // const onStep = (value, info, record) => {
    //     if (info.type === 'down') {
    //         dispatch(decreaseAmount({ idProduct: record?.product }));
    //     } else {
    //         dispatch(increaseAmount({ idProduct: record?.product }));
    //     }
    // };

    // const handleDeleteProduct = (record) => {
    //     // find product deleted in list order checked
    //     const newList = listOrderChecked.filter((order) => order.product !== record?.product);
    //     setListOrderChecked(newList);
    //     dispatch(removeOrderProduct({ idProduct: record?.product }));
    // };

    // ----- DELETE PRODUCT -----
    const mutation = useMutation({
        mutationFn: (data) => userService.deleteCart(data),
        onSuccess: () => {
            getListCart(); // Thực hiện query lại dữ liệu
        },
    });

    // console.log('>>', data);

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
                        max={10}
                        defaultValue={record.amount}
                        // onStep={(value, info) => onStep(value, info, record)}
                    />
                );
            },
        },
        {
            title: 'Tổng cộng',
            dataIndex: 'total',
            render: (text, record) => {
                return <span className={cx('total')}>₫{record.amount * record.price}</span>;
            },
        },
        {
            title: 'Hoạt động',
            dataIndex: 'action',
            render: (text, record) => (
                <div>
                    <DeleteOutlined
                        // onClick={() => handleDeleteProduct(record)}
                        style={{ color: 'red', fontSize: '30px', cursor: 'pointer', marginRight: '4px' }}
                        onClick={() => setIsDeleteModalOpen(true)}
                    />
                </div>
            ),
        },
    ];
    // -----

    // useEffect(() => {
    //     if (data) {
    //         // Add key and total to data table
    //         const dataTableModify = data?.map((orderItem, index) => {
    //             var total = 0;
    //             total = orderItem.amount * orderItem.price;
    //             return { ...orderItem, key: index + 1, total: total };
    //         });
    //         setDataTable(dataTableModify);
    //     }
    // }, [data]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setListOrderChecked(selectedRows);
            dispatch(addSelectedProduct(selectedRows));
        },
    };

    return (
        <Loading isLoading={isLoading}>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id);
                        },
                    };
                }}
                columns={columns}
                dataSource={listCart}
                isLoading={isLoading}
                pagination={false}
            />
            <ModalConfirm
                isOpen={isDeleteModalOpen}
                setIsOpen={setIsDeleteModalOpen}
                rowSelected={rowSelected}
                title="Bạn có chắc chắn xóa sản phẩm này không"
                mutation={mutation}
            />
        </Loading>
    );
}

export default ListOrderProduct;
