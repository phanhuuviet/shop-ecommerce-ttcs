import { Form, Input, Button as ButtonFinish, Checkbox, Radio } from 'antd';
import DrawerComp from '../../DrawerComp/DrawerComp';
import Loading from '../../Loading/Loading';
import InputUpload from '../../InputUpload/InputUpload';
import { useEffect, useState } from 'react';
import * as userService from '../../../services/userServices';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import * as message from '../../Message/Message';

function DrawerUpdateUser({ isOpenDrawer, setIsOpenDrawer, rowSelected, refetch }) {
    const user = useSelector((state) => state.user);
    const initialUser = {
        name: '',
        address: '',
        email: '',
        isAdmin: false,
        phone: '',
        gender: 'Female',
        avatar: '',
    };
    const [stateUserDetail, setStateUserDetail] = useState(initialUser);
    const [isLoading, setIsLoading] = useState(false);
    const [formUpdate] = Form.useForm();

    const mutationUpdate = useMutation({
        mutationFn: (data) => {
            const { id, dataUser } = data;
            return userService.updateUser(id, dataUser);
        },
    });

    const { data: dataUpdated, isSuccess: isSuccessUpdated } = mutationUpdate;

    useEffect(() => {
        if (rowSelected && user && isOpenDrawer) {
            const getProductDetail = async (rowSelected) => {
                setIsLoading(true);
                const res = await userService.getUser(rowSelected, user?.access_token);
                setStateUserDetail({
                    name: res?.data?.name,
                    address: res?.data?.address,
                    email: res?.data?.email,
                    isAdmin: res?.data?.isAdmin,
                    phone: res?.data?.phone,
                    gender: res?.data?.gender,
                    avatar: res?.data?.avatar,
                });
                setIsLoading(false);
            };
            getProductDetail(rowSelected);
        }
    }, [rowSelected, user, isOpenDrawer]);

    useEffect(() => {
        formUpdate.setFieldsValue(stateUserDetail);
    }, [formUpdate, stateUserDetail]);

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            setIsOpenDrawer(false);
            formUpdate.resetFields();
            setStateUserDetail({});
            message.success('Update user successfully');
            if (refetch) {
                refetch();
            }
        } else if (dataUpdated?.status === 'err') {
            message.error(dataUpdated?.message);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessUpdated, dataUpdated]);

    const onUpdate = () => {
        mutationUpdate.mutate({ id: rowSelected, dataUser: stateUserDetail });
    };

    const handleOnChangeDetail = (e) => {
        setStateUserDetail({ ...stateUserDetail, [e.target.name]: e.target.value });
        console.log(e.target.name, e.target.value);
    };

    const handleOnChangeImageDetail = (url) => {
        setStateUserDetail({ ...stateUserDetail, image: url });
    };

    const handleOnChangeCheckboxDetail = (e) => {
        setStateUserDetail({ ...stateUserDetail, [e.target.name]: e.target.checked });
    };

    return (
        <DrawerComp title="User detail" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
            <Loading isLoading={isLoading} delay="200">
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onUpdate}
                    autoComplete="off"
                    form={formUpdate}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input username',
                            },
                        ]}
                    >
                        <Input value={stateUserDetail.name} onChange={handleOnChangeDetail} name="name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input email',
                            },
                        ]}
                    >
                        <Input value={stateUserDetail.type} onChange={handleOnChangeDetail} name="email" />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input address',
                            },
                        ]}
                    >
                        <Input value={stateUserDetail.address} onChange={handleOnChangeDetail} name="address" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input phone',
                            },
                        ]}
                    >
                        <Input value={stateUserDetail.phone} onChange={handleOnChangeDetail} name="phone" />
                    </Form.Item>

                    <Form.Item label="Gender" name="gender">
                        <Radio.Group onChange={handleOnChangeDetail} name="gender" value={stateUserDetail.gender}>
                            <Radio value="Male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                            <Radio value="Other">Other</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Admin" name="admin">
                        <Checkbox
                            name="isAdmin"
                            onChange={handleOnChangeCheckboxDetail}
                            checked={stateUserDetail.isAdmin}
                        ></Checkbox>
                    </Form.Item>
                    <Form.Item label="Avatar" name="avatar">
                        <InputUpload avatar={stateUserDetail.avatar} onChange={handleOnChangeImageDetail} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <ButtonFinish type="primary" htmlType="submit">
                            Apply
                        </ButtonFinish>
                    </Form.Item>
                </Form>
            </Loading>
        </DrawerComp>
    );
}

export default DrawerUpdateUser;
