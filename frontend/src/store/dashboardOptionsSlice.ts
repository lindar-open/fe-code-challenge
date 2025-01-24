import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  activeSymbol: string;
}

interface StoreState {
  activeSymbol: string;
  showCardInfo: boolean;
}

const initialState: StoreState = {
  activeSymbol: '',
  showCardInfo: true
};

export const dashboardOptionsSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    toggleShowCardInfo: (state) => {
      state.showCardInfo = !state.showCardInfo;
    },
    updateActiveSymbol: (state, action: PayloadAction<Item>) => {
      state.activeSymbol != action.payload.activeSymbol
        ? (state.activeSymbol = action.payload.activeSymbol)
        : (state.activeSymbol = '');
    }
  }
});

export const { toggleShowCardInfo, updateActiveSymbol } = dashboardOptionsSlice.actions;

export const selectShowCardInfo = (state: { store: StoreState }) => state.store.showCardInfo;
export const selectActiveSymbol = (state: { store: StoreState }) => state.store.activeSymbol;

export default dashboardOptionsSlice.reducer;
