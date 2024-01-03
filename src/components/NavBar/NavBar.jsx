// import classNames from 'classnames/bind';
// import styles from './NavBar.module.scss';
import NavBarItem from './NavBarItem/NavBarItem';

import { useQuery } from 'react-query';
import * as productService from '../../services/productService';

// const cx = classNames.bind(styles);

function NavBar() {
    const getAllType = async () => {
        return await productService.getAllType();
    };

    const { data } = useQuery(['types'], getAllType);

    const typeProduct = {
        title: 'Danh mục sản phẩm',
        type: 'text',
        options: data?.data,
    };

    return (
        <div style={{ paddingLeft: '5px' }}>
            <NavBarItem data={typeProduct} />
        </div>
    );
}

export default NavBar;
