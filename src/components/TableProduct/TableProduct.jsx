import classNames from 'classnames/bind';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useMutation } from 'react-query';
import Highlighter from 'react-highlight-words';

import styles from './TableProduct.module.scss';
import ButtonComp from '../Button/Button';
import TableComp from '../TableComp/TableComp';
import { useRef, useState } from 'react';
import * as productService from '../../services/productService';
import ModalCreateProduct from './Component/ModalCreateProduct';
import DrawerUpdateProduct from './Component/DrawerUpdateProduct';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import { Button, Input, Space } from 'antd';

const cx = classNames.bind(styles);

function TableProduct({ isLoading, data, refetch }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');

    // ----- RENDER TABLE PRODUCT -----
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined
                    style={{ color: 'red', fontSize: '30px', cursor: 'pointer', marginRight: '4px' }}
                    onClick={() => setIsDeleteModalOpen(true)}
                />
                <EditOutlined
                    style={{ color: '#3d95cd', fontSize: '30px', cursor: 'pointer' }}
                    onClick={() => setIsOpenDrawer(true)}
                />
            </div>
        );
    };

    // Search product
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Cài lại
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Lọc
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Đóng
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Xếp hạng',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Loại',
            dataIndex: 'type',
        },
        {
            title: 'Hoạt động',
            dataIndex: 'action',
            render: renderAction,
        },
    ];

    // ----- DELETE PRODUCT -----
    const mutation = useMutation({
        mutationFn: (data) => productService.deleteProduct(data),
    });

    const mutationDelMany = useMutation({
        mutationFn: (data) => productService.deleteManyProduct(data),
    });
    // -----
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Quản lý sản phẩm</h2>
            <ButtonComp onClick={() => setIsModalOpen(true)} rightIcon addIcon={<PlusOutlined />} primary large>
                Thêm sản phẩm
            </ButtonComp>
            <div className={cx('table')}>
                <TableComp
                    columns={columns}
                    data={data}
                    isLoading={isLoading}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                    refetch={refetch}
                    mutation={mutationDelMany}
                />
            </div>

            {/* Modal create product */}
            <ModalCreateProduct setIsOpen={setIsModalOpen} isOpen={isModalOpen} refetch={refetch} />

            {/* Drawer update product */}
            <DrawerUpdateProduct
                isOpenDrawer={isOpenDrawer}
                setIsOpenDrawer={setIsOpenDrawer}
                rowSelected={rowSelected}
                refetch={refetch}
            />

            {/* Modal delete product */}
            <ModalConfirm
                isOpen={isDeleteModalOpen}
                setIsOpen={setIsDeleteModalOpen}
                rowSelected={rowSelected}
                title="Bạn có chắc chắn xóa sản phẩm này không"
                refetch={refetch}
                mutation={mutation}
            />
        </div>
    );
}

export default TableProduct;
