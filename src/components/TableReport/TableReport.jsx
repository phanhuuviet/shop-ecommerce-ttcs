import { useState } from 'react';
import classNames from 'classnames/bind';

import TableComp from '../TableComp/TableComp';
import styles from './TableReport.module.scss';
import convertISODateToLocalDate from '../../utils/convertISODateToLocalDate';

const cx = classNames.bind(styles);

function TableReport({ isLoading, data, refetch }) {
    const [rowSelected, setRowSelected] = useState('');

    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: ['userId', 'name'],
        },
        {
            title: 'Email',
            dataIndex: ['userId', 'email'],
        },
        {
            title: 'Thời điểm tạo',
            dataIndex: 'createdAt',
            render: (text) => convertISODateToLocalDate(text),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Quản lý báo cáo</h2>

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

export default TableReport;
