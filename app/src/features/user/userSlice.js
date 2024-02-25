import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {},
    status: 'idle',
    position: {},
    address: '',
    error: '',
  };

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        updateError(state , action){
            state.error = action.payload
        },
        updateUser(state , action){
            state.data = action.payload
        }
    }
})

export function createUserObject({ firstname, lastname, password, email, phone}){
    return (
        {
            email:email,
            username:`${firstname , lastname}`,
            password:password,
            name:{
                firstname:firstname,
                lastname:lastname
            },
            phone:phone
        }
    )   
}

export const { updateError , updateUser } = userSlice.actions;

export default userSlice.reducer;
