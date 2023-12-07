import { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

import * as contactService from '../../services/contactService';
import checkStatusResponse from '../../utils/checkStatusResponse';
import * as message from '../Message/Message';

function AcceptModal({ refetch, rowSelected }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setLoading(true);
        const response = await contactService.acceptToSeller({ id: rowSelected._id, userId: rowSelected.userId._id });
        if (checkStatusResponse(response)) {
            message.success('Accept request success!');
            refetch();
        } else {
            message.success('Some things went wrong!');
        }
        setLoading(false);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <CheckOutlined
                style={{ color: '#38aa3b', fontSize: '30px', cursor: 'pointer', marginRight: '4px' }}
                onClick={() => showModal()}
            />
            <Modal
                open={open}
                title="Are you sure to accept this request?"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Accept
                    </Button>,
                ]}
            ></Modal>
        </>
    );
}

export default AcceptModal;
