import { Pagination } from 'antd';
import CardProduct from '../../components/CardProduct/CardProduct';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import styles from './TypeProductPage.module.scss';
import * as productService from '../../services/productService';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';

const cx = classNames.bind(styles);

function TypeProductPage() {
    const { state } = useLocation();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paginate, setPaginate] = useState({
        page: 0,
        limit: 8,
        total: 1,
    });

    const getProductType = async (type, page, limit) => {
        setIsLoading(true);
        const res = await productService.getProductType(type, page, limit);
        if (res?.data) {
            setProducts(res?.data);
            setIsLoading(false);
            setPaginate({ ...paginate, total: res?.total });
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (state) {
            getProductType(state, paginate.page, paginate.limit);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, paginate.page, paginate.limit]);

    const onChange = (currentPage, pageSize) => {
        setPaginate({ ...paginate, page: currentPage - 1, limit: pageSize });
    };

    return (
        <Loading isLoading={isLoading}>
            <h1 className={cx('title')}>Type of product</h1>
            <div className={cx('content')}>
                {products.map((product) => {
                    return (
                        <CardProduct
                            key={product?._id}
                            _id={product?._id}
                            name={product?.name}
                            countInStock={product?.countInStock}
                            description={product?.description}
                            image={product?.image}
                            price={product?.price}
                            rating={product?.rating}
                            type={product?.type}
                            sold={product?.sold}
                            shop={product?.user}
                        />
                    );
                })}
            </div>
            <Pagination
                defaultCurrent={paginate?.page + 1}
                total={paginate?.total}
                onChange={onChange}
                style={{ textAlign: 'center', marginTop: '10px' }}
            />
        </Loading>
    );
}

export default TypeProductPage;
