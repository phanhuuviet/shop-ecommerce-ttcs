const checkStatusResponse = (response) => {
    return response?.status === 'OK' ? true : false;
};

export const checkStatusCode = (response) => response?.statusCode === 200;

export default checkStatusResponse;
