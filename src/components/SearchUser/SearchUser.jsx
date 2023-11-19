import { useEffect, useState } from 'react';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './SearchUser.module.scss';
import { useDebounce } from '../../hooks/useDebounce';
import * as userService from '../../services/userServices';
import images from '../../assets/images';
import * as message from '../Message/Message';

const cx = classNames.bind(styles);

function SearchUser({ setTempChat, refetchChats }) {
    const currentUser = useSelector((state) => state?.user);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [appearDropdown, setAppearDropdown] = useState(false);
    const debounceValue = useDebounce(searchValue, 300);

    const handleSearchUser = (e) => {
        setSearchValue(e.target.value);
    };

    const handleCloseBtn = () => {
        setSearchValue('');
    };

    const handleCreateChat = async (user) => {
        const res = await userService.createChat({ senderId: currentUser?.id, receiverId: user?._id });
        if (res?.status === 'OK') {
            setTempChat(res?.data);
            refetchChats();
            setSearchValue('');
        } else {
            message.error('Some thing went wrong!');
        }
    };

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            setAppearDropdown(false);
            return;
        }
        const getResult = async () => {
            const result = await userService.getAllUser({ name: debounceValue });
            setSearchResult(result?.data);
            setAppearDropdown(true);
        };

        getResult();
    }, [debounceValue]);

    return (
        <div className={cx('wrapper')}>
            <SearchOutlined className={cx('icon')} />
            <input
                value={searchValue}
                onChange={(e) => handleSearchUser(e)}
                className={cx('input')}
                type="text"
                placeholder="Search user..."
            />
            <CloseCircleOutlined onClick={handleCloseBtn} className={cx('icon', 'right', { active: searchValue })} />
            <div className={cx('drop-down', { active: appearDropdown })}>
                {searchResult?.length > 0 ? (
                    searchResult?.map((item, index) => {
                        return (
                            <div key={index} className={cx('user-item')} onClick={() => handleCreateChat(item)}>
                                <img className={cx('avatar')} src={item?.avatar || images.defaultAvatar} alt="" />
                                <span className={cx('username')}>{item?.name}</span>
                            </div>
                        );
                    })
                ) : (
                    <div className={cx('no-user')}>No user to display</div>
                )}
            </div>
        </div>
    );
}

export default SearchUser;
