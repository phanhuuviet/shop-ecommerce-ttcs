import axios from 'axios';

const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, data);
    return res.data;
};

const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/log-out`);
    return res.data;
};

const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials: true,
    });
    return res.data;
};

export { loginUser, logoutUser, refreshToken };
