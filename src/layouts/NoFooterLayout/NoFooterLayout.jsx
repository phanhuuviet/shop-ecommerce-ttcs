import Header from '../components/Header/Header';
import classNames from 'classnames/bind';
import styles from './NoFooterLayout.module.scss';

const cx = classNames.bind(styles);

function NoFooterLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('wrapper-content')}>{children}</div>
        </div>
    );
}

export default NoFooterLayout;
