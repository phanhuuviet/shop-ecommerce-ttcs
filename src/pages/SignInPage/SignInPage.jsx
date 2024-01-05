import classNames from 'classnames/bind';
import { Image, message } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import jwtDecode from 'jwt-decode';

import styles from './SignInPage.module.scss';
import Button from '../../components/Button/Button';
import logo from '../../assets/images';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { loginUser } from '../../services/authService';
import Loading from '../../components/Loading/Loading';
import * as messages from '../../components/Message/Message';
import { useLocation, useNavigate } from 'react-router-dom';
import * as userService from '../../services/userServices';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slice/userSlice';
import Input from '../../components/Input/Input';
import checkStatusResponse from '../../utils/checkStatusResponse';

const cx = classNames.bind(styles);

function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();

    const navigate = useNavigate();

    // function call API
    const mutation = useMutation({
        mutationFn: (data) => loginUser(data),
    });

    const { isLoading, isSuccess, data } = mutation;

    const handleGetDetailUser = async (id, access_token) => {
        const res = await userService.getUser(id, access_token);
        dispatch(updateUser({ ...res?.data, access_token }));
    };

    useEffect(() => {
        if (isSuccess && checkStatusResponse(data)) {
            messages.success('Đăng nhập thành công');
            localStorage.setItem('access_token', JSON.stringify(data?.access_token));
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, data?.access_token);
                }
            }
            if (location?.state) {
                navigate(location?.state);
            } else {
                navigate('/');
            }
        } else if (data?.status === 'err') {
            message.error(data?.message);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, data]);

    // function handle UI
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            email,
            password,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-content')}>
                <form onSubmit={(e) => handleSubmit(e)} className={cx('content')}>
                    <h1 className={cx('title')}>
                        <ShopOutlined style={{ fontSize: '3rem' }} />
                        <a href="/" style={{ color: 'black' }}>
                            SHOP VKV-ECOMMERCE
                        </a>
                    </h1>
                    <div className={cx('form')}>
                        <h2 className={cx('form-title')}>Đăng nhập</h2>
                        <span className={cx('form-link')}>
                            Bạn chưa có tài khoản ? <a href="/sign-up">Đăng ký tại đây</a>
                        </span>

                        <Input onChange={handleOnChangeEmail} value={email} id="email" required />

                        <Input
                            type="password"
                            onChange={handleOnChangePassword}
                            value={password}
                            id="mật khẩu"
                            required
                        />

                        <a className={cx('forgot-password')} href="/">
                            Quên mật khẩu?
                        </a>
                        <Loading isLoading={isLoading}>
                            <Button className={cx('btn-form')} primary large>
                                Đăng nhập
                            </Button>
                        </Loading>
                    </div>
                </form>
                <div className={cx('content')}>
                    <Image
                        preview={false}
                        style={{ height: '100%', objectFit: 'cover' }}
                        src={logo.signIn}
                        alt="sign in"
                    />
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
