import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InputUpload.module.scss';

const cx = classNames.bind(styles);

function InputUpload({ avatar, onChange, name }) {
    const [imageUrl, setImageUrl] = useState('');

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const [loading, setLoading] = useState(false);

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                onChange(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };

    return (
        <Upload
            name="avatar"
            listType="picture-circle"
            className={cx('avatar-uploader')}
            showUploadList={false}
            maxCount={1}
            customRequest={dummyRequest}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {avatar || imageUrl ? (
                <img src={avatar || imageUrl} alt="avatar" style={{ width: '100%' }} name={name || ''} />
            ) : (
                uploadButton
            )}
        </Upload>
    );
}

export default InputUpload;
