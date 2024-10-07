import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    shippingAddress: {},
    selectedProduct: [],
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount;
            } else {
                state.orderItems?.push(orderItem);
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            itemOrder.amount++;
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            itemOrder.amount--;
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;

            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
            state.orderItems = itemOrder;
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload;

            const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
            state.orderItems = itemOrders;
        },
        addSelectedProduct: (state, action) => {
            const data = action.payload;

            state.selectedProduct = data;
        },
        resetSelectedProduct: (state, action) => {
            state.selectedProduct = [];
        },
        addTotalPrice: (state, action) => {
            const { itemsPrice, shippingPrice, totalPrice } = action.payload;
            state.itemsPrice = itemsPrice;
            state.shippingPrice = shippingPrice;
            state.totalPrice = totalPrice;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addOrderProduct,
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    removeAllOrderProduct,
    addSelectedProduct,
    resetSelectedProduct,
    addItemsprice,
    addShippingPrice,
    addTotalPrice,
} = orderSlice.actions;

export default orderSlice.reducer;
