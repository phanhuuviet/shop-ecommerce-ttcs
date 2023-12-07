import axiosJWT from './axiosService';

const getAllRequest = async () => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/request/seller`);
    return res.data;
};

const getAllReport = async () => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/request/error`);
    return res.data;
};

const reportError = async ({ description }) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/request/error`, { description });
    return res.data;
};

const requestToSeller = async () => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/request/seller`);
    return res.data;
};

const acceptToSeller = async ({ id, userId }) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/request/${id}/seller/accept`, { userId });
    return res.data;
};

const rejectToSeller = async ({ id }) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/request/${id}/seller/reject`);
    return res.data;
};

export { getAllRequest, getAllReport, reportError, requestToSeller, acceptToSeller, rejectToSeller };
