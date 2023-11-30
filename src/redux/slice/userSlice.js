import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    gender: 'Male',
    access_token: '',
    id: '',
    role: 1,
    dateOfBirth: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                name = '',
                email = '',
                phone = '',
                address = '',
                avatar = '',
                access_token = '',
                _id = '',
                gender = 'Male',
                role = 1,
                dateOfBirth = '',
            } = action.payload;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar;
            state.id = _id;
            state.gender = gender;
            state.access_token = access_token;
            state.role = role;
            state.dateOfBirth = dateOfBirth;
        },

        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.access_token = '';
            state.phone = '';
            state.address = '';
            state.avatar = '';
            state.gender = 'Male';
            state.id = '';
            state.role = 1;
            state.dateOfBirth = '';
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
