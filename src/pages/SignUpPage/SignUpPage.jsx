import classNames from 'classnames/bind';
import { Image, Radio } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SignUpPage.module.scss';
import Button from '../../components/Button/Button';
import logo from '../../assets/images';
import { signUpUser } from '../../services/userServices';
import Loading from '../../components/Loading/Loading';
import * as messages from '../../components/Message/Message';

const cx = classNames.bind(styles);

function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [isErr, setIsErr] = useState(false);
    const [gender, setGender] = useState('Male');

    const navigate = useNavigate();

    // function call API
    const mutation = useMutation({
        mutationFn: (data) => signUpUser(data),
        onSuccess: () => {
            messages.success('Đăng ký thành công');
            navigate('/sign-in');
        },
        onError: () => {
            messages.error('Đăng ký thất bại');
        },
    });

    const { data, isLoading } = mutation;

    useEffect(() => {
        if (data?.status === 'err') {
            setIsErr(true);
        }
    }, [data]);

    // function handle UI
    const handleOnChangeName = (e) => {
        setName(e.target.value);
        setIsErr(false);
    };

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
        setIsErr(false);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
        setIsErr(false);
    };

    const handleOnChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setIsErr(false);
    };

    const handleOnChangePhone = (e) => {
        setPhone(e.target.value);
        setIsErr(false);
    };

    const handleOnChangeGender = (e) => {
        setGender(e.target.value);
        setIsErr(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            name,
            email,
            password,
            confirmPassword,
            phone,
            gender,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-content')}>
                <form onSubmit={(e) => handleSubmit(e)} className={cx('content')}>
                    <h1 className={cx('title')}>
                        <ShopOutlined style={{ fontSize: '3rem' }} />
                        SHOP-ECOMMERCE
                    </h1>
                    <div className={cx('form')}>
                        <h2 className={cx('form-title')}>Create your account</h2>
                        <span className={cx('form-link')}>
                            Already have an account ? <a href="/sign-in">Sign in here</a>
                        </span>
                        <div className={cx('input')}>
                            <label htmlFor="name">
                                Name<span className={cx('icon-asterisk')}>*</span>
                            </label>
                            <input
                                value={name}
                                className={cx('input-field')}
                                id="name"
                                type="text"
                                placeholder="Enter your username"
                                onChange={(e) => handleOnChangeName(e)}
                                required
                            />
                        </div>
                        <div className={cx('input')}>
                            <label htmlFor="email">
                                Email<span className={cx('icon-asterisk')}>*</span>
                            </label>
                            <input
                                value={email}
                                className={cx('input-field')}
                                id="email"
                                type="text"
                                placeholder="Enter your email"
                                onChange={(e) => handleOnChangeEmail(e)}
                                required
                            />
                        </div>
                        <div className={cx('input')}>
                            <label htmlFor="password">
                                Password<span className={cx('icon-asterisk')}>*</span>
                            </label>
                            <input
                                value={password}
                                className={cx('input-field')}
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                onChange={(e) => handleOnChangePassword(e)}
                                required
                            />
                        </div>
                        <div className={cx('input')}>
                            <label htmlFor="re-enter-password">
                                Re-enter password<span className={cx('icon-asterisk')}>*</span>
                            </label>
                            <input
                                value={confirmPassword}
                                className={cx('input-field')}
                                id="re-enter-password"
                                type="password"
                                placeholder="Re-enter your password"
                                onChange={(e) => handleOnChangeConfirmPassword(e)}
                                required
                            />
                        </div>
                        <div className={cx('input')}>
                            <label htmlFor="gender">
                                Gender<span className={cx('icon-asterisk')}>*</span>
                            </label>
                            <Radio.Group onChange={(e) => handleOnChangeGender(e)} value={gender}>
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                                <Radio value="Other">Other</Radio>
                            </Radio.Group>
                        </div>

                        <div className={cx('input')}>
                            <label htmlFor="phone">
                                Phone<span className={cx('icon-asterisk')}>*</span>
                            </label>
                            <input
                                value={phone}
                                className={cx('input-field')}
                                id="phone"
                                type="text"
                                placeholder="Enter your number phone"
                                onChange={(e) => handleOnChangePhone(e)}
                                required
                            />
                        </div>
                        {isErr && (
                            <div className={cx('message-err')}>
                                <span>{data?.message}</span>
                            </div>
                        )}
                        <Loading isLoading={isLoading}>
                            <Button className={cx('btn-form')} primary large>
                                Sign up
                            </Button>
                        </Loading>
                    </div>
                </form>
                <div className={cx('content-image')}>
                    <Image
                        preview={false}
                        style={{ height: '400px', objectFit: 'cover' }}
                        src={logo.signIn}
                        alt="sign in"
                    />
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
