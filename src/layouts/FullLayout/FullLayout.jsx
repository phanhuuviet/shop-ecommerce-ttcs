import { Col, Row } from 'antd';
import Header from '../components/Header/Header';
import classNames from 'classnames/bind';
import styles from './FullLayout.module.scss';
import Footer from '../components/Footer/Footer';
import ModalReport from '../components/ModalReport/ModalReport';

const cx = classNames.bind(styles);

function FullLayout({ children, navbar }) {
    return (
        <div>
            <Header />
            <Row className={cx('wrapper-content')}>
                <Col span={4}>{navbar}</Col>
                <Col span={20}>{children}</Col>
            </Row>
            <ModalReport />
            <Footer />
        </div>
    );
}

export default FullLayout;
