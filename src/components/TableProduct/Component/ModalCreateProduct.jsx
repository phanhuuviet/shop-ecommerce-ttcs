import { Form, Input, Button as ButtonFinish, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import Loading from '../../Loading/Loading';
import * as productService from '../../../services/productService';
import InputUpload from '../../InputUpload/InputUpload';
import * as message from '../../Message/Message';

function ModalCreateProduct({ isOpen, setIsOpen }) {
    const initialProduct = {
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
    };
    const [stateProduct, setStateProduct] = useState(initialProduct);
    const [form] = Form.useForm();

    const mutation = useMutation({
        mutationFn: (data) => productService.createProduct(data),
    });

    const { data, isLoading, isSuccess } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            setIsOpen(false);
            form.resetFields();
            setStateProduct(initialProduct);
            message.success('Create product successfully');
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

    const handleOnChangeImage = (url) => {
        setStateProduct({ ...stateProduct, image: url });
    };

    return (
        <Modal forceRender title="Create product" open={isOpen} onCancel={handleCancel} footer={null}>
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
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input name product',
                            },
                        ]}
                    >
                        <Input value={stateProduct.name} onChange={handleOnChange} name="name" />
                    </Form.Item>
                    <Form.Item
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
                    </Form.Item>
                    <Form.Item
                        label="Count in stock"
                        name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Please input count in stock',
                            },
                        ]}
                    >
                        <Input value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input price',
                            },
                        ]}
                    >
                        <Input value={stateProduct.price} onChange={handleOnChange} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input rating',
                            },
                        ]}
                    >
                        <Input value={stateProduct.rating} onChange={handleOnChange} name="rating" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input description',
                            },
                        ]}
                    >
                        <Input value={stateProduct.description} onChange={handleOnChange} name="description" />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input description',
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
                            Submit
                        </ButtonFinish>
                    </Form.Item>
                </Form>
            </Loading>
        </Modal>
    );
}

export default ModalCreateProduct;
