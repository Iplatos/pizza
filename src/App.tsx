import '../src/scss/app2.scss'
import { Header } from './components/header'

import { createContext, useEffect, useState } from 'react'
import { Home } from './pages/home'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/notFound'

import React from 'react'
import { Cart } from './pages/cart/cart'
//v 16

export const SearchContext = createContext<{
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}>({
  searchValue: '',
  setSearchValue: () => {},
})
function App() {
  // const modalSortOpen = useSelector((state: RootState) => state.AppReducer.modalSortOpen)
  const [searchValue, setSearchValue] = useState<string>('')
  // const dispatch = useDispatch()

  // const modalClose = () => {
  //   if (modalSortOpen) {
  //     dispatch(isModalSortOpen(false))
  //   }
  // }

  useEffect(() => {}, [])
  return (
    <>
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />

          <div className="content">
            <Routes>
              {' '}
              <Route path="/" element={<Home />} />
              <Route path={'/cart'} element={<Cart />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </>
  )
}

export default App
