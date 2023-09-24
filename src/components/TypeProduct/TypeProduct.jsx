import classNames from 'classnames/bind';
import styles from './TypeProduct.module.scss';
import { useQuery } from 'react-query';
import * as productService from '../../services/productService';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function TypeProduct() {
    const navigate = useNavigate();
    const getAllType = async () => {
        return await productService.getAllType();
    };

    const { data } = useQuery(['types'], getAllType);

    const handleNavigateType = (type) => {
        navigate(`/product/${type}`, { state: type });
    };

    return (
        <div className={cx('product-list')}>
            {data?.data?.map((type, index) => {
                return (
                    <span onClick={() => handleNavigateType(type)} className={cx('product-item')} key={index}>
                        {type}
                    </span>
                );
            })}
        </div>
    );
}

export default TypeProduct;
