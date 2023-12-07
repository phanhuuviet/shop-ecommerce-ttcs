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
            message.success('Request to seller successfully!');
        } else {
            message.error('Some things went wrong!');
        }
        setOpen(false);
        setLoading(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <span onClick={showModal}>Request to seller</span>
            <Modal
                open={open}
                title="Are you sure you want to request become a seller?"
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

export default ToSellerModal;
