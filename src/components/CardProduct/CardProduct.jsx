import { Card, Rate } from 'antd';
import classNames from 'classnames/bind';

import styles from './CardProduct.module.scss';
import { useNavigate } from 'react-router-dom';
import { EnvironmentOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CardProduct({ _id, name, image, price, rating, sold, shop }) {
    const [favorited, setFavorited] = useState(false);
    const navigate = useNavigate();
    const handleNavigateDetailProduct = (id) => {
        navigate(`/products/${id}`);
    };

    const handleFavorite = (e) => {
        e.preventDefault();
        setFavorited(!favorited);
    };

    return (
        <div className={cx('div-card')}>
            <Card
                hoverable
                headStyle={{ height: '200px' }}
                bodyStyle={{ padding: '10px' }}
                cover={<img alt="example" style={{ height: '200px', position: 'relative' }} src={image} />}
                onClick={() => handleNavigateDetailProduct(_id)}
            >
                <div className={cx('header')}>
                    <h3 className={cx('title')}>{name}</h3>
                    <h3 className={cx('location')}>
                        <EnvironmentOutlined />
                        {shop?.address}
                    </h3>
                </div>
                <div className={cx('rating')}>
                    <Rate allowHalf defaultValue={rating} disabled />
                    <span className={cx('sold')}> | sold {sold || '0'}</span>
                </div>
                <div className={cx('price')}>${price}</div>
            </Card>
            <button className={cx('favorite-btn', { favorite: favorited })} onClick={(e) => handleFavorite(e)}>
                {favorited ? (
                    <HeartFilled style={{ fontSize: '20px', color: '#fff' }} />
                ) : (
                    <HeartOutlined style={{ fontSize: '20px' }} />
                )}
            </button>
        </div>
    );
}

export default CardProduct;
