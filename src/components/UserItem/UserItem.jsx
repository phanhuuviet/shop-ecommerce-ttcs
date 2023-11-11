import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';

import styles from './UserItem.module.scss';
import * as userService from '../../services/userServices';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function UserItem({ data, tempChat, setTempChat, currentUserId, onlineUser }) {
    const [partner, setPartner] = useState(null);

    const status = useMemo(() => {
        const chatMember = data?.members.find((id) => id !== currentUserId);
        return onlineUser?.find((user) => user.userId === chatMember);
    }, [onlineUser, data, currentUserId]);

    // fetch data info of partner user
    useEffect(() => {
        const getUserData = async (partnerId) => {
            try {
                const { data: userData } = await userService.getUser(partnerId);
                setPartner(userData);
            } catch (error) {
                console.log(error);
            }
        };

        if (currentUserId) {
            const partnerId = data?.members.find((id) => id !== currentUserId);
            getUserData(partnerId);
        }
    }, [currentUserId, data]);

    return (
        <div
            className={cx('wrapper', { active: tempChat?._id === data?._id ? true : false })}
            onClick={() => setTempChat(data)}
        >
            <img src={partner?.avatar || images.defaultAvatar} alt="AVT" className={cx('avatar')} />
            <div className={cx('wrapper-content')}>
                <span className={cx('username')}>{partner?.name}</span>
                <span className={cx('status', { offline: !status })}>{status ? 'Online' : 'Offline'}</span>
            </div>
        </div>
    );
}

export default UserItem;
