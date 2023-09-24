import Slider from 'react-slick';
import { Image } from 'antd';
import classNames from 'classnames/bind';

import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

function SliderComponent({ images }) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: 1,
        autoplaySpeed: 2000,
    };

    return (
        <Slider className={cx('slider')} {...settings}>
            {images.map((image, index) => {
                return (
                    <Image className={cx('slide')} key={index} src={image} alt="slide" preview={false} width="100%" />
                );
            })}
        </Slider>
    );
}

export default SliderComponent;
