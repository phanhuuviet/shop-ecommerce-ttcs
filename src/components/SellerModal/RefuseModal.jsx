import { useState } from 'react';
import { Button, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import * as contactService from '../../services/contactService';
import * as message from '../Message/Message';
import checkStatusResponse from '../../utils/checkStatusResponse';

function RefuseModal({ refetch, rowSelected }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setLoading(true);
        const response = await contactService.rejectToSeller({ id: rowSelected._id });
        if (checkStatusResponse(response)) {
            message.success('Reject request success!');
            refetch();
        } else {
            message.error('Some things went wrong!');
        }
        setLoading(false);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <CloseOutlined
                style={{ color: '#e94b23', fontSize: '30px', cursor: 'pointer' }}
                onClick={() => showModal()}
            />
            <Modal
                open={open}
                title="Are you sure to refuse this request?"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="danger" loading={loading} onClick={handleOk}>
                        Refuse
                    </Button>,
                ]}
            ></Modal>
        </>
    );
}

export default RefuseModal;
