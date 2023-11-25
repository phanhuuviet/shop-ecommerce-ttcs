import { Col, Row } from 'antd';
import Header from '../components/Header/Header';
import classNames from 'classnames/bind';
import styles from './PersonalLayout.module.scss';
import Footer from '../components/Footer/Footer';

const cx = classNames.bind(styles);

function PersonalLayout({ children, navbar }) {
    return (
        <div>
            <Header />
            <Row className={cx('wrapper-content')}>
                <Col span={4}>{navbar}</Col>
                <Col span={20}>{children}</Col>
            </Row>
            <Footer />
        </div>
    );
}

export default PersonalLayout;
