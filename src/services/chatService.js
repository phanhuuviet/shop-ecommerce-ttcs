import axiosJWT from './axiosService';

export const getUserChat = async (id) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/chat/${id}`);

    return res?.data;
};

export const getMessages = async (id) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/message/${id}`);

    return res?.data;
};

export const createMessage = async (payload) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/message/`, payload);

    return res?.data;
};
