import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SortType } from '../pages/home'

export type AppParams = {
  categoryIndex: number
  isAsc: boolean
  sortIndex: SortType
}

const initialState: AppParams = {
  categoryIndex: 0,
  sortIndex: 'rating',
  isAsc: true,
}

export const searchPizzaSlice = createSlice({
  name: 'searchPizzaSlice',
  initialState,
  reducers: {
    changeCategoryIndex: (state, action: PayloadAction<number>) => {
      state.categoryIndex = action.payload
    },
    changeSortIndex: (state, action: PayloadAction<SortType>) => {
      state.sortIndex = action.payload
    },
    ascOrDescSwitcher: (state, action: PayloadAction<boolean>) => {
      state.isAsc = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { ascOrDescSwitcher, changeCategoryIndex, changeSortIndex } = searchPizzaSlice.actions

export default searchPizzaSlice.reducer
