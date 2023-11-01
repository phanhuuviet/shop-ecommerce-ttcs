import { Checkbox, Rate } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { BarsOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './NavBarItem.module.scss';

const cx = classNames.bind(styles);

function NavBarItem({ data }) {
    const navigate = useNavigate();
    const handleNavigateType = (type) => {
        navigate(`/product/${type}`, { state: type });
    };

    const renderContent = (typ, options) => {
        switch (typ) {
            case 'text':
                return options?.map((option, index) => {
                    return (
                        <span key={index} className={cx('text-option')} onClick={() => handleNavigateType(option)}>
                            <PlusOutlined /> {option}
                        </span>
                    );
                });
            case 'checkbox':
                return (
                    <Checkbox.Group
                        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                        options={options}
                        defaultValue={['Apple']}
                    />
                );
            case 'star':
                return options.map((option) => {
                    return (
                        <div className={cx('rating')}>
                            <Rate className={cx('rating-star')} disabled defaultValue={option} />
                            <span>Từ {option} sao</span>
                        </div>
                    );
                });
            case 'price':
                return options.map((option) => {
                    return <div className={cx('price')}>{option}</div>;
                });
            default:
                return {};
        }
    };

    return (
        <>
            <div className={cx('title')}>
                <BarsOutlined style={{ fontSize: '20px', color: 'black' }} /> {data?.title}
            </div>
            <div className={cx('content')}>{renderContent(data?.type, data?.options)}</div>
        </>
    );
}

export default NavBarItem;
