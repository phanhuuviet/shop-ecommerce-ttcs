import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SliderComponent from '../../components/Slider/Slider';
import { slide } from '../../assets/images';
import styles from './HomePage.module.scss';
import CardProduct from '../../components/CardProduct/CardProduct';
import Button from '../../components/Button/Button';
import * as productService from '../../services/productService';
import { useDebounce } from '../../hooks/useDebounce';
import Loading from '../../components/Loading/Loading';

const cx = classNames.bind(styles);

function HomePage() {
    const searchValueProduct = useSelector((state) => state.product.search);
    const searchDebounce = useDebounce(searchValueProduct, 500);
    const [stateProducts, setStateProducts] = useState([]);
    const [limit, setLimit] = useState(4);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        productService.getAllProduct({ searchDebounce, limit }).then((data) => {
            setStateProducts(data?.data);
            setIsLoading(false);
        });
    }, [searchDebounce, limit]);

    return (
        <Loading isLoading={isLoading}>
            <div style={{ backgroundColor: '#e9e9e9', paddingTop: '25px' }}>
                <div className={cx('wrapper')}>
                    <div className={cx('slide')}>
                        <SliderComponent alt="slider" width="20%" images={slide} />
                    </div>
                    <div className={cx('list-product')}>
                        {stateProducts?.map((product) => {
                            return (
                                <CardProduct
                                    key={product._id}
                                    _id={product._id}
                                    name={product.name}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    sold={product.sold}
                                />
                            );
                        })}
                    </div>
                    <div className={cx('see-more')}>
                        <Button onClick={() => setLimit((prev) => prev + 4)} outline large>
                            See more
                        </Button>
                    </div>
                </div>
            </div>
        </Loading>
    );
}

export default HomePage;
