import { useState } from 'react';
import { Button, Modal } from 'antd';

function ToSellerModal() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open
            </Button>
            <Modal
                open={open}
                title="Are you sure you want to become a seller?"
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