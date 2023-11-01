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
    console.log(data?.data);

    //fake data
    const data1 = {
        title: 'Product portfolio',
        type: 'text',
        // options: ['Apple', 'Pear', 'Orange'],
        options: data?.data,
    };

    return (
        <div style={{ paddingLeft: '5px' }}>
            <NavBarItem data2={data1} />
        </div>
    );
}

export default NavBar;
