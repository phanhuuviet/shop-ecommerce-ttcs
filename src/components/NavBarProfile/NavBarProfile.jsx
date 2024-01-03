import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { EditOutlined, ProfileOutlined, ShopOutlined } from '@ant-design/icons';

import styles from './NavBarProfile.module.scss';
import images from '../../assets/images';
import ToSellerModal from '../SellerModal/ToSellerModal';

const cx = classNames.bind(styles);

function NavBarProfile() {
    const user = useSelector((state) => state.user);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-user')}>
                <img src={user?.avatar || images.defaultAvatar} alt="" />
                <div className={cx('user-subtitle')}>
                    <h2>Phan Huu Viet</h2>
                    <span>
                        <EditOutlined />
                        Chỉnh sửa hồ sơ
                    </span>
                </div>
            </div>
            <ul className={cx('list-navbar')}>
                <li className={cx('item-navbar')}>
                    <ProfileOutlined />
                    <span>Hồ sơ của tôi</span>
                </li>
                <li className={cx('item-navbar')}>
                    <ShopOutlined />
                    <ToSellerModal />
                </li>
            </ul>
        </div>
    );
}

export default NavBarProfile;
