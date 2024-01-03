import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import InputEmoji from 'react-input-emoji';
import { format } from 'timeago.js';

import * as userService from '../../services/userServices';
import * as chatService from '../../services/chatService';
import styles from './BoxChat.module.scss';
import Button from '../Button/Button';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function BoxChat({ data, currentUserId, setSendMessage, receivedMessage }) {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [partner, setPartner] = useState(null);
    const scroll = useRef();

    // fetch data info of partner user
    useEffect(() => {
        const partnerId = data?.members.find((id) => id !== currentUserId);
        const getUserData = async (partnerId) => {
            try {
                const { data: userData } = await userService.getUser(partnerId);
                setPartner(userData);
            } catch (error) {
                console.log(error);
            }
        };

        if (currentUserId && partnerId) {
            getUserData(partnerId);
        }
    }, [currentUserId, data]);

    useEffect(() => {
        if (receivedMessage && receivedMessage?.chatId === data?._id) {
            setConversation([...conversation, receivedMessage]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receivedMessage]);

    // fetch message between two user
    useEffect(() => {
        const getMessages = async () => {
            try {
                const { data: messagesData } = await chatService.getMessages(data?._id);
                setConversation(messagesData);
            } catch (error) {}
        };

        if (data) getMessages();
    }, [data]);

    const handleChange = (value) => {
        setMessage(value);
    };

    const handleSendMessage = async () => {
        try {
            const payload = {
                chatId: data?._id,
                senderId: currentUserId,
                text: message,
            };

            // Send message to database
            const { data: result } = await chatService.createMessage(payload);
            setMessage('');
            setConversation([...conversation, result]);

            // Send message to socket server
            const receiverId = data?.members.find((id) => id !== currentUserId);
            setSendMessage({ ...payload, receiverId });
        } catch (error) {}
    };

    // scroll to bottom
    useEffect(() => {
        scroll.current?.scrollTo({
            top: scroll.current?.scrollHeight,
            behavior: 'smooth',
        });
    }, [conversation]);

    return (
        <div className={cx('wrapper')}>
            {data ? (
                <>
                    <div className={cx('header')}>
                        <img src={partner?.avatar || images.defaultAvatar} alt="avt" className={cx('avatar')} />
                        <span className={cx('username')}>{partner?.name}</span>
                    </div>
                    <div className={cx('content')} ref={scroll}>
                        {conversation &&
                            conversation?.map((chat, index) => {
                                return chat?.senderId === currentUserId ? (
                                    <div key={index} className={cx('message', 'message-right')}>
                                        <span className={cx('message-content')}>{chat?.text}</span>
                                        <span className={cx('message-time')}>{format(chat?.createdAt)}</span>
                                    </div>
                                ) : (
                                    <div key={index} className={cx('message', 'message-left')}>
                                        <span className={cx('message-content')}>{chat?.text}</span>
                                        <span className={cx('message-time')}>{format(chat?.createdAt)}</span>
                                    </div>
                                );
                            })}
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('input')}>
                            <InputEmoji value={message} onChange={handleChange} placeholder="Nhập nội dung tin nhắn" />
                        </div>
                        <Button primary onClick={handleSendMessage}>
                            Gửi
                        </Button>
                    </div>
                </>
            ) : (
                <div>
                    <h2>Vui lòng chọn phòng trò chuyện</h2>
                </div>
            )}
        </div>
    );
}

export default BoxChat;
