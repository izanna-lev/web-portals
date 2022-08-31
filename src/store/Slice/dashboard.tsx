import { createSlice } from "@reduxjs/toolkit";

interface Dashboard {
    data: {
        overallExperience: number,
        pending: number,
        approved: number,
        completed: number
    }
}

const initialState: Dashboard = {
    data: {
        overallExperience: 0,
        pending: 0,
        approved: 0,
        completed: 0
    }
};

const dashboard = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setDashboard: (state, action) => {
            state.data = action.payload.data;
        },
    },
});

export const { setDashboard } = dashboard.actions

export default dashboard.reducer

