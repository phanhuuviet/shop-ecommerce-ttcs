import axios from 'axios';

const axiosJWT = axios.create();

const signUpUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, data);
    return res.data;
};

const getUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

const getAllUser = async ({ access_token }) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

const getOrder = async ({ id, access_token }) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/order`, {
        headers: {
            authorization: `Bearer ${access_token}`,
            userid: id,
        },
    });
    return res.data;
};

const deleteUser = async ({ id, access_token }) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/${id}`, {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

const deleteManyUser = async ({ _id, access_token }) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/user/delete-many`,
        { _id },
        {
            headers: {
                authorization: `Bearer ${access_token}`,
            },
        },
    );
    return res.data;
};

const updateUser = async (id, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/${id}`, data);
    return res.data;
};

const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials: true,
    });
    return res.data;
};

export { signUpUser, getUser, updateUser, refreshToken, getAllUser, deleteUser, deleteManyUser, axiosJWT, getOrder };
