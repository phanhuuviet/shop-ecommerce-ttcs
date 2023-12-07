import classNames from 'classnames/bind';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ProfilePage.module.scss';
import Input from '../../components/Input/Input';
import InputUpload from '../../components/InputUpload/InputUpload';
import Button from '../../components/Button/Button';
import * as UserService from '../../services/userServices';
import Loading from '../../components/Loading/Loading';
import { success, error } from '../../components/Message/Message';
import { updateUser } from '../../redux/slice/userSlice';
import { DatePicker, Radio } from 'antd';
import convertISODateToLocalDate from '../../utils/convertISODateToLocalDate';
import dayjs from 'dayjs';
import checkStatusResponse from '../../utils/checkStatusResponse';

const cx = classNames.bind(styles);

function ProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');
    const [gender, setGender] = useState('Male');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const mutation = useMutation({
        mutationFn: (data) => {
            const { id, ...rests } = data;
            return UserService.updateUser(id, rests);
        },
    });

    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && checkStatusResponse(data)) {
            dispatch(updateUser({ _id: user.id, ...data?.data }));
            success('Cập nhật thành công');
        } else if (isError) {
            error('Cập nhật thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError, data]);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setName(user.name);
            setPhone(user.phone);
            setAddress(user.address);
            setAvatar(user.avatar);
            setGender(user.gender);
            setDateOfBirth(user.dateOfBirth);
        }
    }, [user]);

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnChangeName = (e) => {
        setName(e.target.value);
    };

    const handleOnChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleOnChangeAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleOnChangeGender = (e) => {
        setGender(e.target.value);
    };

    const handleOnChangeAvatar = (url) => {
        setAvatar(url);
    };

    const handleOnChangeDate = (value) => {
        if (value) {
            setDateOfBirth(value.$d.toISOString());
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, gender, dateOfBirth });
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('wrapper-header')}>
                    <h2 className={cx('title')}>My profile</h2>
                    <span className={cx('description')}>Manage profile information for account security</span>
                </div>
                <div className={cx('wrapper-content')}>
                    <Loading isLoading={isLoading}>
                        <form onSubmit={handleSubmitForm} className={cx('form')}>
                            <Input
                                value={name}
                                onChange={handleOnChangeName}
                                labelClassName={cx('label')}
                                rectangle
                                inline
                                id="name"
                            />
                            <Input
                                value={email}
                                onChange={handleOnChangeEmail}
                                labelClassName={cx('label')}
                                rectangle
                                inline
                                id="email"
                            />
                            <Input
                                value={phone}
                                onChange={handleOnChangePhone}
                                labelClassName={cx('label')}
                                rectangle
                                inline
                                id="phone"
                            />
                            <Input
                                value={gender}
                                onChange={handleOnChangeGender}
                                labelClassName={cx('label')}
                                inline
                                id="Gender"
                            >
                                <Radio.Group onChange={handleOnChangeGender} value={gender}>
                                    <Radio value="Male">Male</Radio>
                                    <Radio value="Female">Female</Radio>
                                    <Radio value="Other">Other</Radio>
                                </Radio.Group>
                            </Input>
                            <Input labelClassName={cx('label')} rectangle inline id="Date of birth">
                                <DatePicker
                                    format={'YYYY-MM-DD'}
                                    value={dayjs(convertISODateToLocalDate(dateOfBirth || '2000-01-01'), 'YYYY-MM-DD')}
                                    onChange={handleOnChangeDate}
                                    size="middle"
                                    style={{ width: '100%' }}
                                />
                            </Input>
                            <Input
                                value={address}
                                onChange={handleOnChangeAddress}
                                labelClassName={cx('label')}
                                rectangle
                                inline
                                id="address"
                            />
                            <div className={cx('update-btn')}>
                                <Button primary>Save</Button>
                            </div>
                        </form>
                    </Loading>

                    <div className={cx('avatar')}>
                        <InputUpload avatar={avatar} onChange={handleOnChangeAvatar} />
                        <span className={cx('description-avt')}>Dung lượng file tối đa 2MB </span>
                        <span className={cx('description-avt')}>Định dạng: .JPEG, .PNG</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
