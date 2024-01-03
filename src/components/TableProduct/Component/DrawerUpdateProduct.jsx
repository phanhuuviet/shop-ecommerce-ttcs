import { Form, Input, Button as ButtonFinish } from 'antd';
import DrawerComp from '../../DrawerComp/DrawerComp';
import Loading from '../../Loading/Loading';
import InputUpload from '../../InputUpload/InputUpload';
import { useEffect, useState } from 'react';
import * as productService from '../../../services/productService';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import * as message from '../../Message/Message';
import checkStatusResponse from '../../../utils/checkStatusResponse';

function DrawerUpdateProduct({ isOpenDrawer, setIsOpenDrawer, rowSelected, refetch }) {
    const user = useSelector((state) => state.user);
    const initialProduct = {
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
    };
    const [stateProductDetail, setStateProductDetail] = useState(initialProduct);
    const [formUpdate] = Form.useForm();

    const mutationUpdate = useMutation({
        mutationFn: (data) => productService.updateProduct(data),
    });

    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated } = mutationUpdate;
    useEffect(() => {
        if (rowSelected && isOpenDrawer && user) {
            const getProductDetail = async (rowSelected) => {
                const res = await productService.getDetailProduct(rowSelected);
                setStateProductDetail({
                    name: res?.data?.name,
                    price: res?.data?.price,
                    description: res?.data?.description,
                    rating: res?.data?.rating,
                    image: res?.data?.image,
                    type: res?.data?.type,
                    countInStock: res?.data?.countInStock,
                });
            };
            getProductDetail(rowSelected);
        }
    }, [rowSelected, isOpenDrawer, user]);

    useEffect(() => {
        formUpdate.setFieldsValue(stateProductDetail);
    }, [formUpdate, stateProductDetail]);

    useEffect(() => {
        if (isSuccessUpdated && checkStatusResponse(dataUpdated)) {
            setIsOpenDrawer(false);
            formUpdate.resetFields();
            setStateProductDetail(initialProduct);
            message.success('Update product successfully');
            if (refetch) {
                refetch();
            }
        } else if (dataUpdated?.status === 'err') {
            message.error(dataUpdated?.message);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessUpdated, dataUpdated]);

    const onUpdate = () => {
        const accessToken = user.access_token;
        mutationUpdate.mutate({ id: rowSelected, access_token: accessToken, data: stateProductDetail });
    };

    const handleOnChangeDetail = (e) => {
        setStateProductDetail({ ...stateProductDetail, [e.target.name]: e.target.value });
    };

    const handleOnChangeImageDetail = (url) => {
        setStateProductDetail({ ...stateProductDetail, image: url });
    };

    return (
        <DrawerComp title="Thông tin chi tiết sản phẩm" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
            <Loading isLoading={isLoadingUpdated}>
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
                        label="Tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên sản phẩm',
                            },
                        ]}
                    >
                        <Input value={stateProductDetail.name} onChange={handleOnChangeDetail} name="name" />
                    </Form.Item>
                    <Form.Item
                        label="Loại"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập loại sản phẩm',
                            },
                        ]}
                    >
                        <Input value={stateProductDetail.type} onChange={handleOnChangeDetail} name="type" />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số lượng trong kho',
                            },
                        ]}
                    >
                        <Input
                            value={stateProductDetail.countInStock}
                            onChange={handleOnChangeDetail}
                            name="countInStock"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá',
                            },
                        ]}
                    >
                        <Input value={stateProductDetail.price} onChange={handleOnChangeDetail} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="Xếp hạng"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập xếp hạng',
                            },
                        ]}
                    >
                        <Input value={stateProductDetail.rating} onChange={handleOnChangeDetail} name="rating" />
                    </Form.Item>
                    <Form.Item
                        label="Miêu tả"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập miêu tả',
                            },
                        ]}
                    >
                        <Input
                            value={stateProductDetail.description}
                            onChange={handleOnChangeDetail}
                            name="description"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ảnh',
                            },
                        ]}
                    >
                        <InputUpload avatar={stateProductDetail.image} onChange={handleOnChangeImageDetail} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <ButtonFinish type="primary" htmlType="submit">
                            Áp dụng
                        </ButtonFinish>
                    </Form.Item>
                </Form>
            </Loading>
        </DrawerComp>
    );
}

export default DrawerUpdateProduct;
