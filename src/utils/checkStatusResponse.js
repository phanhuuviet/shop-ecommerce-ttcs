const checkStatusResponse = (response) => {
    return response?.status === 'OK' ? true : false;
};

export default checkStatusResponse;
