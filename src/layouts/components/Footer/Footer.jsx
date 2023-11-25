import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import images from '../../../assets/images';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wapper-menu')}>
                <li>PRIVACY POLICY</li>
                <li>OPERATING REGULATIONS</li>
                <li>SHIPPING POLICY</li>
                <li>RETURN AND REFUND POLICY</li>
            </div>
            <div className={cx('wapper-image')}>
                <img src={images.certification} alt="chungnhan" width="150px" />
                <img src={images.certification} alt="chungnhan" width="150px" />
                <img src={images.certification2} alt="chungnhan2" width="65px" />
            </div>
            <div className={cx('wapper-content')}>
                <h2>Công Ty TNHH VKV Ecommerce</h2>
            </div>
            <p>
                Địa chỉ: Phòng 401 tòa nhà 22B, ngõ 53, đường Tân Triều, huyện Thanh Trì, thành phố Hà Nội . Tổng đài hỗ
                trợ: 19001010{' '}
            </p>
            <p>Chịu trách nhiệm nội dung: Phan Hữu Việt - Hồ Sỹ Khanh - Nguyễn Đăng Vũ</p>
            <p>2023 - Bản quyền thuộc Công Ty TNHH VKV Ecommerce </p>
        </div>
    );
}

export default Footer;
