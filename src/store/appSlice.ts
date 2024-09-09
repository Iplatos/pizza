import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type AppParams = {
  isLoading: boolean
  modalSortOpen: boolean
}

const initialState: AppParams = {
  isLoading: false,
  modalSortOpen: false,
}

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    isAppLoaderSwitcher: (state, action: PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoading = action.payload
    },
    isModalSortOpen: (state, action: PayloadAction<boolean>) => {
      state.modalSortOpen = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { isAppLoaderSwitcher, isModalSortOpen } = appSlice.actions

export default appSlice.reducer
