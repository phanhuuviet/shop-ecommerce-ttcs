import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { isJsonString } from './utils';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

import * as userService from './services/userServices';
import { updateUser } from './redux/slice/userSlice';
import { useState } from 'react';
import Loading from './components/Loading/Loading';
import CustomFragment from './components/CustomFragment/CustomFragment';
import * as role from './constants/index';

function App() {
    const [loading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleGetDetailUser = async (id, access_token) => {
        const res = await userService.getUser(id, access_token);
        dispatch(updateUser({ ...res?.data, access_token }));
    };

    const handleDecoded = () => {
        let storageData = localStorage.getItem('access_token');
        let userData = {};
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
            userData = jwtDecode(storageData);
        }
        return { userData, storageData };
    };

    // const deleteToken = () => {
    //     localStorage.clear();
    // };

    // useEffect(() => {
    //     window.addEventListener('beforeunload', deleteToken);
    //     return () => {
    //         window.removeEventListener('beforeunload', deleteToken);
    //     };
    // }, []);

    useEffect(() => {
        setIsLoading(true);
        let { storageData, userData } = handleDecoded();

        if (userData?.id) {
            handleGetDetailUser(userData?.id, storageData);
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // userService.axiosJWT.interceptors.request.use(
    //     async function (config) {
    //         const currentTime = new Date();
    //         const { userData } = handleDecoded();
    //         if (userData?.exp < currentTime.getTime() / 1000) {
    //             const data = await userService.refreshToken();
    //             config.headers['token'] = `Bearer ${data?.access_token}`;
    //         }
    //         return config;
    //     },
    //     function (error) {
    //         // Do something with request error
    //         return Promise.reject(error);
    //     },
    // );

    return (
        <div>
            <Loading isLoading={loading}>
                <Router>
                    <Routes>
                        {routes.map((route, index) => {
                            const Page = route.page;
                            var Layout = DefaultLayout;
                            var Navbar = Fragment;
                            const isPrivate = route?.isPrivate;
                            const isAuth = user?.role === role.ROLE_ADMIN || user?.role === role.ROLE_SELLER;
                            if (route.layout) {
                                Layout = route.layout;
                            }
                            if (route.layout === null) {
                                Layout = CustomFragment;
                            }
                            if (route.navbar) {
                                Navbar = route.navbar;
                            }
                            return (
                                <Route
                                    key={index}
                                    exact
                                    path={isPrivate ? (isAuth ? route?.path : '/') : route?.path}
                                    element={
                                        <Layout navbar={<Navbar />}>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Router>
            </Loading>
        </div>
    );
}

export default App;
