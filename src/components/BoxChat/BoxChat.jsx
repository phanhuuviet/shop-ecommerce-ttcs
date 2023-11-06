import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import InputEmoji from 'react-input-emoji';
import { format } from 'timeago.js';

import * as userService from '../../services/userServices';
import * as chatService from '../../services/chatService';
import styles from './BoxChat.module.scss';
import Button from '../Button/Button';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function BoxChat({ data, currentUserId }) {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [partner, setPartner] = useState(null);

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

            await chatService.createMessage(payload);
            setMessage('');
        } catch (error) {}
    };

    return (
        <div className={cx('wrapper')}>
            {data ? (
                <>
                    <div className={cx('header')}>
                        <img src={partner?.avatar || images.defaultAvatar} alt="avt" className={cx('avatar')} />
                        <span className={cx('username')}>{partner?.name}</span>
                    </div>
                    <div className={cx('content')}>
                        {conversation &&
                            conversation?.map((chat, index) => {
                                return chat?.senderId === currentUserId ? (
                                    <div className={cx('message', 'message-right')}>
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
                            <InputEmoji value={message} onChange={handleChange} placeholder="Type a message" />
                        </div>
                        <Button primary onClick={handleSendMessage}>
                            Send
                        </Button>
                    </div>
                </>
            ) : (
                <div>
                    <h2>Please choose a chat room</h2>
                </div>
            )}
        </div>
    );
}

export default BoxChat;
