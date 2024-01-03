import { useState } from 'react';
import classNames from 'classnames/bind';

import TableComp from '../TableComp/TableComp';
import styles from './TableRequest.module.scss';
import convertISODateToLocalDate from '../../utils/convertISODateToLocalDate';
import RefuseModal from '../SellerModal/RefuseModal';
import AcceptModal from '../SellerModal/AcceptModal';

const cx = classNames.bind(styles);

function TableRequest({ isLoading, data, refetch }) {
    const [rowSelected, setRowSelected] = useState('');
    const renderAction = (text) => {
        switch (text) {
            case 'Pending':
                return (
                    <div>
                        <AcceptModal refetch={refetch} rowSelected={rowSelected} />
                        <RefuseModal refetch={refetch} rowSelected={rowSelected} />
                    </div>
                );
            case 'Approved':
                return <span className={cx('approved-text')}>Tán thành</span>;
            case 'Rejected':
                return <span className={cx('rejected-text')}>Loại bỏ</span>;
            default:
                break;
        }
    };

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
            title: 'Hoạt động',
            dataIndex: 'status',
            render: renderAction,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Quản lý yêu cầu lên người bán</h2>

            <div className={cx('table')}>
                <TableComp
                    columns={columns}
                    data={data}
                    isLoading={isLoading}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record);
                            },
                        };
                    }}
                    refetch={refetch}
                />
            </div>
        </div>
    );
}

export default TableRequest;
