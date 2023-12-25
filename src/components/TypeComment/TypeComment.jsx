import classNames from 'classnames/bind';
import { Rate } from 'antd';
import { format } from 'timeago.js';

import styles from './TypeComment.module.scss';
import images from '../../assets/images';
import { LikeOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

function TypeComment({ data }) {
    return (
        <div className={cx('comment')}>
            <img src={data?.user.avatar || images.defaultAvatar} alt="" />
            <div className={cx('content')}>
                <span className={cx('name-shop')}>{data?.user.name}</span>
                <div className={cx('star')}>
                    <Rate allowHalf disabled value={data?.rating} />
                    <h3 className={cx('time')}>{format(data?.createdAt)}</h3>
                    <p className={cx('text-comment')}>{data?.message}</p>
                    <LikeOutlined /> 50
                </div>
            </div>
        </div>
    );
}

export default TypeComment;
