import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, memo } from 'react';

import styles from './TypeProduct.module.scss';
import * as productService from '../../services/productService';

const cx = classNames.bind(styles);

function TypeProduct() {
    const [types, setTypes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        productService.getAllType().then((data) => setTypes(data?.data));
    }, []);
    const handleNavigateType = (type) => {
        navigate(`/product/${type}`, { state: type });
    };
    return (
        <div className={cx('product-list')}>
            {types?.map((type, index) => {
                return (
                    <span onClick={() => handleNavigateType(type)} className={cx('product-item')} key={index}>
                        {type}
                    </span>
                );
            })}
        </div>
    );
}

export default memo(TypeProduct);
