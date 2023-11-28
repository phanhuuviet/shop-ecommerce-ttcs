import Slider from 'react-slick';
import classNames from 'classnames/bind';

import styles from './TopProduct.module.scss';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function TopProduct({ data }) {
    const settings = {
        infinite: false,
        focusOnSelect: false,
        centerPadding: '60px',
        slidesToShow: 6,
        swipeToSlide: true,
    };
    return (
        <div>
            <h2>Top product</h2>
            <Slider {...settings}>
                {data?.map((product, index) => {
                    return (
                        <div key={index} className={cx('slider-wrapper')}>
                            <div className={cx('image-wrapper')}>
                                <img src={product?.image} alt="" className={cx('image-product')} />
                                <p>Monthly Sales {product?.sold}</p>
                            </div>

                            <span className={cx('name-product')}>{product?.name}</span>
                            <img src={images.top} alt="" className={cx('top')} />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default TopProduct;
