import { useState } from 'react';
import { Button, Modal } from 'antd';

import * as contactService from '../../services/contactService';
import * as message from '../Message/Message';
import checkStatusResponse from '../../utils/checkStatusResponse';

function ToSellerModal() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setLoading(true);
        const response = await contactService.requestToSeller();
        if (checkStatusResponse(response)) {
            message.success('Yêu cầu lên người bán thành công!');
        } else {
            message.error('Một số điều đã xảy ra sai sót!');
        }
        setOpen(false);
        setLoading(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <span onClick={showModal}>Yêu cầu lên người bán</span>
            <Modal
                open={open}
                title="Bạn có chắc chắn muốn yêu cầu trở thành người bán?"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Quay lại
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Chấp nhận
                    </Button>,
                ]}
            ></Modal>
        </>
    );
}

export default ToSellerModal;
