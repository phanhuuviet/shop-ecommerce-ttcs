import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import SliderComponent from '../../components/Slider/Slider';
import images, { slide } from '../../assets/images';
import styles from './HomePage.module.scss';
import CardProduct from '../../components/CardProduct/CardProduct';
import Button from '../../components/Button/Button';
import * as productService from '../../services/productService';
import { useDebounce } from '../../hooks/useDebounce';
import Loading from '../../components/Loading/Loading';
import TopProduct from '../../components/TopProduct/TopProduct';

const cx = classNames.bind(styles);

function HomePage() {
    const searchValueProduct = useSelector((state) => state.product.search);
    const searchDebounce = useDebounce(searchValueProduct, 500);
    const [stateProducts, setStateProducts] = useState([]);
    const [topProduct, setTopProduct] = useState([]);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(true);

    // Get all product
    useEffect(() => {
        const getAllProduct = async () => {
            setIsLoading(true);
            await productService.getAllProduct({ search: searchDebounce, limit }).then((data) => {
                setStateProducts(data?.data);
            });
            setIsLoading(false);
        };
        getAllProduct();
    }, [searchDebounce, limit]);

    // Get top product
    useEffect(() => {
        const getTopProduct = async () => {
            setIsLoading(true);
            await productService.getTopProduct().then((data) => setTopProduct(data?.data));
            setIsLoading(false);
        };
        getTopProduct();
    }, []);

    const [handleClass, setHandleClass] = useState(cx('wrapper-discover'));
    window.addEventListener('scroll', () => {
        if (window.scrollY > 635) {
            setHandleClass(cx('discover'));
        } else {
            setHandleClass(cx('wrapper-discover'));
        }
    });

    const ServicesRef = useRef(null);

    // useEffect(() => {
    //     if (ServicesRef) {
    //         console.log(ServicesRef.current.getBoundingClientRect());
    //     }
    // }, [ServicesRef]);

    return (
        <Loading isLoading={isLoading}>
            <div className={cx('wrapper')}>
                <div className={cx('wrapper-content')}>
                    <div className={cx('slide-product')}>
                        <div className={cx('slide-wrapper')}>
                            <div className={cx('slider')}>
                                <SliderComponent alt="slider" width="20%" images={slide} />
                            </div>

                            <div className={cx('slide-image-right1')}>
                                <img src={images.slideImageRight1} alt="slide1" width="100%" />
                            </div>
                            <div className={cx('slide-image-right2')}>
                                <img src={images.slideImageRight2} alt="slide1" width="100%" />
                            </div>
                        </div>
                        <div className={cx('top-product')}>
                            <TopProduct data={topProduct} />
                        </div>
                    </div>
                    <div className={cx('discover-bg')}>
                        <div className={handleClass} ref={ServicesRef}>
                            KHÁM PHÁ HÀNG NGÀY
                        </div>
                    </div>
                    <div className={cx('wrapper-body')}>
                        <div className={cx('list-product')}>
                            {stateProducts?.map((product) => {
                                return (
                                    <CardProduct
                                        key={product?._id}
                                        _id={product?._id}
                                        name={product?.name}
                                        countInStock={product?.countInStock}
                                        description={product?.description}
                                        image={product?.image}
                                        price={product?.price}
                                        rating={product?.rating}
                                        type={product?.type}
                                        sold={product?.sold}
                                        shop={product?.user}
                                    />
                                );
                            })}
                        </div>
                        <div className={cx('see-more')}>
                            <Button onClick={() => setLimit((prev) => prev + 5)} outline large>
                                Xem thêm
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Loading>
    );
}

export default HomePage;
