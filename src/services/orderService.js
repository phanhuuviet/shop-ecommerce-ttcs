// import { axiosJWT } from './userServices';
import axiosJWT from './axiosService';

export const createOrder = async ({ ...rest }) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, rest);

    return res.data;
};

export const cancelOrder = async ({ id }) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/${id}`);

    return res.data;
};

export const confirmOrder = async ({ id }) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/order/${id}/paid`);

    return res.data;
};
