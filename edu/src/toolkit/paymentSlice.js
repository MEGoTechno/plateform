import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    payments: null,
    usersPayments: null
}

const paymentSlice = createSlice({
    name: "payment", initialState,
    reducers: {
        setPayments: (state, action) => {
            state.payments = action.payload
            return state
        },
        addPayment: (state, action) => {
            if(state.payments){
                state.payments = [...state.payments, action.payload]
            }else {
                state.payments = [ action.payload]
            }
            return state
        },
        setUsersPayments: (state, action) => {
            state.usersPayments = action.payload
            return state
        }
    }
})

export const { setPayments, addPayment, setUsersPayments } = paymentSlice.actions
export default paymentSlice.reducer