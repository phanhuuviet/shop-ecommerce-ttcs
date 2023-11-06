import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './ChatPage.module.scss';
import UserItem from '../../components/UserItem/UserItem';
import BoxChat from '../../components/BoxChat/BoxChat';
import * as chatService from '../../services/chatService';

const cx = classNames.bind(styles);

function ChatPage() {
    const user = useSelector((state) => state?.user);

    const [chats, setChats] = useState([]);
    const [tempChat, setTempChat] = useState(null);

    // fetch user chat of current user
    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await chatService.getUserChat(user?.id);
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (user?.id) {
            getChats();
        }
    }, [user]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-content')}>
                <div className={cx('list-user')}>
                    <h2 className={cx('title')}>Chats</h2>
                    <div className={cx('chats')}>
                        {chats.length > 0 &&
                            chats.map((chat, index) => {
                                return (
                                    <UserItem
                                        key={index}
                                        data={chat}
                                        currentUserId={user?.id}
                                        tempChat={tempChat}
                                        setTempChat={setTempChat}
                                    />
                                );
                            })}
                    </div>
                </div>
                <div className={cx('box-chat')}>
                    <BoxChat data={tempChat} currentUserId={user?.id} />
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
