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
            message.success('Từ chối yêu cầu thành công!');
            refetch();
        } else {
            message.error('Một số điều đã xảy ra sai sót!');
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
                title="Bạn có chắc chắn từ chối yêu cầu này không?"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Quay lại
                    </Button>,
                    <Button key="submit" type="danger" loading={loading} onClick={handleOk}>
                        Từ chối
                    </Button>,
                ]}
            ></Modal>
        </>
    );
}

export default RefuseModal;
