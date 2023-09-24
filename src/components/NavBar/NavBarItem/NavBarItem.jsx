import { Checkbox, Rate } from 'antd';
import classNames from 'classnames/bind';
import styles from './NavBarItem.module.scss';

const cx = classNames.bind(styles);

function NavBarItem({ data }) {
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option, index) => {
                    return (
                        <span key={index} className={cx('text-option')}>
                            {option}
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
            <h4 className={cx('title')}>{data.title}</h4>
            <div className={cx('content')}>{renderContent(data.type, data.options)}</div>
        </>
    );
}

export default NavBarItem;
