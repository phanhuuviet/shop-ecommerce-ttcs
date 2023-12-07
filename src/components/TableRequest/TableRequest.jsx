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
