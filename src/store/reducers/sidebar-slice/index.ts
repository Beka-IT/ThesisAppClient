import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface SidebarState {
  active?: string;
}

const initialState: SidebarState = {
  active: undefined,
};

const addActive = createAsyncThunk('bar/addActive', async (code: string) => {
  return code;
});

export const sidebarSlice = createSlice({
  name: 'doc',
  initialState,
  reducers: {
    active: (state, action) => {
      state.active = action.payload;
    },
    logoutWithClear: (state) => {
      state.active = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addActive.fulfilled, (state, action) => {
      state.active = action.payload;
    });
  },
});

const sidebarPath = { addActive };
export { sidebarPath };

export const sidebarReducer = sidebarSlice.reducer;
