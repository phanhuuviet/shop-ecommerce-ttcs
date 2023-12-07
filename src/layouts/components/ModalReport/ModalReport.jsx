import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import * as contactService from '../../../services/contactService';
import styles from './ModalReport.module.scss';
import * as message from '../../../components/Message/Message';

const cx = classNames.bind(styles);

function ModalReport() {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        setLoading(true);
        await contactService.reportError({ description });
        setLoading(false);
        setOpen(false);
        message.success('Report error success!');
        setDescription('');
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const hanleChangeDes = (e) => {
        setDescription(e.target.value);
        console.log(description);
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
                    <div>Email: {user?.email}</div>
                    <div>Description:</div>
                    <textarea
                        value={description}
                        onChange={(e) => hanleChangeDes(e)}
                        cols="70"
                        rows="10"
                        placeholder="Enter description"
                        style={{ resize: 'none' }}
                    ></textarea>
                </form>
            </Modal>
        </>
    );
}

export default ModalReport;
