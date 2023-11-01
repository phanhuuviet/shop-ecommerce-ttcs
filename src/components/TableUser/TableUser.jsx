import classNames from 'classnames/bind';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from 'react-query';
import Highlighter from 'react-highlight-words';
import { useRef, useState } from 'react';
import { Button, Input, Space } from 'antd';

import styles from './TableUser.module.scss';
import TableComp from '../TableComp/TableComp';
import * as userService from '../../services/userServices';
import DrawerUpdateUser from './Component/DrawerUpdateUser';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function TableUser() {
    const user = useSelector((state) => state?.user);

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
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
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
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
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
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const getAllUser = async () => {
        const res = await userService.getAllUser({ access_token: user.access_token });
        return res;
    };

    const { isLoading: isLoadingUser, data: dataUser, refetch } = useQuery(['users'], getAllUser);

    // ----- DELETE PRODUCT -----
    const mutation = useMutation({
        mutationFn: (data) => userService.deleteUser(data),
    });

    const mutationDelMany = useMutation({
        mutationFn: (data) => userService.deleteManyUser(data),
    });
    // -----

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>User management</h2>

            <div className={cx('table')}>
                <TableComp
                    columns={columns}
                    data={dataUser}
                    isLoading={isLoadingUser}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                    mutation={mutationDelMany}
                    refetch={refetch}
                />
            </div>

            {/* Drawer update product */}
            <DrawerUpdateUser
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
                title="Bạn có chắc chắn xóa người dùng này"
                refetch={refetch}
                mutation={mutation}
            />
        </div>
    );
}

export default TableUser;
