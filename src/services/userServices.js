import axios from 'axios';
import axiosJWT from './axiosService';

const signUpUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, data);
    return res.data;
};

const getUser = async (id) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/${id}`);
    return res.data;
};

const getAllUser = async ({ name }) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user`, {
        params: {
            name: name,
        },
    });
    return res.data;
};

const getOrder = async ({ id }) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/order`, {
        headers: {
            userid: id,
        },
    });
    return res.data;
};

const getProduct = async () => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/product`);
    return res.data;
};

const createChat = async ({ senderId, receiverId }) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/chat`, {
        senderId,
        receiverId,
    });
    return res.data;
};

const deleteUser = async ({ id }) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/${id}`);
    return res.data;
};

const deleteManyUser = async ({ _id }) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/delete-many`, { _id });
    return res.data;
};

const updateUser = async (id, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/${id}`, data);
    return res.data;
};

export {
    signUpUser,
    getUser,
    updateUser,
    getAllUser,
    deleteUser,
    deleteManyUser,
    axiosJWT,
    getOrder,
    getProduct,
    createChat,
};
