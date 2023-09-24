// import classNames from 'classnames/bind';
// import styles from './NavBar.module.scss';
import NavBarItem from './NavBarItem/NavBarItem';

// const cx = classNames.bind(styles);

function NavBar() {
    //fake data
    const data = {
        title: 'Danh mục sản phẩm',
        type: 'text',
        options: ['Apple', 'Pear', 'Orange'],
    };

    return (
        <div>
            <NavBarItem data={data} />
        </div>
    );
}

export default NavBar;
