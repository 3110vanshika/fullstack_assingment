import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(sessionStorage.getItem('authUser')),
    token: sessionStorage.getItem('authToken'),
    isAuthenticated: !!sessionStorage.getItem('authToken'),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess:(state, action) => {
            state.user = action.payload.user,
            state.token = action.payload.token,
            state.isAuthenticated = true

            sessionStorage.setItem('authToken', action.payload.token);
            sessionStorage.setItem('authUser', JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.user = null,
            state.token = null,
            state.isAuthenticated = false

            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('authUser');
        }
    }
})

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;