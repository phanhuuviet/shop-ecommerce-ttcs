import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import styles from './ChatPage.module.scss';
import UserItem from '../../components/UserItem/UserItem';
import BoxChat from '../../components/BoxChat/BoxChat';
import * as chatService from '../../services/chatService';

const cx = classNames.bind(styles);

function ChatPage() {
    const user = useSelector((state) => state?.user);

    const [chats, setChats] = useState([]);
    const [tempChat, setTempChat] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    const socket = useRef();

    // Set up connect to socket socket
    useEffect(() => {
        if (user?.id) {
            socket.current = io('http://localhost:8800');
            socket.current.emit('new-user-add', user?.id);
            socket.current.on('get-users', (user) => {
                setOnlineUser(user);
            });
        }
    }, [user]);

    // Sending message to socket server
    useEffect(() => {
        if (sendMessage) {
            socket.current.emit('send-message', sendMessage);
        }
    }, [sendMessage]);

    // Receive message from socket server
    useEffect(() => {
        if (socket.current) {
            socket.current.on('receive-message', (data) => {
                setReceivedMessage(data);
            });
        }
    });

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
                                        onlineUser={onlineUser}
                                    />
                                );
                            })}
                    </div>
                </div>
                <div className={cx('box-chat')}>
                    <BoxChat
                        data={tempChat}
                        currentUserId={user?.id}
                        receivedMessage={receivedMessage}
                        setSendMessage={setSendMessage}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
