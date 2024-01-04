import { Form, Input, Button as ButtonFinish, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import Loading from '../../Loading/Loading';
import * as productService from '../../../services/productService';
import InputUpload from '../../InputUpload/InputUpload';
import * as message from '../../Message/Message';
import checkStatusResponse from '../../../utils/checkStatusResponse';

function ModalCreateProduct({ isOpen, setIsOpen, refetch }) {
    const initialProduct = {
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: 'Khác',
        countInStock: '',
    };
    const [stateProduct, setStateProduct] = useState(initialProduct);
    const [form] = Form.useForm();

    const mutation = useMutation({
        mutationFn: (data) => productService.createProduct({ data }),
    });

    const { data, isLoading, isSuccess } = mutation;

    useEffect(() => {
        if (isSuccess && checkStatusResponse(data)) {
            setIsOpen(false);
            form.resetFields();
            setStateProduct(initialProduct);
            refetch();
            message.success('Tạo sản phẩm thành công');
        } else if (data?.status === 'err') {
            message.error(data?.message);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, data]);

    const onFinish = () => {
        mutation.mutate({ ...stateProduct });
    };

    const handleCancel = () => {
        setIsOpen(false);
        setStateProduct(initialProduct);
        form.resetFields();
    };

    const handleOnChange = (e) => {
        setStateProduct({ ...stateProduct, [e.target.name]: e.target.value });
    };

    const handleOnChangeSelect = (value) => {
        const newValue = value.split('-');
        setStateProduct({ ...stateProduct, [newValue[0]]: newValue[1] });
    };

    const handleOnChangeImage = (url) => {
        setStateProduct({ ...stateProduct, image: url });
    };

    return (
        <Modal forceRender title="Tạo sản phẩm" open={isOpen} onCancel={handleCancel} footer={null}>
            <Loading isLoading={isLoading}>
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
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
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
                        <Input value={stateProduct.name} onChange={handleOnChange} name="name" />
                    </Form.Item>
                    <Form.Item
                        label="Loại"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập loại sản phẩm',
                            },
                        ]}
                    >
                        <Select value={stateProduct.type} onChange={(e) => handleOnChangeSelect(e)} name="type">
                            <Select.Option value="type-Quần áo">Quần áo</Select.Option>
                            <Select.Option value="type-Đồ ăn vặt">Đồ ăn vặt</Select.Option>
                            <Select.Option value="type-Thiết bị điện tử">Thiết bị điện tử</Select.Option>
                            <Select.Option value="type-Sắc đẹp">Sắc đẹp</Select.Option>
                            <Select.Option value="type-Đồ gia dụng">Đồ gia dụng</Select.Option>
                            <Select.Option value="type-Đồ ăn vặt">Đồ ăn vặt</Select.Option>
                            <Select.Option value="type-Khác">Khác</Select.Option>
                        </Select>
                    </Form.Item>
                    {/* <Form.Item
                        label="Type"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input type product',
                            },
                        ]}
                    >
                        <Input value={stateProduct.type} onChange={handleOnChange} name="type" />
                    </Form.Item> */}
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
                        <Input value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
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
                        <Input value={stateProduct.price} onChange={handleOnChange} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="Đánh giá"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đánh giá',
                            },
                        ]}
                    >
                        <Input value={stateProduct.rating} onChange={handleOnChange} name="rating" />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mô tả',
                            },
                        ]}
                    >
                        <Input value={stateProduct.description} onChange={handleOnChange} name="description" />
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
                        <InputUpload avatar={stateProduct.image} onChange={handleOnChangeImage} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <ButtonFinish type="primary" htmlType="submit">
                            Nộp
                        </ButtonFinish>
                    </Form.Item>
                </Form>
            </Loading>
        </Modal>
    );
}

export default ModalCreateProduct;
