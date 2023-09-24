import { axiosJWT } from './userServices';

export const createOrder = async ({ access_token, ...rest }) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, rest, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });

    return res.data;
};

export const cancelOrder = async ({ access_token, id }) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });

    return res.data;
};
