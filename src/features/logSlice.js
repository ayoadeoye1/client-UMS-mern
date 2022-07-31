import { createSlice } from '@reduxjs/toolkit';

const initialState = ({
    userStat: {
        isLoggedIn: false,
        loadIt: false
    }
})

const logSlice = createSlice({
    name: 'isLoggedIn',
    initialState,
    reducer: {
        isLog: (state, action) =>{
            action.payload && state.userStat.isLoggedIn((prev) => !prev)
        },
        loadIt: (state) =>{
            state.userStat.loadIt = true
        }
    }
})
const { reducer, actions } = logSlice;

export const { isLog, loadIt } = actions;
export default reducer;