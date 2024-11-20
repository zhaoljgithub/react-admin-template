import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  name: string;
}

const initialState: AppState = {
  name: "app"
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    
  },
});

export const {
  setName,
  
} = AppSlice.actions;
export default AppSlice.reducer;
