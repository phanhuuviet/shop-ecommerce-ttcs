import Header from '../components/Header/Header';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Footer from '../components/Footer/Footer';
import ModalReport from '../components/ModalReport/ModalReport';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('wrapper-content')}>{children}</div>
            <ModalReport />
            <Footer />
        </div>
    );
}

export default DefaultLayout;
