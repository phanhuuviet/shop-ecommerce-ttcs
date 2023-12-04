import { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import TableComp from '../TableComp/TableComp';
import styles from './TableRequest.module.scss';
import convertISODateToLocalDate from '../../utils/convertISODateToLocalDate';

const cx = classNames.bind(styles);

function TableRequest({ isLoading, data, refetch }) {
    const [rowSelected, setRowSelected] = useState('');
    const renderAction = (text) => {
        switch (text) {
            case 'Pending':
                return (
                    <div>
                        <CheckOutlined
                            style={{ color: '#38aa3b', fontSize: '30px', cursor: 'pointer', marginRight: '4px' }}
                            // onClick={() => setIsDeleteModalOpen(true)}
                        />
                        <CloseOutlined
                            style={{ color: '#e94b23', fontSize: '30px', cursor: 'pointer' }}
                            // onClick={() => setIsOpenDrawer(true)}
                        />
                    </div>
                );
            case 'Approved':
                return <span className={cx('approved-text')}>Approved</span>;
            case 'Rejected':
                return <span className={cx('rejected-text')}>Rejected</span>;
            default:
                break;
        }
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: ['userId', 'name'],
        },
        {
            title: 'Email',
            dataIndex: ['userId', 'email'],
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (text) => convertISODateToLocalDate(text),
        },
        {
            title: 'Action',
            dataIndex: 'status',
            render: renderAction,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Request to seller management</h2>

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
                    // mutation={mutationDelMany}
                    refetch={refetch}
                />
            </div>

            {/* Drawer update product */}
            {/* <DrawerUpdateUser
                isOpenDrawer={isOpenDrawer}
                setIsOpenDrawer={setIsOpenDrawer}
                rowSelected={rowSelected}
                refetch={refetch}
            /> */}

            {/* Modal delete product */}
            {/* <ModalConfirm
                isOpen={isDeleteModalOpen}
                setIsOpen={setIsDeleteModalOpen}
                rowSelected={rowSelected}
                title="Are you sure to delete this user"
                refetch={refetch}
                mutation={mutation}
            /> */}
        </div>
    );
}

export default TableRequest;
