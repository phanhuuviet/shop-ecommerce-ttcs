import { Card, Rate } from 'antd';
import classNames from 'classnames/bind';

import styles from './CardProduct.module.scss';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';

const cx = classNames.bind(styles);

function CardProduct({ _id, name, countInStock, description, image, price, rating, type, sold }) {
    const navigate = useNavigate();
    const handleNavigateDetailProduct = (id) => {
        navigate(`/products/${id}`);
    };

    return (
        <Card
            hoverable
            headStyle={{ height: '200px' }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" style={{ height: '240px' }} src={image} />}
            onClick={() => handleNavigateDetailProduct(_id)}
        >
            <div className={cx('header')}>
                <h3 className={cx('title')}>{name}</h3>
                <h3 className={cx('price')}>${convertPrice(price)}</h3>
            </div>
            <div className={cx('description')}>{description}</div>
            <div className={cx('rating')}>
                <Rate allowHalf defaultValue={rating} />
                <span className={cx('sold')}> | đã bán {sold || '121'}</span>
            </div>
            <Button outline rounded>
                Add to cart
            </Button>
        </Card>
    );
}

export default CardProduct;
