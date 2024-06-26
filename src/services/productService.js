import axios from 'axios';
import axiosJWT from './axiosService';

const getAllProduct = async ({ search, limit }) => {
    let res = {};
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product?filter=name&filter=${search}`);
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product?limit=${limit}`);
    }
    return res.data;
};

const getProductType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/product?filter=type&filter=${type}&limit=${limit}&page=${page}`,
        );
        return res.data;
    }
};

const getAllType = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`);
    return res.data;
};

const getTopProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/top`);
    return res.data;
};

const createProduct = async ({ data }) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
    return res.data;
};

const getDetailProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`);
    return res.data;
};

const updateProduct = async ({ id, data }) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/${id}`, data);
    return res.data;
};

const deleteProduct = async ({ id }) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/${id}`);
    return res.data;
};

const deleteManyProduct = async ({ _id }) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, { _id: _id });
    return res.data;
};

export {
    getAllProduct,
    getProductType,
    createProduct,
    getDetailProduct,
    getAllType,
    getTopProduct,
    updateProduct,
    deleteProduct,
    deleteManyProduct,
};
