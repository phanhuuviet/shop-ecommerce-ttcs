import { useState } from 'react';
import { Button, Modal } from 'antd';

function RefuseModal() {
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
