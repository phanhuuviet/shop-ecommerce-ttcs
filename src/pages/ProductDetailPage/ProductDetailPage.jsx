import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';

import ProductDetail from '../../components/ProductDetail/ProductDetail';
import styles from './ProductDetailPage.module.scss';

const cx = classNames.bind(styles);

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>
                <span onClick={() => navigate('/')}>Home</span> - Product details
            </h3>
            <ProductDetail id={id} />
        </div>
    );
}

export default ProductDetailPage;
