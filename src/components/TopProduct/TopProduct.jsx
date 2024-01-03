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
            <div className={cx('title')}>
                <p>SẢN PHẨM HÀNG ĐẦU</p>
            </div>
            <Slider {...settings}>
                {data?.map((product, index) => {
                    return (
                        <div key={index} className={cx('slider-wrapper')}>
                            <div className={cx('image-wrapper')}>
                                <img src={product?.image} alt="" className={cx('image-product')} />
                                <p>Đã bán trên tháng {product?.sold}</p>
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
