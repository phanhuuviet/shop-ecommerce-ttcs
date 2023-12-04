import { useState } from 'react';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './ModalReport.module.scss';

const cx = classNames.bind(styles);

function ModalReport() {
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
            <div className={cx('report')} onClick={showModal}>
                <ExclamationCircleOutlined style={{ fontSize: '40px', color: '#b9b9b9' }} />
            </div>
            <Modal
                open={open}
                title="Report"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <form action="" className={cx('form-report')}>
                    <div>Email: hosykhanh1108@gmail.com</div>
                    <div>Description:</div>
                    <textarea name="" id="" cols="70" rows="10" placeholder="Enter description"></textarea>
                </form>
            </Modal>
        </>
    );
}

export default ModalReport;
